'use strict';
const {
  Model
} = require('sequelize');

const AREAS = {
  ITABASHI: 1,
  CHIYODA: 2,
  OTHER: 3,
  SPECIFIC: 4,
  ALL: 5
}

module.exports = (sequelize, DataTypes) => {
  class Notice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Notice.belongsToMany(models.User, {
        through: models.NoticeUser,
        sourceKey: "id",
        foreignKey: "noticeId",
        as: "Users",
      });
    }
  }
  Notice.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    area: {
      type: DataTypes.TINYINT,
      validate: {
        isValid(value) {
          if (!Object.values(AREAS).includes(value)) {
            throw new Error('area is invalid')
          }
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Notice',
    freezeTableName: true,
    tableName: 'notices',
    createdAt: 'insertTime',
    updatedAt: 'updateTime'
  });

  Notice.AREAS = AREAS
  return Notice;
};