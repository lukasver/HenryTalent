import { Request, Response } from 'express';
import db from '../../../models';

export class usersController {
  async createUser(req: Request, res: Response): Promise<void> {
    const { firstName, lastName, profilePicture, role } = req.body;
    const user = await db.User.create({
      firstName,
      lastName,
      profilePicture,
      role,
    });
    res.status(201).json(user);
    return;
  }

  async all(req: Request, res: Response): Promise<void> {
    const users = await db.User.findAll();
    res.status(200).json(users);
  }
}
export default new usersController();
