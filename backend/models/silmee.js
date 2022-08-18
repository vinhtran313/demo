'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Silmee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Silmee.belongsTo(models.User, {
        targetKey: "userID",
        foreignKey: "userID",
      });
    }
  }
  Silmee.init({
    userID: DataTypes.CHAR(16),
    deviceId: DataTypes.STRING,
    deviceUser: DataTypes.STRING,
    regDate: DataTypes.DATE,
    lastCloneTime: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Silmee',
    tableName: 'silmees',
    freezeTableName: true,
    createdAt: 'insertTime',
    updatedAt: 'updateTime'
  });
  return Silmee;
};