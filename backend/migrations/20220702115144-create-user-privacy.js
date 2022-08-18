'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('m_privacy', {
      userID: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.CHAR(16)
      },
      givenNameKanji: {
        type: Sequelize.STRING(256)
      },
      familyNameKanji: {
        type: Sequelize.STRING(256)
      },
      birthYear: {
        type: Sequelize.CHAR(4)
      },
      sex: {
        type: Sequelize.TINYINT
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
    await queryInterface.dropTable('m_privacy');
  }
};