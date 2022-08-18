'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSession extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.UserSession.belongsTo(models.User, {
        targetKey: "userID",
        foreignKey: "userID",
      });
    }
  }
  UserSession.init({
    userID: DataTypes.CHAR(16),
    sessionKey: DataTypes.CHAR(64),
    expiresAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UserSession',
    freezeTableName: true,
    tableName: 't_user_session',
    createdAt: 'insertTime',
    updatedAt: 'updateTime'
  });
  UserSession.removeAttribute('id');
  return UserSession;
};