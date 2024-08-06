'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasOne(models.Role, { foreignKey: 'id' })
      user.hasMany(models.comment, { foreignKey: 'userid', targetKey: 'id' });
      user.hasMany(models.post, { foreignKey: 'user_id' })
    }
  }
  user.init({
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    refreshtoken: DataTypes.STRING,
    otp: DataTypes.STRING,
    avatar: DataTypes.TEXT,
    deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};