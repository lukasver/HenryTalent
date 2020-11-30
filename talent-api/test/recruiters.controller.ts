import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
import db from '../server/models';

interface Recruiter {
  contactName: string;
  email: string;
  company: string;
  siteUrl: string;
}

describe('Recruiters', (): void => {
  beforeEach(function () {
    db.Recruiter.destroy({ where: {} });
  });

  describe('POST Recruiters', (): void => {
    it('Should add a new Recruiter to the DB', async (): Promise<void> => {
      const newRecruiter: Recruiter = {
        contactName: 'Luis',
        email: 'luis@google.com',
        company: 'Google',
        siteUrl: 'www.google.com',
      };
      const response = await request(Server)
        .post('/api/v1/recruiters')
        .send(newRecruiter);
      expect(response.body)
        .to.be.an('object')
        .to.have.property('email', 'luis@google.com');
    });
  });

  describe('GET Recruiters', (): void => {
    it('Should return a list with all recruiters', async (): Promise<void> => {
      await db.Recruiter.bulkCreate([
        {
          contactName: 'Victor Alarcon',
          email: 'valarcon@gmail.com',
          company: 'Globant',
          siteUrl: 'www.globant.com',
        },
        {
          contactName: 'Lionel Messi',
          email: 'Liomessi@barcelona.es',
          company: 'BarcelonaFC',
          siteUrl: 'www.BarcelonaFC.com',
        },
      ]);
      const response = await request(Server).get('/api/v1/recruiters');
      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.lengthOf(2);
    });
  });

  describe('PUT Recruiters', (): void => {
    // eslint-disable-next-line prettier/prettier
    it('Should update all the data in an specific recruiter', async (): Promise<
      void
    > => {
      const bulk = await db.Recruiter.bulkCreate([
        {
          contactName: 'Victor Alarcon',
          email: 'valarcon@gmail.com',
          company: 'Globant',
          siteUrl: 'www.globant.com',
        },
        {
          contactName: 'Lionel Messi',
          email: 'Liomessi@barcelona.es',
          company: 'BarcelonaFC',
          siteUrl: 'www.BarcelonaFC.com',
        },
      ]);

      const newRecruiterData: Recruiter = {
        contactName: 'Homero Simpson',
        email: 'HJS@Springfield.com',
        company: 'Planta Nuclear',
        siteUrl: 'www.lossimpson.com',
      };

      await db.Recruiter.update(newRecruiterData, {
        where: { id: bulk[1].id },
      });

      const foundRecruiter = await db.Recruiter.findOne({
        where: { id: bulk[1].id },
      });
      expect(foundRecruiter).to.deep.include(newRecruiterData);
      expect(foundRecruiter).to.not.include({ email: 'Liomessi@barcelona.es' });
    });

    // eslint-disable-next-line prettier/prettier
    it('Should update some data in an specific recruiter', async (): Promise<
      void
    > => {
      const bulk = await db.Recruiter.bulkCreate([
        {
          contactName: 'Victor Alarcon',
          email: 'valarcon@gmail.com',
          company: 'Globant',
          siteUrl: 'www.globant.com',
        },
        {
          contactName: 'Lionel Messi',
          email: 'Liomessi@barcelona.es',
          company: 'BarcelonaFC',
          siteUrl: 'www.BarcelonaFC.com',
        },
      ]);

      const newRecruiterData = {
        contactName: 'Jose Romero',
        email: 'JRomero@globant.com',
      };

      await db.Recruiter.update(newRecruiterData, {
        where: { id: bulk[0].id },
      });

      const foundRecruiter = await db.Recruiter.findOne({
        where: { id: bulk[0].id },
      });
      expect(foundRecruiter).to.deep.include(newRecruiterData);
      expect(foundRecruiter).to.include({
        company: 'Globant',
        siteUrl: 'www.globant.com',
      });
    });
  });

  describe('DELETE Recruiters', (): void => {
    it('Should delete an specific recruiter', async (): Promise<void> => {
      const newRecruiter = await db.Recruiter.create({
        contactName: 'Victor Alarcon',
        email: 'valarcon@gmail.com',
        company: 'Globant',
        siteUrl: 'www.globant.com',
      });

      const response = await request(Server).delete(
        `/api/v1/recruiters/${newRecruiter.id}`
      );
      expect(response.status).to.be.equal(204);
      const foundRecruiter = await db.Recruiter.findOne({
        where: { id: newRecruiter.id },
      });
      expect(foundRecruiter).to.equal(null);
    });
  });
});
