'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NoticeUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NoticeUser.init({
    noticeId: DataTypes.INTEGER,
    userID: DataTypes.CHAR(16),
    read: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'NoticeUser',
    freezeTableName: true,
    tableName: 'notice_users',
    createdAt: 'insertTime',
    updatedAt: 'updateTime'
  });
  return NoticeUser;
};