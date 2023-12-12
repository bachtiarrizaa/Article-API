const express = require("express");
const router = express.Router();
const cAuth = require("../controllers/auth");

router.post("/register", cAuth.register);
router.post("/login", cAuth.login);
router.get("/get-all", cAuth.getAll);

module.exports = router;
