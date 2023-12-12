const { Category } = require("../../models");

module.exports = async (req, res, next) => {
  try {
    const { name } = req.body;

    const findArticle = await Category.findOne({ where: { name } });

    if (findArticle) {
      return res.status(409).json({
        status: false,
        message: "category already exist",
      });
    }

    const created = await Category.create({
      name,
    });

    return res.status(201).json({
      status: true,
      message: "create category successfull",
      data: created,
    });
  } catch (error) {
    next(error);
  }
};
