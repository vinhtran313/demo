'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('examinees', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.CHAR(16)
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      passsword: {
        allowNull: false,
        type: Sequelize.STRING
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
        usernameIndex: {
          fields: ['username']
        },
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('examinees');
  }
};