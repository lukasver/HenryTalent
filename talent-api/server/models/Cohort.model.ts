import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Cohort extends Model {
    static associate(models) {
      // define associations here, e.g.
      this.hasMany(models.Candidate);
    }
  }
  Cohort.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'cohort',
    }
  );
  return Cohort;
};
