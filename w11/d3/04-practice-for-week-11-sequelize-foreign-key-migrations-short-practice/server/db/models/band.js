'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Band extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Your code here
<<<<<<< HEAD
      Band.hasMany(models.Musician,
        {
          foreignKey: 'bandId',
          onDelete: 'CASCADE',
          hooks: true
        });
=======
      Band.hasMany( models.Musician,{
          foreignKey: "bandId",
          onDelete: "CASCADE",
          hooks: true
        }
      )
>>>>>>> 3fd5e66de568f60c716ce247bb48104398145f3d
    }
  };
  Band.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

  }, {
    sequelize,
    modelName: 'Band',
  });
  return Band;
};
