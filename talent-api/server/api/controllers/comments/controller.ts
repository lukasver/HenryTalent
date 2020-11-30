import { Request, Response } from 'express';
import db from '../../../models';

export class CommentsController {
  async byFolderId(req: Request, res: Response): Promise<void> {
    const comments = await db.Comment.findAll({
      where: {
        folderId: req.params.folderId,
      },
    });
    res.status(200).json(comments);
  }

  async add(req: Request, res: Response): Promise<void> {
    const { content, recruiterId } = req.body;
    const { folderId, userId } = req.params;
    const response = await db.Comment.create({
      content: content,
      recruiterId: recruiterId,
      folderId: folderId,
      userId: userId,
    });
    res.status(200).json(response);
  }

  async updateById(req: Request, res: Response): Promise<void> {
    const { content } = req.body;
    const id: number = parseInt(req.params.commentId);
    const response = await db.Comment.update(
      { content: content },
      {
        where: { id },
      }
    );
    res.status(200).json(response);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.commentId);
    const response = await db.Comment.destroy({ where: { id } });
    res.status(204).json(response);
  }
}

export default new CommentsController();
