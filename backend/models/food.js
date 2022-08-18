'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Food.belongsTo(models.User, {
        targetKey: "userID",
        foreignKey: "userID",
      });
    }
  }
  Food.init({
    userID: DataTypes.CHAR(16),
    date: DataTypes.DATEONLY,
    foodTotal: DataTypes.INTEGER,
    food1: DataTypes.INTEGER,
    food2: DataTypes.INTEGER,
    food3: DataTypes.INTEGER,
    food4: DataTypes.INTEGER,
    food5: DataTypes.INTEGER,
    food6: DataTypes.INTEGER,
    food7: DataTypes.INTEGER,
    food8: DataTypes.INTEGER,
    food9: DataTypes.INTEGER,
    food10: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Food',
    freezeTableName: true,
    tableName: 'foods',
    createdAt: 'insertTime',
    updatedAt: 'updateTime'
  });
  return Food;
};