'use strict';
const {
  Model
} = require('sequelize');

const KNEE_PAIN = {
  KNEE_PAIN_1: 1,
  KNEE_PAIN_2: 2,
  KNEE_PAIN_3: 3,
  KNEE_PAIN_4: 4,
  KNEE_PAIN_5: 5,
}

module.exports = (sequelize, DataTypes) => {
  class KneePain extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.KneePain.belongsTo(models.User, {
        targetKey: "userID",
        foreignKey: "userID",
      });
    }
  }
  KneePain.init({
    userID: DataTypes.CHAR(16),
    kneePain: {
      type: DataTypes.INTEGER,
      validate: {
        isValid(value) {
          if (!Object.values(KNEE_PAIN).includes(value)) {
            throw new Error('kneePain is invalid')
          }
        },
      },
    }
  }, {
    sequelize,
    modelName: 'KneePain',
    freezeTableName: true,
    tableName: 'knee_pains',
    createdAt: 'insertTime',
    updatedAt: 'updateTime'
  });
  KneePain.KNEE_PAIN = KNEE_PAIN
  return KneePain;
};