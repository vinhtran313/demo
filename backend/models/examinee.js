'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Examinee extends Model {
    static associate(models) {
      // define association here
    }
  }
  Examinee.init({
    id: {
      type: DataTypes.CHAR(16),
      primaryKey: true,
    },
    username: DataTypes.STRING,
    passsword: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Examinee',
    tableName: 'examinees',
    createdAt: 'insertTime',
    updatedAt: 'updateTime'
  });
  return Examinee;
};