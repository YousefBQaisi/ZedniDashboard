const express = require("express");
const {
  createUser,
  getUsers,
  getOneUser,
  deleteUser,
  updateUser,
} = require("../controller/UserController");

const router = express.Router();
router.post("/addNew", createUser);
router.get("/", getUsers);
router.get("/:id", getOneUser);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser);

module.exports = router;
