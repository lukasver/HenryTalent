/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Recruiter extends Model {
    static associate(models) {
      // define associations here, e.g.
      this.hasMany(models.Folder);
      this.hasMany(models.Comment);
    }
  }

  Recruiter.init(
    {
      contactName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      company: { type: DataTypes.STRING, allowNull: false },
      siteUrl: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'recruiter',
    }
  );
  return Recruiter;
};
