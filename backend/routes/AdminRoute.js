const express = require("express");
const { createAdmin, logInAdmin } = require("../controller/AdminController");

const router = express.Router();
router.post("/", createAdmin);
router.post("/login", logInAdmin);
module.exports = router;
