'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EntreeIngredients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EntreeIngredients.init({
    entreeId:  DataTypes.INTEGER,
    ingredientId: DataTypes.INTEGER,
    quantity: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'EntreeIngredients',
  });
  return EntreeIngredients;
};
