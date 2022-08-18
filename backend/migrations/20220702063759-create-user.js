'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('m_user', {
      userID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.CHAR(16)
      },
      area: {
        type: Sequelize.TINYINT
      },
      deviceType: {
        type: Sequelize.STRING(256)
      },
      deviceId: {
        type: Sequelize.STRING(256)
      },
      pushtoken: {
        type: Sequelize.STRING(256)
      },
      givenNameKanji: {
        type: Sequelize.STRING(256)
      },
      sex: {
        type: Sequelize.TINYINT
      },
      birthYear: {
        type: Sequelize.CHAR(4)
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
    await queryInterface.dropTable('m_user');
  }
};