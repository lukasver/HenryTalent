'use strict';
const faker = require('faker');

function fill() {
  let recruiters = [];
  for (let id = 1; id <= 15; id++){
    recruiters.push({
      contact_name: faker.name.firstName(),
      email: faker.internet.email(),
      company: faker.name.lastName(),
      site_url: faker.internet.url(),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    });
  }
  return recruiters;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('recruiters', fill(), {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('recruiters', null, {});
  },
};
