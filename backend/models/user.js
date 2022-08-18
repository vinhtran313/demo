"use strict";
const { Model } = require("sequelize");

const AREAS = {
  ITABASHI: 1,
  CHIYODA: 2,
  OTHER: 3,
};

const DEVICE_TYPE = {
  ANDROID: "A",
  IOS: "I",
};

const SEX = {
  MAN: 1,
  WOMAN: 2,
};

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Food, {
        sourceKey: "userID",
        foreignKey: "userID",
        as: "Foods",
      });
      models.User.hasMany(models.KneePain, {
        sourceKey: "userID",
        foreignKey: "userID",
        as: "KneePains",
      });
      models.User.hasMany(models.KneePainDaily, {
        sourceKey: "userID",
        foreignKey: "userID",
        as: "KneePainDailies",
      });
      models.User.hasMany(models.Mood, {
        sourceKey: "userID",
        foreignKey: "userID",
        as: "Moods",
      });
      models.User.hasMany(models.MoodDaily, {
        sourceKey: "userID",
        foreignKey: "userID",
        as: "MoodDailies",
      });
      models.User.belongsToMany(models.Notice, {
        through: models.NoticeUser,
        sourceKey: "userID",
        foreignKey: "userID",
        as: "Notices",
      });
      models.User.hasMany(models.UserPrivacy, {
        sourceKey: "userID",
        foreignKey: "userID",
        as: "UserPrivacies",
      });
      models.User.hasMany(models.UserSession, {
        sourceKey: "userID",
        foreignKey: "userID",
        as: "UserSessions",
      });
      models.User.hasMany(models.Silmee, {
        sourceKey: "userID",
        foreignKey: "userID",
        as: "Silmees",
      });
    }
  }
  User.init(
    {
      userID: {
        type: DataTypes.CHAR(16),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      area: {
        type: DataTypes.TINYINT,
        validate: {
          isValid(value) {
            if (!Object.values(AREAS).includes(value)) {
              throw new Error("area is invalid");
            }
          },
        },
      },
      deviceType: {
        type: DataTypes.STRING,
        validate: {
          isValid(value) {
            if (!Object.values(DEVICE_TYPE).includes(value)) {
              throw new Error("deviceType is invalid");
            }
          },
        },
      },
      deviceId: DataTypes.STRING(256),
      pushtoken: DataTypes.STRING(256),
      givenNameKanji: DataTypes.STRING(256),
      sex: {
        type: DataTypes.TINYINT,
        validate: {
          isValid(value) {
            if (!Object.values(SEX).includes(value)) {
              throw new Error("sex is invalid");
            }
          },
        },
      },
      birthYear: DataTypes.CHAR(4),
    },
    {
      sequelize,
      modelName: "User",
      freezeTableName: true,
      tableName: "m_user",
      createdAt: "insertTime",
      updatedAt: "updateTime",
    }
  );
  // User.removeAttribute('id');
  User.AREAS = AREAS;
  User.DEVICE_TYPE = DEVICE_TYPE;
  User.SEX = SEX;
  return User;
};
