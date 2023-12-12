const { Article } = require("../../models");
const { uploadToStorage } = require("../../middlewares/cloudStorage");

module.exports = async (req, res, next) => {
  try {
    const { title, content, category_id } = req.body;
    const image = req.file;

    const findArticle = await Article.findOne({ where: { title } });

    if (findArticle) {
      return res.status(409).json({
        status: false,
        message: "article already exist",
      });
    }

    const folder = "src";   // src/image
    const name = "image";

     const imageUrl = await uploadToStorage(image, folder, name);

    const created = await Article.create({
      image: imageUrl,
      title,
      content,
      category_id,
      user_id: req.user.id,
    });

    return res.status(201).json({
      status: true,
      message: "create article successfull",
      data: created,
    });
  } catch (error) {
    next(error);
  }
};
