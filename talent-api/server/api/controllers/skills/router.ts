import express from 'express';
import skillsController from './controller';

export default express
  .Router()
  .get('/', skillsController.all)
  .get('/:skillId', skillsController.byId)
  .post('/', skillsController.create)
  .put('/:skillId', skillsController.updateById)
  .delete('/:skillId', skillsController.delete);
