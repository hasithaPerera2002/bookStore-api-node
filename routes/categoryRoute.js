const express = require("express");
const verifyToken = require("../middleware/auth");
const {
  create,
  update,
  deleteCategory,
} = require("../controller/categoryController");
const router = express.Router();

router.route("/").post(verifyToken, create);
router
  .route("/:id")
  .put(verifyToken, update)
  .delete(verifyToken, deleteCategory);

module.exports = router;
