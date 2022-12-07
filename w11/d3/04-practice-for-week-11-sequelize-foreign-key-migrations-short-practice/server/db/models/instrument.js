'use strict';
const {
  Model
} = require('sequelize');
const musician = require('./musician');
module.exports = (sequelize, DataTypes) => {
  class Instrument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Your code here
      Instrument.belongsToMany(models.Musician, {
        through: models.MusicianInstrument,
<<<<<<< HEAD
        foreignKey: 'instrumentId',
        otherKey: 'musicianId'
      });
=======
        foreignKey: "instrumentId",
        otherKey: "musicianId"
      })
>>>>>>> 3fd5e66de568f60c716ce247bb48104398145f3d
    }
  };
  Instrument.init({
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Instrument',
  });
  return Instrument;
};
