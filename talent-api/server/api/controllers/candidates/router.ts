import express from 'express';
import upload from '../../middlewares/csvFile';
import candidatesController from './controller';

export default express
  .Router()
  .post('/csv', upload.single('file'), candidatesController.csvToJson)
  .post('/', candidatesController.bulkCreateCandidate)
  .get('/', candidatesController.all)
  .get('/pages', candidatesController.paginate)
  .get('/filterBy/:visibility', candidatesController.byFilter)
  .get('/filter', candidatesController.filter)
  .get('/search', candidatesController.searchByProp)
  .put('/:candidateId/visibility', candidatesController.updateById)
  .put('/:candidateId/update', candidatesController.updateByIdCandidate)
  .get('/:candidateId', candidatesController.byId)
  .post(
    '/:folderId/addCandidate/:candidateId',
    candidatesController.addToFolder
  )
  .post('/addCandidate', candidatesController.addCandidate)
  .delete(
    '/:folderId/removeCandidate/:candidateId',
    candidatesController.deleteFromFolder
  )
  .delete('/:candidateId/delete', candidatesController.deleteCandidate);
