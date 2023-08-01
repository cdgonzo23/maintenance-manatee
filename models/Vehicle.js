const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Vehicle extends Model {}

Vehicle.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    manufacturer: {
        type: DataTypes.STRING,
        allowNull: false
    },
    modelName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
    },
    nickname: {
        type: DataTypes.STRING,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'vehicle',
  }
);

module.exports = Vehicle;