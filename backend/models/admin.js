'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {
      // define association here
    }
  }
  Admin.init({
    id: {
      type: DataTypes.CHAR(16),
      primaryKey: true,
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Admin',
    tableName: 'admins',
    createdAt: 'insertTime',
    updatedAt: 'updateTime'
  });
  return Admin;
};