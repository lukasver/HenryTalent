import express from 'express';
import cohortsController from './controller';

export default express
  .Router()
  .get('/', cohortsController.all)
  .delete('/:cohortId/delete', cohortsController.deleteCohort);
