'use strict';
const faker = require('faker');

function fill() {
  let cohorts = [];
  let j;
  for (let id = 1; id <= 50; id++) {
    if (id < 10) j = `0${id}`;
    else j = id;
    cohorts.push({
      name: `WebFT-${j}`,
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    });
  }
  return cohorts;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('cohorts', fill(), {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cohorts', null, {});
  },
};
