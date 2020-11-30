import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
import db from '../server/models';
import uuid from 'uuidv4';

describe('Folders', () => {
  beforeEach(function () {
    db.Folder.destroy({ where: {} });
  });
  describe('POST one folder', () => {
    it('should post one folder', async () => {
      const response = await request(Server).post('/api/v1/folders');
      expect(response.body.folder).to.have.property('uuid');
    });
  });
  describe('GET', () => {
    it('Should retrieve all existing folders', async () => {
      await db.Folder.bulkCreate([{ uuid }, { uuid }, { uuid }, { uuid }]);
      const response = await request(Server).get('/api/v1/folders');
      expect(response.body).to.be.an('array').to.have.lengthOf(4);
    });
    it('Should retrieve an specific folder with all associated candidates', async () => {
      const cohort1 = await db.Cohort.create({
        name: 'WebFT-01',
      });
      const foldersCreated = await db.Folder.bulkCreate([{ uuid }, { uuid }]);
      const candidate = await db.Candidate.create({
        email: 'taniamg@gmail.com',
        cohortId: cohort1.id,
      });
      await foldersCreated[0].addCandidate(candidate.id);
      const response = await request(Server).get(
        `/api/v1/folders/${foldersCreated[0].id}`
      );
      expect(response.body)
        .to.be.an('object')
        .to.deep.include({ id: foldersCreated[0].id });
      expect(response.body).to.have.property('candidates').to.be.an('array');
      expect(response.body).to.have.nested.property('candidates[0].id');
      expect(response.body.candidates[0].email).to.equal('taniamg@gmail.com');
      expect(response.body.candidates[0].cohortId).to.equal(cohort1.id);
    });
  });
  describe('DELETE', () => {
    it('Should delete one folder', async () => {
      const folder = await db.Folder.create({ uuid });
      const response = await request(Server).delete(
        `/api/v1/folders/${folder.id}`
      );
      expect(response.status).to.be.equal(204);
      const foundFolder = await db.Folder.findByPk(folder.id);
      expect(foundFolder).to.be.null;
    });
  });
  describe('PUT recruiter', () => {
    it('Should update an specific add relation user/recruiter relation to folder', async () => {
      const folders = await db.Folder.bulkCreate([
        { uuid },
        { uuid },
        { uuid },
      ]);
      const recruiter = await db.Recruiter.create({
        contactName: 'Victor Alarcon',
        email: 'valarcon@gmail.com',
        company: 'Globant',
        siteUrl: 'www.globant.com',
      });
      const user = await db.User.create({
        firstName: 'Lucas',
        lastName: 'Verdiell',
        profilePicture: 'https://www.test.com/lalala.png',
        role: 'selector',
      });
      const response = await request(Server).put(
        `/api/v1/folders/${folders[0].id}?recruiterId=${recruiter.id}`
      );
      expect(response.status).to.be.equal(200);
      const foundFolder = await db.Folder.findByPk(folders[0].id);
      expect(foundFolder)
        .to.be.an('object')
        .to.deep.include({ recruiterId: recruiter.id });
      const responseTwo = await request(Server).put(
        `/api/v1/folders/${folders[1].id}?userId=${user.id}`
      );
      expect(responseTwo.status).to.be.equal(200);
      const foundFolderTwo = await db.Folder.findByPk(folders[1].id);
      expect(foundFolderTwo).to.be.an('object').to.include({
        userId: user.id,
      });
      const responseThree = await request(Server).put(
        `/api/v1/folders/${folders[2].id}?recruiterId=${recruiter.id}&userId=${user.id}`
      );
      expect(responseThree.status).to.be.equal(200);
      const foundFolderThree = await db.Folder.findByPk(folders[2].id);
      expect(foundFolderThree).to.be.an('object').to.include({
        userId: user.id,
        recruiterId: recruiter.id,
      });
    });
  });

  describe('PUT status', () => {
    it('should update status to created', async () => {
      const folder1 = await db.Folder.create({ uuid });
      await db.Folder.create({ uuid });
      const response = await request(Server)
        .put(`/api/v1/folders/status/${folder1.id}`)
        .send({ status: 'created' });
      expect(response.body).to.have.property('status').to.be.equal('created');
      expect(response.body).to.have.property('id').to.be.equal(folder1.id);
    });
    it('should update status to sent', async () => {
      const folder2 = await db.Folder.create({ uuid });
      await db.Folder.create({ uuid });
      const response = await request(Server)
        .put(`/api/v1/folders/status/${folder2.id}`)
        .send({ status: 'sent' });
      expect(response.body).to.have.property('status').to.be.equal('sent');
      expect(response.body).to.have.property('id').to.be.equal(folder2.id);
    });
  });
});
