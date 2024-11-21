const { pool } = require("../config/database.js");

const getBooks = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userBooksQuery = `
      SELECT books.id, books.title, books.image, books.description, books.pagecount, books.language, books.authors
      FROM users_books
      INNER JOIN books ON users_books.book_id = books.id
      WHERE users_books.user_id = $1
    `;
    const books = await pool.query(userBooksQuery, [req.user.id]);
    if (books.rows.length === 0) {
      return res.status(200).json({ error: "No books found" });
    }
    return res.status(200).json({ books: books.rows });
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving books from user" });
  }
};

const addFavoriteBook = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id, title, image, description, pageCount, language, authors } =
      req.body;

    let bookId;

    const existingBook = await pool.query(
      "SELECT id FROM books WHERE title = $1",
      [title]
    );

    if (existingBook.rows.length > 0) {
      bookId = existingBook.rows[0].id;
    } else {
      const newBook = await pool.query(
        `INSERT INTO books (id, title, image, description, pagecount, language, authors)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [id, title, image, description, pageCount, language, authors]
      );
      bookId = newBook.rows[0].id;
    }

    const isBookSaved = await pool.query(
      `SELECT * FROM users_books WHERE user_id = $1 AND book_id = $2`,
      [req.user.id, bookId]
    );

    if (isBookSaved.rows.length > 0) {
      return res.status(409).json({ error: "Book already saved" });
    } else {
      await pool.query(
        "INSERT INTO users_books (user_id, book_id) VALUES ($1, $2)",
        [req.user.id, bookId]
      );
    }
    return res.status(201).json({ message: "Book saved successfully" });
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ error: "Error occurred while saving the book" });
  }
};

const deleteBook = async (req, res) => {
  try {
    // console.log("Deleting route hit");
    // console.log("user", req.user);
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const { book_id } = req.params;

    console.log("user_id:", req.user.id);
    console.log("book_id:", book_id);

    const checkBookQuery =
      "SELECT * FROM users_books WHERE user_id = $1 AND book_id = $2";
    const existingBook = await pool.query(checkBookQuery, [
      req.user.id,
      book_id,
    ]);

    if (existingBook.rows.length === 0) {
      return res.status(404).json({ error: "Book is not found" });
    }

    const deleteBookQuery =
      "DELETE FROM users_books WHERE user_id = $1 AND book_id = $2";
    await pool.query(deleteBookQuery, [req.user.id, book_id]);

    return res
      .status(200)
      .json({ message: "Book has been deleted successfully" });
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ error: "An error occured while deleting a book" });
  }
};

module.exports = { getBooks, addFavoriteBook, deleteBook };
