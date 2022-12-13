'use strict';

const { Ingredient } = require('../models');

const ingredients = [
  {
    name: "Impossible Meat",
    measurement: "ounces",
  },
  {
    name: "Chopped Lettuce",
    measurement: "cups",
  },
  {
    name: "Tomatoes",
    measurement: "whole tomatoes",
  },
  {
    name: "Cheese",
    measurement: "slices",
  },
  {
    name: "Steak",
    measurement: "ounces",
  },
  {
    name: "Chicken Breast",
    measurement: "pounds",
  },
  {
    name: "Carrots",
    measurement: "cups",
  },
  {
    name: "Egg Noodle",
    measurement: "pounds",
  },
  {
    name: "Chicken Stock",
    measurement: "pounds",
  },
  {
    name: "Potatoes",
    measurement: "whole potatoes",
  },
];

module.exports = {
  async up (queryInterface, Sequelize) {
    await Ingredient.bulkCreate(ingredients, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Ingredients', {
      where: { name: ingredients.map(ingredient => ingredient.name) }
    }, {});
  }
};
