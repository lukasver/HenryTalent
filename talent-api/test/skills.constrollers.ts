import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
import db from '../server/models';
import faker from 'faker';

describe('Skills', () => {
  beforeEach(function () {
    db.Skill.destroy({ where: {} });
  });

  describe('POST create skill', () => {
    it('should create one skill', async () => {
      const newSkill = {
        name: 'Python',
        type: 'tech',
      };
      const response = await request(Server)
        .post('/api/v1/skills')
        .send(newSkill);
      const skillCreated = await db.Skill.findByPk(response.body.id);
      expect(skillCreated).to.have.property('name').to.be.equal('Python');
      expect(skillCreated).to.have.property('type').to.be.equal('tech');
    });
  });

  describe('GET all skills', () => {
    it('Should return all existing skills', async () => {
      await db.Skill.create({ name: 'PHP', type: 'tech' });
      await db.Skill.create({ name: 'Java', type: 'tech' });
      await db.Skill.create({ name: 'Liderazgo', type: 'soft' });
      const response = await request(Server).get('/api/v1/skills');
      expect(response.body).to.be.an('array').to.have.lengthOf(3);
      expect(response.body[2])
        .to.have.property('name')
        .to.be.equal('Liderazgo');
    });
  });

  describe('GET specific skill', () => {
    it('should get a specific skill', async () => {
      const skills = [
        { name: 'Go', type: 'tech' },
        { name: '.NET', type: 'tech' },
        { name: 'Analitico', type: 'soft' },
        { name: 'Liderazgo', type: 'soft' },
      ];
      const skillsCreated = await db.Skill.bulkCreate(skills);
      const randomId = faker.helpers.randomize(skillsCreated).id;
      const response = await request(Server).get(`/api/v1/skills/${randomId}`);
      switch (randomId) {
        case 5:
          expect(response.body).to.have.property('name').to.be.equal('Go');
          break;
        case 6:
          expect(response.body).to.have.property('name').to.be.equal('.NET');
          break;
        case 7:
          expect(response.body)
            .to.have.property('name')
            .to.be.equal('Analitico');
          break;
        case 8:
          expect(response.body)
            .to.have.property('name')
            .to.be.equal('Liderazgo');
          break;
        default:
          break;
      }
    });
  });

  describe('DELETE', () => {
    it('Should delete one skill', async () => {
      const skillOne = await db.Skill.create({ name: '.NET', type: 'tech' });
      const skillTwo = await db.Skill.create({ name: 'C', type: 'tech' });
      const response = await request(Server).delete(
        `/api/v1/skills/${skillTwo.id}`
      );
      expect(response.status).to.be.equal(200);
      const responseGet = await request(Server).get('/api/v1/skills');
      expect(responseGet.body).to.have.lengthOf(1);
      expect(responseGet.body[0]).to.have.property('name').to.be.equal('.NET');
    });
  });

  describe('PUT update skill', () => {
    it('should update one skill', async () => {
      const skillOne = await db.Skill.create({ name: 'Java', type: 'tech' });
      const skillTwo = await db.Skill.create({ name: 'PHP', type: 'tech' });
      const skillThree = await db.Skill.create({
        name: 'Trabajo en equipo',
        type: 'soft',
      });
      const response = await request(Server)
        .put(`/api/v1/skills/${skillOne.id}`)
        .send({ name: 'Python' });
      const skillUpdated = await db.Skill.findByPk(response.body.id);
      expect(skillUpdated).to.have.property('name').to.be.equal('Python');
    });
  });
});
