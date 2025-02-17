'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      comment.hasMany(models.comment, { foreignKey: 'parentid', targetKey: 'id' });
    }
  }
  comment.init({
    content: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN,
    post_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    parentid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comment',
  });
  return comment;
};