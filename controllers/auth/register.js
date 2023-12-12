const { User } = require("../../models");
const bcrypt = require("bcrypt");

module.exports = async (req, res, next) => {
  try {
    const { name, email, username, password } = req.body;

    const findEmail = await User.findOne({ where: { email } });
    const findUsername = await User.findOne({ where: { username } });

    if (findEmail || findUsername) {
      return res.status(409).json({
        status: false,
        message: "email or username already exist",
      });
    }

    if (username.length < 6) {
      return res.status(400).json({
        status: false,
        message: "username must be at least 6 characters",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        status: false,
        message: "password must be at least 8 characters",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const created = await User.create({
      name,
      email,
      username,
      password: hashPassword,
      role_id: 1,
      is_verified: true,
    });

    return res.status(201).json({
      status: true,
      message: "successfuly create a new user",
      data: {
        name: created.name,
        email: created.email,
        username: created.username,
        role_id: created.role,
        is_verified: created.is_verified,
      },
    });
  } catch (error) {
    next(error);
  }
};
