'use strict';

const { Entree, Ingredient, EntreeIngredient } = require('../models');

const entreeToIngredients = [
  {
    entreeName: "John's Impossible Burger",
    ingredients: [
      { name: "Impossible Meat", quantity: 12 },
      { name: "Chopped Lettuce", quantity: 0.5 },
      { name: "Tomatoes", quantity: 0.25 },
      { name: "Cheese", quantity: 4 },
    ]
  },
  {
    entreeName: "Caesar Salad",
    ingredients: [
      { name: "Chopped Lettuce", quantity: 2 },
      { name: "Tomatoes", quantity: 0.5 },
      { name: "Carrots", quantity: 1 },
    ],
  },
  {
    entreeName: "Chicken Noodle Soup",
    ingredients: [
      { name: "Chicken Breast", quantity: 1.5 },
      { name: "Chicken Stock", quantity: 6 },
      { name: "Egg Noodle", quantity: 1 },
      { name: "Potatoes", quantity: 2 },
    ],
  },
  {
    entreeName: "Steak Frites",
    ingredients: [
      { name: "Steak", quantity: 6 },
      { name: "Potatoes", quantity: 4 },
    ],
  }
];

module.exports = {
  async up (queryInterface, Sequelize) {
    for (let entreeInfo of entreeToIngredients) {
      const entree = await Entree.findOne({ where: { name: entreeInfo.entreeName }});
      for (let ingredientInfo of entreeInfo.ingredients) {
        const ingredient = await Ingredient.findOne({
          where: { name: ingredientInfo.name }
        });
        await EntreeIngredient.create({
          entreeId: entree.id,
          ingredientId: ingredient.id,
          quantity: ingredientInfo.quantity,
        });
      }
    }
  },

  async down (queryInterface, Sequelize) {
    for (let entreeInfo of entreeToIngredients) {
      const entree = await Entree.findOne({ where: { name: entreeInfo.entreeName }});
      const ingredients = await Ingredient.findAll({
        where: { name: entreeInfo.ingredients.map(ing => ing.name) }
      });
      await entree.removeIngredients(ingredients);
    }
  }
};
