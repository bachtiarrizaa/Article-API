const { Article, User, Category } = require("../../models");

module.exports = async (req, res, next) => {
  try {
    const findData = await Article.findAll({
      include: [
        { model: Category, as: "category" },
        { model: User, as: "user" },
      ],
    });

    if (!findData) {
      return res.status(404).json({
        status: false,
        message: "data not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "get all success",
      data: findData,
    });
  } catch (error) {
    next(error);
  }
};
