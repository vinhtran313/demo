'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MoodDaily extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.MoodDaily.belongsTo(models.User, {
        targetKey: "userID",
        foreignKey: "userID",
      });
    }
  }
  MoodDaily.init({
    userID: DataTypes.CHAR(16),
    date: DataTypes.DATEONLY,
    mood: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'MoodDaily',
    freezeTableName: true,
    tableName: 's_mood_daily',
    createdAt: 'insertTime',
    updatedAt: 'updateTime'
  });
  return MoodDaily;
};