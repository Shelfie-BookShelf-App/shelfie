const express = require("express");
const {
  getBooks,
  addBook,
  addFavoriteBook,
  deleteBook,
} = require("../controllers/book.js");

const router = express.Router();
router.route("/").get(getBooks).post(addFavoriteBook);
router.route("/:book_id").delete(deleteBook);

module.exports = router;
