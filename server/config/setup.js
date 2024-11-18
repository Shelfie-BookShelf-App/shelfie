const { pool } = require("./database.js");
const { languages } = require("../data/languages.js");

const createUsersTable = async () => {
  try {
    const createUsersTableQuery = `
      DROP TABLE IF EXISTS users;
      
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        githubid int NOT NULL,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        password VARCHAR(255),
        avatarUrl VARCHAR(500) NOT NULL,
        accessToken VARCHAR(512) NOT NULL,
        name VARCHAR(255)
      ); 
    `;
    await pool.query(createUsersTableQuery);
    console.log(`✅ Table users created successfully`);
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
        authors TEXT NOT NULL,
        title TEXT NOT NULL,
        image TEXT NOT NULL,
        description TEXT NOT NULL,
        pageCount INTEGER NOT NULL,
        language VARCHAR(255) NOT NULL
      ); 
    `;
    await pool.query(createBooksTableQuery);
    console.log(`✅ Table books created successfully`);
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
    console.log(`✅ Table users_books created successfully`);
  } catch (err) {
    console.log("❌ failed to createUsersBooksTable");
    console.error(err);
  }
};

const createCategoriesTable = async () => {
  try {
    const createCategoriesBooksTableQuery = `
      DROP TABLE IF EXISTS categories;

      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        category_name VARCHAR(255) NOT NULL
      );
    `;
    await pool.query(createCategoriesBooksTableQuery);
    console.log(`✅ Table categories created successfully`);
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
    console.log(`✅ Table categories_books created successfully`);
  } catch (err) {
    console.log("❌ failed to createCategoriesBooksTable");
    console.error(err);
  }
};

// const createAuthorsTable = async () => {
//   try {
//     const createAuthorsTableQuery = `
//       DROP TABLE IF EXISTS authors;

//       CREATE TABLE IF NOT EXISTS authors (
//         id SERIAL PRIMARY KEY,
//         author_name VARCHAR(255) NOT NULL
//       );
//     `;
//     await pool.query(createAuthorsTableQuery);
//     console.log(`✅ Table authors created successfully`);
//   } catch (err) {
//     console.log("❌ failed to createAuthorsTable");
//     console.error(err);
//   }
// };

// const createAuthorsBooksTable = async () => {
//   try {
//     const createAuthorsBooksTableQuery = `
//       DROP TABLE IF EXISTS authors_books;

//       CREATE TABLE IF NOT EXISTS authors_books (
//         author_id INTEGER REFERENCES authors(id) ON DELETE CASCADE,
//         book_id VARCHAR(255) REFERENCES books(id) ON DELETE CASCADE,
//         PRIMARY KEY (author_id, book_id)
//       );
//     `;
//     await pool.query(createAuthorsBooksTableQuery);
//     console.log(`✅ Table authors_books created successfully`);
//   } catch (err) {
//     console.log("❌ failed to createAuthorsBooksTable");
//     console.error(err);
//   }
// };

const createLanguagesTable = async () => {
  try {
    const createLanguagesTableQuery = `
      DROP TABLE IF EXISTS languages;

      CREATE TABLE IF NOT EXISTS languages (
        id SERIAL PRIMARY KEY,
        language_code VARCHAR(255) NOT NULL,
        language_name VARCHAR(255) NOT NULL
      );
    `;
    await pool.query(createLanguagesTableQuery);
    console.log(`✅ Table languages created successfully`);
  } catch (err) {
    console.log("❌ failed to createLanguagesTable");
    console.error(err);
  }
};

const insertLanguages = async () => {
  try {
    const insertLanguagesQuery = `
      INSERT INTO languages (language_code, language_name)
      VALUES ($1, $2)
    `;
    for (const language of languages) {
      await pool.query(insertLanguagesQuery, [language.code, language.name]);
    }
    console.log(`✅ Languages inserted successfully`);
  } catch (err) {
    console.log("❌ failed to insertLanguages");
    console.error(err);
  }
};

const createUsersBooksRecTable = async () => {
  try {
    const createUsersBooksRecTableQuery = `
      DROP TABLE IF EXISTS users_books_rec;

      CREATE TABLE IF NOT EXISTS users_books_rec (
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        book_id VARCHAR(255) REFERENCES books(id) ON DELETE CASCADE,
        PRIMARY KEY (user_id, book_id)
      );
    `;
    await pool.query(createUsersBooksRecTableQuery);
    console.log(`✅ Table users_books_rec created successfully`);
  } catch (err) {
    console.log("❌ failed to createUsersBooksRecTable");
    console.error(err);
  }
};

const dropTable = async () => {
  try {
    const dropTableQuery = `
      DROP TABLE IF EXISTS users_books;
      DROP TABLE IF EXISTS users_books_rec;
      DROP TABLE IF EXISTS categories_books;
      DROP TABLE IF EXISTS books;
      DROP TABLE IF EXISTS languages;
    `;
    // DROP TABLE IF EXISTS users;
    // DROP TABLE IF EXISTS categories;
    await pool.query(dropTableQuery);
    console.log(`✅ Tables dropped successfully`);
  } catch (err) {
    console.log("❌ failed to dropTable");
    console.error(err);
  }
}

const setup = async () => {
  await dropTable();
  // await createUsersTable();
  await createBooksTable();
  await createUsersBooksTable();
  await createUsersBooksRecTable();
  await createCategoriesTable();
  await createCategoriesBooksTable();
  await createLanguagesTable();
  await insertLanguages();
};

setup();
