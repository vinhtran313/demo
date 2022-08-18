'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('silmees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT(20),
      },
      userID: {
        type: Sequelize.CHAR(16)
      },
      deviceId: {
        type: Sequelize.STRING
      },
      deviceUser: {
        type: Sequelize.STRING
      },
      regDate: {
        type: Sequelize.DATE
      },
      lastCloneTime: {
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
        userIDIndex: {
          fields: ['userID']
        },
        deviceIdIndex: {
          fields: ['deviceId']
        }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('silmees');
  }
};