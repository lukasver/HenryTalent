// @ts-nocheck
// /* eslint-disable */
import Sequelize from 'sequelize';
import { url as DB_URL } from '../../db/config.cjs';
import Candidate from './Candidate.model';
import Folder from './Folder.model';
import Recruiter from './Recruiter.model';
import Skill from './Skill.model';
import User from './User.model';
import Comment from './Comment.model';
import Cohort from './Cohort.model';
interface DB {
  sequelize: any;
  Sequelize: any;
  Candidate: any;
  Recruiter: any;
  Skill: any;
  Folder: any;
  User: any;
  Comment: any;
  Cohort: any;
}

// Set up Sequelize connection
const sequelize = new Sequelize(DB_URL, {
  define: {
    underscored: true,
  },
  // TODO: logging
  logging: false,
});

// Create all models...
const db: DB = {
  User: User(sequelize),
  Skill: Skill(sequelize),
  Folder: Folder(sequelize),
  Candidate: Candidate(sequelize),
  Recruiter: Recruiter(sequelize),
  Comment: Comment(sequelize),
  Cohort: Cohort(sequelize),
};

// ...and all associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
