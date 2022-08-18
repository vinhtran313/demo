'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('s_mood_daily', {
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
      mood: {
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
    await queryInterface.dropTable('s_mood_daily');
  }
};