'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class language extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      language.hasMany(models.contentpost, { foreignKey: 'language_id' });
    }
  }
  language.init({
    title: DataTypes.STRING,
    code: DataTypes.STRING,
    deleted: DataTypes.INTEGER,
    flag: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'language',
  });
  return language;
};