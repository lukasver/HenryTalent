import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
import db from '../server/models';

describe('Comments', (): void => {
  beforeEach(async function () {
    await db.Comment.destroy({ where: {} });
  });

  describe('POST Comments', (): void => {
    it('Should add a Comment for the staff', async (): Promise<void> => {
      const newComment = {
        content: 'this is a new comment',
      };
      const newFolder = await db.Folder.create();
      const newUser = await db.User.create({
        firstName: 'Federico',
        lastName: 'Calderon',
        profilePicture:
          'https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg',
        role: 'admin',
      });
      const response = await request(Server)
        .post(`/api/v1/comments/folder/${newFolder.id}/${newUser.id}`)
        .send(newComment);
      expect(response.body)
        .to.be.an('object')
        .to.have.property('content', 'this is a new comment');
      const getCommentStaff = await request(Server).get(
        `/api/v1/comments/folder/${newFolder.id}`
      );
      expect(getCommentStaff.body).to.be.an('array').to.have.lengthOf(1);
      expect(getCommentStaff.body[0])
        .to.have.property('content')
        .to.be.equal('this is a new comment');
    });
    it('Should add a Comment for a recruiter', async (): Promise<void> => {
      const newRecruiter = await db.Recruiter.create({
        contactName: 'Victor Alarcon',
        email: 'valarcon@gmail.com',
        company: 'Globant',
        siteUrl: 'www.globant.com',
      });
      const newUser = await db.User.create({
        firstName: 'Federico',
        lastName: 'Calderon',
        profilePicture:
          'https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg',
        role: 'admin',
      });
      const newFolder = await db.Folder.create();
      const newComment = {
        content: 'this is a new comment',
        recruiterId: newRecruiter.id,
      };
      const response = await request(Server)
        .post(`/api/v1/comments/folder/${newFolder.id}/${newUser.id}`)
        .send(newComment);
      expect(response.body)
        .to.be.an('object')
        .to.have.property('content', 'this is a new comment');
      expect(response.body)
        .to.be.an('object')
        .to.have.property('recruiterId', newRecruiter.id);
      expect(response.body)
        .to.be.an('object')
        .to.have.property('folderId', newFolder.id);
      expect(response.body)
        .to.be.an('object')
        .to.have.property('userId', newUser.id);
      expect(response.status).to.be.equal(200);
      const getCommentRecuiter = await request(Server).get(
        `/api/v1/comments/folder/${newFolder.id}`
      );
      expect(getCommentRecuiter.status).to.be.equal(200);
      expect(getCommentRecuiter.body).to.be.an('array').to.have.lengthOf(1);
      expect(getCommentRecuiter.body[0])
        .to.have.property('recruiterId')
        .to.be.equal(newRecruiter.id);
      expect(getCommentRecuiter.body[0])
        .to.have.property('content')
        .to.be.equal('this is a new comment');
    });
  });

  describe('GET specific Comments by Folder Id', (): void => {
    it('Should return comments for folder when given its folderId', async (): Promise<
      void
    > => {
      const newFolder = await db.Folder.create();
      const newFolder2 = await db.Folder.create();
      const newComment = await db.Comment.bulkCreate([
        { content: 'new comment 1', folderId: newFolder.id },
        { content: 'new comment 2', folderId: newFolder.id },
        { content: 'new comment 3', folderId: newFolder.id },
        { content: 'new comment 4', folderId: newFolder.id },
      ]);
      const newComment2 = await db.Comment.bulkCreate([
        { content: 'new comment 5', folderId: newFolder2.id },
        { content: 'new comment 6', folderId: newFolder2.id },
        { content: 'new comment 7', folderId: newFolder2.id },
      ]);
      const getCommentsFolder = await request(Server).get(
        `/api/v1/comments/folder/${newFolder.id}`
      );
      expect(getCommentsFolder.status).to.be.equal(200);
      expect(getCommentsFolder.body).to.an('array').to.have.lengthOf(4);
      expect(getCommentsFolder.body[1])
        .to.have.property('content')
        .to.be.equal('new comment 2');
      expect(getCommentsFolder.body[3])
        .to.have.property('content')
        .to.be.equal('new comment 4');
      expect(getCommentsFolder.body[4]).to.be.equal(undefined);
      const getCommentsFolder2 = await request(Server).get(
        `/api/v1/comments/folder/${newFolder2.id}`
      );
      expect(getCommentsFolder2.status).to.be.equal(200);
      expect(getCommentsFolder2.body).to.an('array').to.have.lengthOf(3);
      expect(getCommentsFolder2.body[1])
        .to.have.property('content')
        .to.be.equal('new comment 6');
      expect(getCommentsFolder2.body[2])
        .to.have.property('content')
        .to.be.equal('new comment 7');
    });
  });

  describe('PUT Comments', (): void => {
    it('Should update all the data in an specific comment', async (): Promise<
      void
    > => {
      const newFolder = await db.Folder.create();
      const newComment = await db.Comment.bulkCreate([
        { content: 'new comment 1', folderId: newFolder.id },
        { content: 'new comment 2', folderId: newFolder.id },
        { content: 'new comment 3', folderId: newFolder.id },
        { content: 'new comment 4', folderId: newFolder.id },
      ]);
      const editedComment = {
        content: 'new comment edited',
      };
      const response = await request(Server)
        .put(`/api/v1/comments/${newComment[0].id}`)
        .send(editedComment);
      expect(response.status).to.be.equal(200);
      const getCommentsFolder = await request(Server).get(
        `/api/v1/comments/folder/${newFolder.id}`
      );
      expect(getCommentsFolder.status).to.be.equal(200);
      expect(getCommentsFolder.body).to.an('array').to.have.lengthOf(4);
      expect(getCommentsFolder.body[3])
        .to.have.property('content')
        .to.be.equal('new comment edited');
      expect(getCommentsFolder.body[2])
        .to.have.property('content')
        .to.be.equal('new comment 4');
    });
  });

  describe('DELETE Comments', (): void => {
    it('Should delete an specific comment', async (): Promise<void> => {
      const newFolder = await db.Folder.create();
      const newComment = await db.Comment.bulkCreate([
        { content: 'new comment 1', folderId: newFolder.id },
        { content: 'new comment 2', folderId: newFolder.id },
        { content: 'new comment 3', folderId: newFolder.id },
      ]);
      const response = await request(Server).delete(
        `/api/v1/comments/${newComment[1].id}`
      );
      expect(response.status).to.be.equal(204);
      const deletedComment = await db.Comment.findOne({
        where: { id: newComment[1].id },
      });
      expect(deletedComment).to.equal(null);
      const foundComment = await db.Comment.findAll();
      expect(foundComment).to.have.lengthOf(2);
    });
  });
});
