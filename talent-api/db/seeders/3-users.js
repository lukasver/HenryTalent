'use strict';
const faker = require('faker');

function fill() {
  let users = [];
  const roles = ['admin', 'creator', 'selector'];
  for (let user = 1; user <= 15; user++) {
    users.push({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      profile_picture: faker.internet.avatar(),
      role: faker.helpers.randomize(roles),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    });
  }
  return users;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', fill(), {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
