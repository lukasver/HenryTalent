'use strict';
const faker = require('faker');

const skills = {
  tech: [
    'javascript',
    'react',
    'html5',
    'nodeJs',
    'express',
    'sequelize',
    'php',
    'python',
    'flask',
    'passport',
    'java',
    'C',
    'AWS',
    'C++',
    'angular',
    'C#',
  ],
  soft: ['compañerismo', 'trabajo en equipo', 'liderazgo', 'flexible'],
  other: ['Ruso', 'Ingles'],
};
function mixer(skills) {
  const skillsRandom = [];
  let j = 0;
  for (let i = 0; i <= 50; i++) {
    if (i <= 15) {
      skillsRandom.push({
        name: skills.tech[i],
        type: 'tech',
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      });
    }
    if (i >= 16 && i <= 19) {
      if (i == 16) j = 0;
      skillsRandom.push({
        name: skills.soft[j],
        type: 'soft',
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      });
      j++;
    }
    if (i >= 20 && i <= 21) {
      if (i == 20) j = 0;
      skillsRandom.push({
        name: skills.other[j],
        type: 'other',
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
      });
      j++;
    }
  }
  return skillsRandom;
}
function relationCandidateSkills() {
  let candidate_skills = [];
  let count = 0;
  for (let i = 1; i <= 21; i++) {
    if (i % 5 === 0) {
      count = i;
    }
    for (let j = 1; j <= 5; j++) {
      if (i >= 20) count = 0;
      let skill = {
        created_at: faker.date.past(),
        updated_at: faker.date.recent(),
        skill_id: j + count,
        candidate_id: i,
      };
      candidate_skills.push(skill);
    }
  }
  return candidate_skills;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('skills', mixer(skills), {});
    await queryInterface.bulkInsert(
      'candidate_skills',
      relationCandidateSkills()
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('skills', null, {});
  },
};