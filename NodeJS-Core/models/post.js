'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      post.hasMany(models.comment, { foreignKey: 'postid' });
      post.hasMany(models.contentpost, { foreignKey: 'original_post_id' });
      post.hasOne(models.post_category, { foreignKey: 'post_id' });
    }
  }
  post.init({
    status: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};