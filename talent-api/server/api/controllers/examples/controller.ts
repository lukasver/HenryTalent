import ExamplesService from '../../services/examples.service';
import { Request, Response } from 'express';
import db from '../../../models';

export class Controller {
  async all(req: Request, res: Response): Promise<void> {
    // ExamplesService.all().then((r) => res.json(r));
  }

  // async byId(req: Request, res: Response): Promise<void> {
  //   const { candidateId } = req.params
  //   const candidate = await db.Candidate.findByPk(candidateId)
  //   res.status(200).json(candidate);
  // }

  // create(req: Request, res: Response): void {
  //   db.Candidate.create(req.body.name).then((r) =>
  //     res.status(201).location(`/api/v1/examples/${r.id}`).json(r)
  //   );
  // }

  // all(req: Request, res: Response): void {
  //   ExamplesService.all().then((r) => res.json(r));
  // }

  // byId(req: Request, res: Response): void {
  //   const id = Number.parseInt(req.params['id']);
  //   ExamplesService.byId(id).then((r) => {
  //     if (r) res.json(r);
  //     else res.status(404).end();
  //   });
  // }

  // create(req: Request, res: Response): void {
  //   ExamplesService.create(req.body.name).then((r) =>
  //     res.status(201).location(`/api/v1/examples/${r.id}`).json(r)
  //   );
  // }
}

export default new Controller();
