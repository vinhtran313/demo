'use strict';
const {
  Model
} = require('sequelize');

const MOOD = {
  MOOD1: 1,
  MOOD2: 2,
  MOOD3: 3,
  MOOD4: 4,
  MOOD5: 5,
}

module.exports = (sequelize, DataTypes) => {
  class Mood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Mood.belongsTo(models.User, {
        targetKey: "userID",
        foreignKey: "userID",
      });
    }
  }
  Mood.init({
    userID: DataTypes.CHAR(16),
    mood: {
      type: DataTypes.INTEGER,
      validate: {
        isValid(value) {
          if (!Object.values(MOOD).includes(value)) {
            throw new Error('mood is invalid')
          }
        },
      },
    }
  }, {
    sequelize,
    modelName: 'Mood',
    freezeTableName: true,
    tableName: 'moods',
    createdAt: 'insertTime',
    updatedAt: 'updateTime'
  });
  Mood.MOOD = MOOD;
  return Mood;
};