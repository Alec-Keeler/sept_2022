'use strict';

const { Entree } = require('../models');

const entrees = [
  // allowing entreeTypeId to be null for an entree:
  {
    name: "Egg Salad",
    description: "Mayonnaise with egg",
    price: 18.49,
  },
];

module.exports = {
  async up (queryInterface, Sequelize) {
    for (let entreeInfo of entrees) {
      const { name, description, price } = entreeInfo;
      await Entree.create({ name, description, price });
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Entrees', {
      where: { name: entrees.map(entree => entree.name) }
    }, {});
  }
};