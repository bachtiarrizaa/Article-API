const { User, Role } = require("../../models");

module.exports = async (req, res, next) => {
  try {
    const findData = await User.findAll({
      include: [{ model: Role, as: "role" }],
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
