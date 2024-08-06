'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contentpost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      contentpost.belongsTo(models.language, { foreignKey: 'language_id' });
    }
  }
  contentpost.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    language_id: DataTypes.INTEGER,
    original_post_id: DataTypes.INTEGER,
    slug: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'contentpost',
    tableName: 'content_posts'
  });
  return contentpost;
};