const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const verifyToken = require("../middleware/auth");
const {
  getAll,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  updateQuantity,
  updateBookImage,
} = require("../controller/bookController");

router.route("/").get(getAll).post(upload.single("cover"), createBook);
router
  .route("/:id")
  .get(getBook)
  .put(verifyToken, upload.single("cover"), updateBook)
  .delete(verifyToken, deleteBook);
router.route("/quantity/:id").put(verifyToken, updateQuantity);
router
  .route("/image/:id")
  .put(verifyToken, upload.single("cover"), updateBookImage);

module.exports = router;
