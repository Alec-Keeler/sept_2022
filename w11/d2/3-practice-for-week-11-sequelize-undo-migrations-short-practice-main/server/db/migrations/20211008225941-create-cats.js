'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cats', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(50)
      },
      weight: {
        type: Sequelize.FLOAT(4,1)
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Cats')
  }
};
