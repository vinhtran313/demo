'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KneePainDaily extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.KneePainDaily.belongsTo(models.User, {
        targetKey: "userID",
        foreignKey: "userID",
      });
    }
  }
  KneePainDaily.init({
    userID: DataTypes.CHAR(16),
    date: DataTypes.DATEONLY,
    kneePain: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'KneePainDaily',
    freezeTableName: true,
    tableName: 's_knee_pain_daily',
    createdAt: 'insertTime',
    updatedAt: 'updateTime'
  });
  return KneePainDaily;
};