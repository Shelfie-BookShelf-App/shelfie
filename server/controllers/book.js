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
    console.log(books.rows);
    if (books.rows.length === 0) {
      return res.status(200).json({ error: "No books found" });
    }

    const categoriesQuery = `
      SELECT categories.category_name
      FROM categories_books
      INNER JOIN categories ON categories_books.category_id = categories.id
      WHERE categories_books.book_id = $1
    `;
    for (const book of books.rows) {
      const categories = await pool.query(categoriesQuery, [book.id]);
      console.log(categories);
      book.categories = categories.rows.map((category) => category.category_name);
    }

    console.log(books.rows)

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

    const { id, title, image, description, pageCount, language, authors, categories } =
      req.body;

    console.log(req.body);

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
        "INSERT INTO users_books (user_id, book_id, pagesRead) VALUES ($1, $2, $3)",
        [req.user.id, bookId, 0]
      );
    }

    const categoriesArr = categories.split(", ");
    for (const category of categoriesArr) {
      const existingCategory = await pool.query(
        `SELECT * FROM categories WHERE category_name = $1`,
        [category]
      );

      let categoryId;
      if (existingCategory.rows.length > 0) {
        categoryId = existingCategory.rows[0].id;
      } else {
        const newCategory = await pool.query(
          `INSERT INTO categories (category_name) VALUES ($1) RETURNING *`,
          [category]
        );
        categoryId = newCategory.rows[0].id;
      }

      const isCategorySaved = await pool.query(
        `SELECT * FROM categories_books WHERE category_id = $1 AND book_id = $2`,
        [categoryId, bookId]
      );

      if (isCategorySaved.rows.length === 0) {
        await pool.query(
          `INSERT INTO categories_books (category_id, book_id) VALUES ($1, $2)`,
          [categoryId, bookId]
        );
      }
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
    console.log("Deleting route hit");
    console.log("user", req.user);
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

    const deleteCategoriesQuery =
      "DELETE FROM categories_books WHERE book_id = $1";
    await pool.query(deleteCategoriesQuery, [book_id]);

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

const updatePagesRead = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { book_id } = req.params;
    const { pagesRead } = req.body;

    const checkBookQuery =
      "SELECT * FROM users_books WHERE user_id = $1 AND book_id = $2";
    const existingBook = await pool.query(checkBookQuery, [
      req.user.id,
      book_id,
    ]);

    if (existingBook.rows.length === 0) {
      return res.status(404).json({ error: "Book is not found" });
    }

    const updatePagesReadQuery =
      "UPDATE users_books SET pagesread = $1 WHERE user_id = $2 AND book_id = $3";
    await pool.query(updatePagesReadQuery, [pagesRead, req.user.id, book_id]);

    return res.status(200).json({ message: "Pages read updated successfully" });
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ error: "An error occured while updating pages read" });
  }
}

const getPagesRead = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { book_id } = req.params;

    const checkBookQuery =
      "SELECT * FROM users_books WHERE user_id = $1 AND book_id = $2";
    const existingBook = await pool.query(checkBookQuery, [
      req.user.id,
      book_id,
    ]);

    if (existingBook.rows.length === 0) {
      return res.status(404).json({ error: "Book is not found" });
    }

    return res.status(200).json({ pagesread: existingBook.rows[0].pagesread });
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ error: "An error occured while retrieving pages read" });
  }
}

module.exports = { getBooks, addFavoriteBook, deleteBook, updatePagesRead, getPagesRead };
