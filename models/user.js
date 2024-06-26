'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.pemesanan, {
        foreignKey: 'id', as: 'pemesanan'
      })
    }
  }
  user.init({
    nama_user: DataTypes.STRING,
    foto: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('admin','resepsionis','customer')
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};