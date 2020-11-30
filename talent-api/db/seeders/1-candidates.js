'use strict';
const faker = require('faker');
// import * as enums from '../../server/models/enums';

const visibility = ['unlisted', 'listed'];

const status = ['unemployed', 'employed'];

const comment = [
  faker.lorem.paragraph().slice(0, 80),
  faker.lorem.paragraph().slice(0, 170),
  null,
  faker.lorem.paragraph().slice(0, 30),
];

function fill() {
  let candidates = [];
  for (let candidate = 1; candidate <= 50; candidate++) {
    const randomStatus = status[Math.floor(Math.random() * status.length)];
    const randomVisbilty =
      visibility[Math.floor(Math.random() * visibility.length)];
    const bio = faker.lorem.paragraph().slice(0, 200);
    const randomComment = comment[Math.round(Math.random() * comment.length)];
    candidates.push({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      country: faker.address.country(),
      email: faker.internet.email(),
      cohort_id: candidate,
      mini_bio: bio,
      profile_picture: faker.image.people(),
      linkedin: faker.internet.url(),
      github: faker.internet.url(),
      status: randomStatus,
      visibility: randomVisbilty,
      score: faker.random.number({ min: 0, max: 5, precision: 0.1 }),
      comment: randomComment,
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    });
  }
  return candidates;
}

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('candidates', fill(), {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('candidates', null, {});
  },
};
