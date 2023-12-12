const express = require("express");
const router = express.Router();
const auth = require("./auth");
const categories = require("./categories");
const article = require("./article");

router.use("/auth", auth);
router.use("/category", categories);
router.use("/article", article);

module.exports = router;
