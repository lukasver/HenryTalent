import { Request, Response } from 'express';
import db from '../../../models';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;
import fs from 'fs';
import { parse } from '@fast-csv/parse';

export class CandidatesController {
  async all(req: Request, res: Response): Promise<void> {
    const candidates = await db.Candidate.findAll({
      include: [
        {
          model: db.Skill,
          attributes: ['id', 'name', 'type'],
          through: { attributes: [] },
        },
        {
          model: db.Cohort,
          attributes: ['name'],
        },
      ],
    });
    res.status(200).json(candidates);
  }

  csvToJson = async (req, res) => {
    try {
      if (req.file == undefined) {
        return res.status(400).send('Please upload a CSV file!');
      }
      const candidates = [];

      fs.createReadStream(req.file.path)
        .pipe(parse({ headers: true, delimiter: ',' }))
        .on('error', (error) => {
          throw error.message;
        })
        .on('data', async (row) => {
          row.status = row.status.toLowerCase();
          row.visibility = row.visibility.toLowerCase();
          const newUser = new db.Candidate(row);
          //const userValidated = await newUser.validate(); //TODO: print more informative error
          candidates.push(newUser);
        })
        .on('end', () => {
          res.status(200).send(candidates);
        });
      fs.unlink(req.file.path, (err) => {
        if (err) throw err;
      });
    } catch (error) {
      return res.status(400).send({
        error: `Validation failed: ${error}`,
      });
    }
  };

  async bulkCreateCandidate(req: Request, res: Response): Promise<void> {
    try {
      const bulkCandidates = await db.Candidate.bulkCreate(req.body);
      res.status(200).json(bulkCandidates);
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ error: "Couldn't parse candidates CSV" });
    }
  }

  async byId(req: Request, res: Response): Promise<void> {
    const candidate = await db.Candidate.findByPk(req.params.candidateId, {
      include: {
        model: db.Cohort,
        attributes: ['name'],
      },
    });
    res.status(200).json(candidate);
  }

  async updateById(req: Request, res: Response): Promise<void> {
    const candidate = await db.Candidate.findByPk(req.params.candidateId);
    candidate.visibility = req.body.visibility;
    await candidate.save();
    res.status(200).json(candidate);
  }

  async updateByIdCandidate(req: Request, res: Response): Promise<void> {
    const candidateUpdate = await db.Candidate.update(req.body, {
      where: { id: req.params.candidateId },
    });
    res.status(200).json(candidateUpdate);
  }

  async addToFolder(req: Request, res: Response): Promise<void> {
    const { candidateId, folderId } = req.params;
    try {
      const candidate = await db.Candidate.findByPk(candidateId);
      const folder = await db.Folder.findByPk(folderId);
      const reply = await folder.addCandidate(candidate);
      res.status(200).json(reply);
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async deleteFromFolder(req: Request, res: Response): Promise<void> {
    const candidate = await db.Candidate.findByPk(req.params.candidateId);
    const folder = await db.Folder.findByPk(req.params.folderId);
    const reply = await folder.removeCandidate(candidate);
    res.status(200).json(reply);
  }

  async deleteCandidate(req: Request, res: Response): Promise<void> {
    await db.Candidate.destroy({
      where: { id: req.params.candidateId },
    });
    res.status(200).end();
  }

  async addCandidate(req: Request, res: Response): Promise<void> {
    const candidateData = req.body;
    const candidate = await db.Candidate.create(candidateData);
    res.status(200).json(candidate);
  }

  async byFilter(req: Request, res: Response): Promise<void> {
    const candidates = await db.Candidate.findAll({
      where: {
        visibility: req.params.visibility,
      },
    });
    res.status(200).json(candidates);
  }

  async filter(req: Request, res: Response): Promise<void> {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 0;
    const offset = page ? page * limit : 0;
    const skills = req.query.skills || '';
    const cohorts = req.query.cohortId || '';
    const location = req.query.locations || '';
    const skillsArray = skills ? skills.toString().split(',') : [];
    const cohortsArr = cohorts ? cohorts.toString().split(',') : [];
    const locationArray = location ? location.toString().split(',') : [];
    const cohortArray = cohortsArr.map((x) => Number(x));

    const query = {
      where: {
        cohortId: cohortArray,
        country: locationArray,
        visibility: 'listed',
      },
      include: [
        {
          model: db.Skill,
          attributes: ['id', 'name', 'type'],
          through: { attributes: [] },
          where: {
            name: skillsArray,
          },
        },
      ],
    };

    if (!skillsArray.length) delete query.include[0].where;
    if (!cohortArray.length) delete query.where.cohortId;
    if (!locationArray.length) delete query.where.country;
    if (!skillsArray.length && !cohortArray.length && !locationArray.length) {
      res.sendStatus(204);
    } else {
      try {
        const candidatesFiltered = await db.Candidate.findAll(query); // filtrado total
        const ids = [];
        await candidatesFiltered.forEach((candidate) => ids.push(candidate.id)); // filtrado x id del resultado inicial
        const candidateResponse = await db.Candidate.findAndCountAll({
          where: {
            id: ids,
          },
          include: [
            {
              model: db.Skill,
              attributes: ['id', 'name', 'type'],
              through: { attributes: [] },
            },
            {
              model: db.Cohort,
              attributes: ['id', 'name'],
            },
          ],
          limit,
          offset,
          distinct: true,
        }); // busqueda para asociar todos los skills...

        const totalPages = Math.ceil(candidateResponse.count / limit);

        res.status(200).json({
          candidatesInPage: candidateResponse.rows.length,
          currentPage: page + 1,
          totalPages: totalPages,
          count: candidateResponse.count,
          candidates: candidateResponse.rows,
        });
      } catch (err) {
        res.sendStatus(400);
        throw err;
      }
    }
  }

  async searchByProp(req: Request, res: Response): Promise<void> {
    const { search } = req.query;
    try {
      const candidates = await db.Candidate.findAll({
        where: {
          [Op.or]: [
            {
              firstName: {
                [Op.iLike]: '%' + search + '%',
              },
            },
            {
              lastName: {
                [Op.iLike]: '%' + search + '%',
              },
            },
            {
              email: {
                [Op.iLike]: '%' + search + '%',
              },
            },
          ],
        },
      });
      res.status(200).json(candidates);
    } catch (err) {
      res.status(404).send(err.message);
    }
  }

  async paginate(req: Request, res: Response): Promise<void> {
    const limit = Number(req.query.limit);
    const page = Number(req.query.page);
    const offset = page ? page * limit : 0;

    try {
      const candidatesBatch = await db.Candidate.findAndCountAll({
        where: { visibility: 'listed' },
        include: [
          {
            model: db.Skill,
            attributes: ['id', 'name', 'type'],
            through: { attributes: [] },
          },
          {
            model: db.Cohort,
            attributes: ['name'],
          },
        ],
        limit,
        offset,
        distinct: true,
      });
      const totalPages = Math.ceil(candidatesBatch.count / limit);

      res.status(200).json({
        candidatesInPage: candidatesBatch.rows.length,
        totalPages: totalPages,
        candidates: candidatesBatch,
      });
    } catch (error) {
      res.send(error.message);
      throw error;
    }
  }
}

export default new CandidatesController();
