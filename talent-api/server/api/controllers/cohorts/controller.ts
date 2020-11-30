import { Request, Response } from 'express';
import db from '../../../models';

export class CohortsController {
  async all(req: Request, res: Response): Promise<void> {
    const cohorts = await db.Cohort.findAll();
    try {
      res.status(200).json(cohorts);
    } catch (err) {
      res.sendStatus(400);
      throw err;
    }
  }

  async deleteCohort(req: Request, res: Response): Promise<void> {
    await db.Cohort.destroy({
      where: { id: req.params.cohortId },
    });
    res.status(200).end();
  }
}

export default new CohortsController();
