'use strict';

const { EntreeType } = require('../models');

const entreeTypes = [
  {
    type: "Beef",
    isVegetarian: false,
  },
  {
    type: "Chicken",
    isVegetarian: false,
  },
  {
    type: "Goat",
    isVegetarian: false,
  },
  {
    type: "Jackfruit",
    isVegetarian: true,
  },
  {
    type: "Plant-based",
    isVegetarian: true,
  },
  {
    type: "Pork",
    isVegetarian: false,
  },
  {
    type: "Soy",
    isVegetarian: true,
  },
];

module.exports = {
  async up (queryInterface, Sequelize) {
    await EntreeType.bulkCreate(entreeTypes, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('EntreeTypes', {
      where: { type: entreeTypes.map(entreeType => entreeType.type) }
    }, {});
  }
};
