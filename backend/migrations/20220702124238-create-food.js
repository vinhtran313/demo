'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('foods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20),
      },
      userID: {
        type: Sequelize.CHAR(16)
      },
      date: {
        type: Sequelize.DATEONLY
      },
      foodTotal: {
        type: Sequelize.INTEGER
      },
      food1: {
        type: Sequelize.INTEGER
      },
      food2: {
        type: Sequelize.INTEGER
      },
      food3: {
        type: Sequelize.INTEGER
      },
      food4: {
        type: Sequelize.INTEGER
      },
      food5: {
        type: Sequelize.INTEGER
      },
      food6: {
        type: Sequelize.INTEGER
      },
      food7: {
        type: Sequelize.INTEGER
      },
      food8: {
        type: Sequelize.INTEGER
      },
      food9: {
        type: Sequelize.INTEGER
      },
      food10: {
        type: Sequelize.INTEGER
      },
      insertTime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updateTime: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      uniqueKeys: {
        userIDDateIndex: {
          fields: ['userID', 'date']
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('foods');
  }
};