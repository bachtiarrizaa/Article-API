"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Article.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });

      Article.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Article.init(
    {
      image: DataTypes.STRING,
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Article",
    }
  );
  return Article;
};
