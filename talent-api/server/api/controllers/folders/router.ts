import express from 'express';
import folderController from './controller';

export default express
  .Router()
  .get('/', folderController.all)
  .post('/', folderController.postFolder)
  .get('/draft', folderController.getDraftFolder)
  .get('/dossier/:uuid', folderController.byUuid)
  .get('/:folderId', folderController.byId)
  .put('/:folderId', folderController.updateById)
  .put('/status/:folderId', folderController.updateStatusById)
  .delete('/:folderId', folderController.deleteById)
  .post('/send', folderController.postEmail);
