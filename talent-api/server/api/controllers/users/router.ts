import express from 'express';
import usersController from './controller';

export default express
  .Router()
  .post('/', usersController.createUser)
  .get('/', usersController.all);
