/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Model, DataTypes } from 'sequelize';
import { FOLDER_STATUS } from './enums';

export default (sequelize) => {
  class Folder extends Model {
    static associate(models) {
      // define associations here, e.g.
      this.belongsToMany(models.Candidate, {
        through: 'folder_candidates',
      });
      this.belongsTo(models.Recruiter);
      this.belongsTo(models.User);
      this.hasMany(models.Comment);
    }
  }

  Folder.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      opened: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: DataTypes.ENUM,
        values: Object.values(FOLDER_STATUS),
        defaultValue: FOLDER_STATUS.Draft,
      },
      sentAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'folder',
    }
  );

  return Folder;
};
