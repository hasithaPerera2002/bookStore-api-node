const express = require("express");
const router = express.Router();
const { register } = require("../controller/adminController");

router.route("/register").post(register);

module.exports = router;
