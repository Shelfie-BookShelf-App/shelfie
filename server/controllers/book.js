const { pool } = require('../config/database.js');

const addBook = async (req, res) => {
  try {
    const { title, image, description, pageCount, language, authors } = req.body
    
    let bookExisted = await pool.query('SELECT COUNT(*) FROM books WHERE title = $1', [title])
    if (bookExisted.rows[0] == 0) {
      await pool.query(`
        INSERT INTO books (title, image, description, pageCount, language, authors)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [title, image, description, pageCount, language, authors]
      )
    } 


    let book_id = await pool.query('SELECT id FROM books WHERE title = $1', [title])
    let bookSaved = await pool.query('SELECT COUNT(*) FROM users_books WHERE user_id = $1 AND book_id = $2', [req.user.id, book_id])
    if (bookSaved.rows[0] == 0) {
      await pool.query(`
        INSERT INTO users_books ( user_id, book_id )
        VALUES($1, $2)`,
        [req.user.id, book_id]
      )
    } else {
      res.status(409).json( { error: 'Book already saved' } )
      return
    }

    res.status(201).json(results.rows[0])
    console.log('🆕 new book created')
  }
  catch (error) {
      res.status(409).json( { error: error.message } )
      console.log('Error:', error.message)
  }
}

module.exports = { addBook }