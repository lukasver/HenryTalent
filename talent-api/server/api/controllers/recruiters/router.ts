import express from 'express';
import RecruitersController from './controller';

export default express
  .Router()
  .get('/search/company', RecruitersController.byCompany)
  .get('/', RecruitersController.all)
  .post('/', RecruitersController.add)
  .delete('/:recruiterId', RecruitersController.delete)
  .get('/:recruiterId', RecruitersController.byId)
  .put('/:recruiterId', RecruitersController.updateById);
