const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports = {
  mustLogin: (req, res, next) => {
    try {
      const token = req.headers["authorization"].split("Bearer ")[1];
      if (!token) {
        return res.status(401).json({
          status: false,
          message: "you are not authorized!",
        });
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;

      next();
    } catch (error) {
      next(error);
    }
  },
  mustAdmin: (req, res, next) => {
    try {
      const token = req.headers["authorization"].split("Bearer ")[1];
      if (!token) {
        return res.status(401).json({
          status: false,
          message: "you are not authorized!",
        });
      }

      const decoded = jwt.verify(token, JWT_SECRET);

      if (decoded.role != 1) {
        return res.status(401).json({
          status: false,
          message: "you are not authorized, only admin can access",
        });
      }

      req.user = decoded;

      next();
    } catch (error) {
      next(error);
    }
  },
};
