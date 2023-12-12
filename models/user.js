"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: "role_id",
        as: "role",
      });

      User.hasMany(models.Article, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      email_token: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
      address: DataTypes.STRING,
      role_id: DataTypes.INTEGER,
      is_verified: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
