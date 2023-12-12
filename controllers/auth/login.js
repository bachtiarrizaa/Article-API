const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  try {
    const { usernameOrEmail, password } = req.body;

    const isEmail = usernameOrEmail.includes("@");

    const user = await User.findOne({
      where: { [isEmail ? "email" : "username"]: usernameOrEmail },
    });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: false,
        message: "password doesn't match",
      });
    }

    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role_id,
    };

    const token = jwt.sign(payload, JWT_SECRET);

    return res.status(200).json({
      status: true,
      message: "login succesfull",
      data: payload,
      token,
    });
  } catch (error) {
    next(error);
  }
};
