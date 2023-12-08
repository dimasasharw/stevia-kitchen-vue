'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Menu.hasMany(models.Transaction, {foreignKey: 'MenuId'})
    }
  }
  Menu.init({
    name: DataTypes.STRING,
    sides: DataTypes.STRING,
    price: DataTypes.NUMBER,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};