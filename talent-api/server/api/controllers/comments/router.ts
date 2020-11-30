import express from 'express';
import CommentsController from './controller';

export default express
  .Router()
  .get('/folder/:folderId', CommentsController.byFolderId)
  .post('/folder/:folderId/:userId', CommentsController.add)
  .put('/:commentId', CommentsController.updateById)
  .delete('/:commentId', CommentsController.delete);
