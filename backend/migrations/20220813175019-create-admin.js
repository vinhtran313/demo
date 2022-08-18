'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('admins', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.CHAR(16)
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
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
        emailIndex: {
          fields: ['email'],
        },
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('admins');
  }
};