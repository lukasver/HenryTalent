import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
import db from '../server/models';

describe('Filter', () => {
  beforeEach(function () {
    db.Candidate.destroy({ where: {} });
  });

  describe('Filter candidates', () => {
    const arrayCohorts = [];

    for (let i = 1; i <= 7; i++) {
      arrayCohorts.push({
        name: `WebFT-0${i}`,
      });
    }
    const Jarrod = {
      id: 1,
      firstName: 'Jarrod',
      lastName: 'Davis',
      country: 'Slovenia',
      email: 'Betsy.Kunze87@hotmail.com',
      profilePicture:
        'https://s3.amazonaws.com/uifaces/faces/twitter/marosholly/128.jpg',
      cohortId: 7,
      miniBio:
        'Veniam quis a et suscipit consectetur accusantium libero. Aut suscipit qui numquam et in omnis nihil veritatis. Necessitatibus voluptas libero laborum necessitatibus. Quaerat unde ab et non dolor ea q',
      linkedin: 'http://laney.net',
      github: 'http://leo.com',
      visibility: 'listed',
      status: 'employed',
    };
    const Laurence = {
      id: 2,
      firstName: 'Laurence',
      lastName: 'Hane',
      country: 'Chad',
      email: 'Tyreek_Nader76@hotmail.com',
      profilePicture:
        'https://s3.amazonaws.com/uifaces/faces/twitter/stushona/128.jpg',
      cohortId: 5,
      miniBio:
        'Consectetur et perferendis eius repellendus assumenda nobis. Est aspernatur ratione reprehenderit facilis totam eaque eius veniam. Unde laboriosam autem id tempore saepe expedita. Fugiat quo praesenti',
      linkedin: 'https://terrell.biz',
      github: 'http://manley.biz',
      visibility: 'listed',
      status: 'employed',
    };
    const Drake = {
      id: 3,
      firstName: 'Drake',
      lastName: 'Sipes',
      country: 'Afghanistan',
      email: 'Orie46@gmail.com',
      profilePicture:
        'https://s3.amazonaws.com/uifaces/faces/twitter/bcrad/128.jpg',
      cohortId: 5,
      miniBio:
        'Culpa officia rerum dolorem dolores voluptas molestias rerum sint. Fuga sed culpa a. Dolores dolore hic maiores dolorem temporibus maxime qui eum aut.',
      linkedin: 'https://maeve.biz',
      github: 'http://margarett.org',
      visibility: 'listed',
      status: 'employed',
    };
    const Francesco = {
      id: 4,
      firstName: 'Francesco',
      lastName: 'Rath',
      country: 'Cambodia',
      email: 'Alta_Greenfelder80@gmail.com',
      profilePicture:
        'https://s3.amazonaws.com/uifaces/faces/twitter/ripplemdk/128.jpg',
      cohortId: 2,
      miniBio:
        'Hic explicabo dicta sint. Aut molestiae et repellat voluptatibus eveniet dolores ut. Harum consequatur molestias. Dolor et et magni modi voluptas perspiciatis facilis facere sed. Eius et eligendi aper',
      linkedin: 'http://alysson.com',
      github: 'http://vivien.info',
      visibility: 'listed',
      status: 'unemployed',
    };
    const Andreanne = {
      id: 5,
      firstName: 'Andreanne',
      lastName: 'Morissette',
      country: 'United Kingdom',
      email: 'Mortimer_McKenzie@gmail.com',
      profilePicture:
        'https://s3.amazonaws.com/uifaces/faces/twitter/lawlbwoy/128.jpg',
      cohortId: 1,
      miniBio:
        'Earum est dolores. Architecto et neque illo delectus sequi perspiciatis sunt excepturi. Sit dolores voluptate at eum veniam quos voluptatum. Eligendi architecto dignissimos impedit. Reiciendis beatae ',
      linkedin: 'http://quinton.org',
      github: 'http://lottie.com',
      visibility: 'listed',
      status: 'employed',
    };

    const skillsOne = {
      id: 1,
      name: 'trabajo en equipo ',
      type: 'soft',
    };
    const skillsTwo = {
      id: 2,
      name: 'react',
      type: 'tech',
    };
    const skillsThree = {
      id: 3,
      name: 'liderazgo',
      type: 'soft',
    };
    const skillsFour = {
      id: 4,
      name: 'html5',
      type: 'tech',
    };
    const skillsFive = {
      id: 5,
      name: 'javascript',
      type: 'tech',
    };

    const bodyFilterOne = {
      cohortId: '7,2',
    };

    const bodyFilterTwo = {
      cohortId: '1,2,7,5',
      locations: 'United Kingdom,Afghanistan',
    };
    const bodyFilterThree = {
      cohortId: '1,2,7,5',
      locations: 'Chad,Slovenia',
      skills: 'trabajo en equipo,react,liderazgo,html5',
    };

    it('should filter candidates', async () => {
      const candidates = await db.Candidate.bulkCreate([
        Jarrod,
        Laurence,
        Drake,
        Francesco,
        Andreanne,
      ]);
      const skills = await db.Skill.bulkCreate([
        skillsOne,
        skillsTwo,
        skillsThree,
        skillsFour,
        skillsFive,
      ]);
      const cohorts = await db.Cohort.bulkCreate(arrayCohorts);

      await candidates[0].addSkills(skills[0]);
      await candidates[0].addSkills(skills[1]);
      await candidates[1].addSkills(skills[2]);
      await candidates[1].addSkills(skills[3]);

      const filterOne = await request(Server)
        .get('/api/v1/candidates/filter')
        .query(bodyFilterOne);
      expect(filterOne.body.candidates).to.be.an('array').to.have.lengthOf(2);
      expect(filterOne.body.candidates[0].id).to.be.equal(1);
      expect(filterOne.body.candidates[0].firstName).to.be.equal('Jarrod');
      expect(filterOne.body.candidates[1].id).to.be.equal(4);
      expect(filterOne.body.candidates[1].firstName).to.be.equal('Francesco');

      const filterTwo = await request(Server)
        .get('/api/v1/candidates/filter')
        .query(bodyFilterTwo);
      expect(filterTwo.body.candidates).to.be.an('array').to.have.lengthOf(2);
      expect(filterTwo.body.candidates[1].firstName).to.equal('Drake');
      expect(filterTwo.body.candidates[0].firstName).to.equal('Andreanne');

      const filterThree = await request(Server)
        .get('/api/v1/candidates/filter')
        .query(bodyFilterThree);
      expect(filterThree.body.candidates).to.be.an('array').to.have.lengthOf(2);
      expect(filterThree.body.candidates[0].id).to.be.equal(1);
      expect(filterThree.body.candidates[0].firstName).to.be.equal('Jarrod');
      expect(filterThree.body.candidates[1].id).to.be.equal(2);
      expect(filterThree.body.candidates[1].firstName).to.be.equal('Laurence');
    });
  });
});
