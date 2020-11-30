'use strict';
const faker = require('faker');
const uuid = require('uuidv4');
function fill() {
  const folders = [];
  const statuses = ['created', 'sent'];
  let id = 1;
  for (let folder = 14; folder >= 1; folder--) {
    folders.push({
      uuid: uuid.uuid(),
      opened: faker.random.boolean(),
      status: faker.random.arrayElement(statuses),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
      user_id: folder,
      recruiter_id: folder,
    });
    id++;
  }
  return folders;
}
function relationCandidatesFolders() {
  const folder_candidates = [];
  let count = 0;
  for (let i = 1; i < 15; i++) {
    if (i % 5 === 0) {
      count = i;
    }
    for (let j = 1; j <= 5; j++) {
      let candidate = {
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
        folder_id: i,
        candidate_id: j + count,
      };
      folder_candidates.push(candidate);
    }
  }
  return folder_candidates;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('folders', fill(), {});
    await queryInterface.bulkInsert(
      'folder_candidates',
      relationCandidatesFolders(),
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('folders', null, {});
  },
};
