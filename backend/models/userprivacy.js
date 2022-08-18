'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPrivacy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.UserPrivacy.belongsTo(models.User, {
        targetKey: "userID",
        foreignKey: "userID",
      });
    }
  }
  UserPrivacy.init({
    userID: {
      primaryKey: true,
      type: DataTypes.CHAR(16),
    },
    givenNameKanji: DataTypes.STRING,
    familyNameKanji: DataTypes.STRING,
    birthYear: DataTypes.CHAR(4),
    sex: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserPrivacy',
    freezeTableName: true,
    tableName: 'm_privacy',
    createdAt: 'insertTime',
    updatedAt: 'updateTime'
  });
  UserPrivacy.removeAttribute('id');
  return UserPrivacy;
};