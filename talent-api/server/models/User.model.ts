/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Model, DataTypes } from 'sequelize';
// import { USE } from 'sequelize/types/lib/index-hints';
import { USER_ROLES } from './enums';

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Folder);
      this.hasMany(models.Comment);
    }
  }

  User.init(
    {
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: { isUrl: true },
      },
      role: {
        type: DataTypes.ENUM,
        values: [USER_ROLES.Admin, USER_ROLES.Creator, USER_ROLES.Selector],
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'user',
    }
  );

  return User;
};
