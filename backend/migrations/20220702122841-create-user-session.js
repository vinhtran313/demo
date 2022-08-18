'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('t_user_session', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20),
      },
      userID: {
        type: Sequelize.CHAR(16)
      },
      sessionKey: {
        type: Sequelize.CHAR(64)
      },
      expiresAt: {
        type: Sequelize.DATE
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
        userIDsessionKeyIndex: {
          fields: ['userID', 'sessionKey']
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('t_user_session');
  }
};