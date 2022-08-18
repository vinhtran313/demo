'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('knee_pains', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20),
      },
      userID: {
        type: Sequelize.CHAR(16)
      },
      kneePain: {
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('knee_pains');
  }
};