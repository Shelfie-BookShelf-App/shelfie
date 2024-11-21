const express = require("express");
const {
  getBooks,
  addFavoriteBook,
  deleteBook,
  updatePagesRead,
  getPagesRead,
} = require("../controllers/book.js");

const router = express.Router();
router.route("/").get(getBooks).post(addFavoriteBook);
router.route("/:book_id").delete(deleteBook).put(updatePagesRead).get(getPagesRead);

module.exports = router;
