const express = require("express");
const router = express.Router();
const cCategory = require("../controllers/categories");

router.post("/create", cCategory.create);
router.get("/get-all", cCategory.getAll);

module.exports = router;
