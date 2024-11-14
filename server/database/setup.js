const { pool } = require("../config/database");

const createUsersTable = async () => {
  try {
    const createUsersTableQuery = `
      DROP TABLE IF EXISTS users;
      
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY, 
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      ); 
    `;
    await pool.query(createUsersTableQuery);
    console.log(`✅ createUsersTable created successfully`);
  } catch (err) {
    console.log("❌ failed to createUsersTable");
    console.error(err);
  }
};

const createBooksTable = async () => {
  try {
    const createBooksTableQuery = `
      DROP TABLE IF EXISTS books;
     
      CREATE TABLE IF NOT EXISTS books (
        id VARCHAR(255) PRIMARY KEY,
        title TEXT NOT NULL,
        image TEXT NOT NULL,
        description TEXT NOT NULL,
        pageCount INTEGER NOT NULL,
        language VARCHAR(255) NOT NULL
      ); 
    `;
    await pool.query(createBooksTableQuery);
    console.log(`✅ createBooksTable created successfully`);
  } catch (err) {
    console.log("❌ failed to createBooksTable");
    console.error(err);
  }
};

const createUsersBooksTable = async () => {
  try {
    const createUsersBooksTableQuery = `
      DROP TABLE IF EXISTS users_books;

      CREATE TABLE IF NOT EXISTS users_books (
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        book_id VARCHAR(255) REFERENCES books(id) ON DELETE CASCADE,
        PRIMARY KEY (user_id, book_id)
      );
    `;
    await pool.query(createUsersBooksTableQuery);
    console.log(`✅ createUsersBooksTable created successfully`);
  } catch (err) {
    console.log("❌ failed to createUsersBooksTable");
    console.error(err);
  }
};

const createCatagoriesTable = async () => {
  try {
    const createCategoriesBooksTableQuery = `
      DROP TABLE IF EXISTS categories;

      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        category_name VARCHAR(255) NOT NULL
      );
    `;
    await pool.query(createCategoriesBooksTableQuery);
    console.log(`✅ createCatagoriesTable created successfully`);
  } catch (err) {
    console.log("❌ failed to createCatagoriesTable");
    console.error(err);
  }
};

const createCategoriesBooksTable = async () => {
  try {
    const createCategoriesBooksTableQuery = `
      DROP TABLE IF EXISTS categories_books;

      CREATE TABLE IF NOT EXISTS categories_books (
        book_id VARCHAR(255) REFERENCES books(id) ON DELETE CASCADE,
        category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
        PRIMARY KEY (book_id, category_id)
      );
    `;
    await pool.query(createCategoriesBooksTableQuery);
    console.log(`✅ createCategoriesBooksTable created successfully`);
  } catch (err) {
    console.log("❌ failed to createCategoriesBooksTable");
    console.error(err);
  }
};

const createAuthorsTable = async () => {
  try {
    const createAuthorsTableQuery = `
      DROP TABLE IF EXISTS authors;

      CREATE TABLE IF NOT EXISTS authors (
        id SERIAL PRIMARY KEY,
        author_name VARCHAR(255) NOT NULL
      );
    `;
    await pool.query(createAuthorsTableQuery);
    console.log(`✅ createAuthorsTable created successfully`);
  } catch (err) {
    console.log("❌ failed to createAuthorsTable");
    console.error(err);
  }
};

const createAuthorsBooksTable = async () => {
  try {
    const createAuthorsBooksTableQuery = `
      DROP TABLE IF EXISTS authors_books;

      CREATE TABLE IF NOT EXISTS authors_books (
        author_id INTEGER REFERENCES authors(id) ON DELETE CASCADE,
        book_id VARCHAR(255) REFERENCES books(id) ON DELETE CASCADE,
        PRIMARY KEY (author_id, book_id)
      );
    `;
    await pool.query(createAuthorsBooksTableQuery);
    console.log(`✅ createAuthorsBooksTable created successfully`);
  } catch (err) {
    console.log("❌ failed to createAuthorsBooksTable");
    console.error(err);
  }
};

const setup = async () => {
  await createUsersTable();
  await createBooksTable();
  await createUsersBooksTable();
  await createCatagoriesTable();
  await createCategoriesBooksTable();
  await createAuthorsTable();
  await createAuthorsBooksTable();
};

setup();
