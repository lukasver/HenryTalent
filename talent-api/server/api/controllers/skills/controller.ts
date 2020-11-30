import { Request, Response } from 'express';
import db from '../../../models';

export class SkillsController {
  async all(req: Request, res: Response): Promise<void> {
    try {
      const skills = await db.Skill.findAll({
        attributes: ['id', 'name', 'type'],
      });
      res.status(200).json(skills);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async byId(req: Request, res: Response): Promise<void> {
    try {
      const { skillId } = req.params;
      const skill = await db.Skill.findByPk(skillId);
      res.status(200).json({
        id: skill.id,
        name: skill.name,
        type: skill.type,
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, type } = req.body;
      const newSkill = await db.Skill.create({ name, type });
      res
        .status(200)
        .json({ id: newSkill.id, name: newSkill.name, type: newSkill.type });
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async updateById(req: Request, res: Response): Promise<void> {
    try {
      const { skillId } = req.params;
      const { name, type } = req.body;
      await db.Skill.update(
        { name: name, type: type },
        { where: { id: skillId } }
      );
      res.status(200).json({
        id: skillId,
        name: name,
        type: type,
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { skillId } = req.params;
      await db.Skill.destroy({ where: { id: skillId } });
      res.status(200).json('Skill deleted');
    } catch (error) {
      res.status(404).json({ error });
    }
  }
}
export default new SkillsController();
