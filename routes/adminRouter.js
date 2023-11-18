const express = require("express");
const router = express.Router();
const { register, login } = require("../controller/adminController");

router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
