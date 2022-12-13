'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Entrees', 
      'entreeTypeId', 
      {
        type: Sequelize.INTEGER,
        references: { model: 'EntreeTypes' },
        onDelete: 'CASCADE',
        // allowNull: false, // will fail test specs
      },
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Entrees', 'entreeTypeId');
  }
};