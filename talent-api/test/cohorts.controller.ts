import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
import db from '../server/models';

describe('Cohorts', () => {
  beforeEach(function () {
    db.Cohort.destroy({ where: {} });
  });

  describe('GET all cohorts', () => {
    it('should get all cohorts', async () => {
      await db.Cohort.create({
        name: 'WebFT-01',
      });
      await db.Cohort.create({
        name: 'WebFT-02',
      });
      await db.Cohort.create({
        name: 'WebFT-03',
      });
      const response = await request(Server).get('/api/v1/cohorts');
      expect(response.body).to.have.lengthOf(3);
      expect(response.body[0]).to.have.property('name').to.be.equal('WebFT-01');
      expect(response.body[1]).to.have.property('name').to.be.equal('WebFT-02');
      expect(response.body[2]).to.have.property('name').to.be.equal('WebFT-03');
    });
  });

  describe('DELETE a specific cohort', () => {
    it('should delete a cohort by id', async () => {
      const cohort1 = await db.Cohort.create({
        name: 'WebFT-01',
      });
      const response = await request(Server).delete(
        `/api/v1/cohorts/${cohort1.id}/delete`
      );
      const cohort = await db.Cohort.findOne({
        where: { id: cohort1.id },
      });
      expect(response.status).to.be.equal(200);
      expect(cohort).to.be.equal(null);
    });
  });
});
