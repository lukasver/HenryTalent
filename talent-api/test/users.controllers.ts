import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
import db from '../server/models';

describe('Users', () => {
  beforeEach(function () {
    db.User.destroy({ where: {} });
  });

  describe('Create one user', () => {
    const federico = {
      firstName: 'Federico',
      lastName: 'Calderon',
      profilePicture:
        'https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg',
      role: 'admin',
    };
    const carlos = {
      firstName: 'Carlos',
      lastName: 'Martin',
      profilePicture:
        'https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg',
      role: 'selector',
    };

    it('should create users', async () => {
      await request(Server).post('/api/v1/users').send(federico);

      let allUsersInDataBase = await db.User.findAll();
      expect(allUsersInDataBase).to.have.lengthOf(1);

      await request(Server).post('/api/v1/users').send(carlos);

      allUsersInDataBase = await db.User.findAll();
      expect(allUsersInDataBase).to.have.lengthOf(2);
    });

    it('should create correctly properties', async () => {
      const responseFederico = await request(Server)
        .post('/api/v1/users')
        .send(federico);
      const dbCreated = await db.User.findOne({
        where: { id: responseFederico.body.id },
      });
      expect(dbCreated.dataValues.firstName).to.be.equal('Federico');
      expect(dbCreated.dataValues.lastName).to.be.equal('Calderon');
      expect(dbCreated.dataValues.profilePicture).to.be.an('string');
      expect(dbCreated.dataValues.role).to.be.equal('admin');
    });
  });

  describe('GET all users', () => {
    it('should get all users', async () => {
      await db.User.create({
        firstName: 'Martin',
        lastName: 'Cura',
        role: 'admin',
      });
      await db.User.create({
        firstName: 'Leo',
        lastName: 'Nardo',
        role: 'selector',
      });
      const response = await request(Server).get('/api/v1/users');
      expect(response.body).to.have.lengthOf(2);
      expect(response.body[0])
        .to.have.property('firstName')
        .to.be.equal('Martin');
      expect(response.body[1]).to.have.property('firstName').to.be.equal('Leo');
      expect(response.body[1])
        .to.have.property('lastName')
        .to.be.equal('Nardo');
      expect(response.body[1]).to.have.property('role').to.be.equal('selector');
      expect(response.body).to.be.an('array');
    });
  });
});
