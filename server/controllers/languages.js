const { pool } = require('../config/database.js');

const getLanguageNameByCode = async (req, res, next) => {
    const { code } = req.params; // Expect the language code as a route parameter
    if (!code) {
      return res.status(400).json({ error: 'Language code is required' });
    }
  
    try {
      const getLanguageNameQuery = `
        SELECT language_name 
        FROM languages 
        WHERE language_code = $1
      `;
      const result = await pool.query(getLanguageNameQuery, [code]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: `No language found for code: ${code}` });
      }
  
      res.json({ code, name: result.rows[0].language_name });
    } catch (err) {
      console.error("❌ Error fetching language name", err);
      next(err); // Pass error to Express error handler
    }
  };
  
  module.exports = { getLanguageNameByCode };
  