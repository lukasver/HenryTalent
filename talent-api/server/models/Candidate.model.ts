/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Model, DataTypes } from 'sequelize';
import { VISIBILITY, STATUS } from './enums';

export default (sequelize) => {
  class Candidate extends Model {
    static associate(models) {
      // define associations here, e.g.
      this.belongsToMany(models.Skill, {
        through: 'candidate_skills',
      });
      this.belongsToMany(models.Folder, {
        through: 'folder_candidates',
      });
      this.belongsTo(models.Cohort);
    }
  }
  Candidate.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      miniBio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      linkedin: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      github: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      visibility: {
        type: DataTypes.ENUM,
        values: [VISIBILITY.Unlisted, VISIBILITY.Listed, VISIBILITY.Private],
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM,
        values: [STATUS.Unemployed, STATUS.Employed],
        allowNull: true,
      },
      score: {
        type: DataTypes.DECIMAL(2, 1),
        allowNull: true,
        validate: {
          min: 0,
          max: 5,
        },
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'candidate',
    }
  );

  return Candidate;
};
