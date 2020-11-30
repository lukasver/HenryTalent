import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Comment extends Model {
    static associate(models) {
      // define associations here, e.g.
      this.belongsTo(models.Folder);
      this.belongsTo(models.Recruiter);
      this.belongsTo(models.User);
    }
  }

  Comment.init(
    {
      content: { type: DataTypes.TEXT, allowNull: false },
    },
    {
      sequelize,
      modelName: 'comment',
    }
  );
  return Comment;
};
