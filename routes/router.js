const express = require("express");
const router = express.Router();
const {
  getAll,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../controller/bookController");

router.route("/").get(getAll).post(createBook);
router.route("/:id").get(getBook).put(updateBook).delete(deleteBook);

module.exports = router;
