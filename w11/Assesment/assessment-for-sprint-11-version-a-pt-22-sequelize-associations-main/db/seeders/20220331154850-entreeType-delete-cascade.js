'use strict';

const { Entree, EntreeType } = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    const entreeType = await EntreeType.create({
      type: "Dairy",
      isVegetarian: false
    });
    const entree = await Entree.create({
      name: "Milk Bread",
      description: "Bread made with milk",
      price: 2.28,
      entreeTypeId: entreeType.id
    });
    await entreeType.destroy();
  },

  async down (queryInterface, Sequelize) {
    await EntreeType.destroy({
      where: {
        type: "Dairy",
      }
    });
    await Entree.destroy({
      where: {
        name: "Milk Bread",
      }
    });
  }
};
