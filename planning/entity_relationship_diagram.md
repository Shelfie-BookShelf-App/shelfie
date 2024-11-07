# Entity Relationship Diagram

Reference the Creating an Entity Relationship Diagram final project guide in the course portal for more information about how to complete this deliverable.

## List of Tables

👉🏾👉🏾👉🏾 List each table in your diagram:
- Users
- Favorite_Books
- Categories
- Users_Books
- Categories_Books

## Entity Relationship Diagram

![Entity Relationship Diagram](https://github.com/user-attachments/assets/fceb7bb3-c170-42e2-bd50-2f8c38042960)


---

### 1. Users

Contains information on individual users of the library.

| Column Name | Type    | Description                         |
|-------------|---------|-------------------------------------|
| id          | integer | Primary key, unique ID for each user |
| username    | varchar | User's unique username             |
| email       | varchar | User's email address               |
| password    | varchar | User's password                    |

---

### 2. Favorite_Books

Stores information on books that users have marked as favorites.

| Column Name      | Type    | Description                          |
|------------------|---------|--------------------------------------|
| id               | integer | Primary key, unique ID for each book |
| title            | varchar | Title of the book                    |
| author           | varchar | Author of the book                   |
| publishedDate    | integer | Year the book was published          |
| image            | varchar | Image link of the book cover         |
| description      | varchar | Description of the book              |
| pageCount        | integer | Number of pages in the book          |
| language         | varchar | Language of the book                 |

---

### 3. Users_Books

A join table connecting users and their favorite books, establishing a many-to-many relationship.

| Column Name | Type    | Description                      |
|-------------|---------|----------------------------------|
| user_id     | integer | Foreign key referencing Users    |
| book_id     | integer | Foreign key referencing Favorite_Books |

---

### 4. Categories

Lists different categories of books, such as Fiction, Non-Fiction, Sci-Fi, etc.

| Column Name    | Type    | Description                |
|----------------|---------|----------------------------|
| id             | integer | Primary key for each category |
| category_name  | varchar | Name of the book category  |

---

### 5. Categories_Books

A join table associating books with various categories, enabling a many-to-many relationship.

| Column Name | Type    | Description                              |
|-------------|---------|------------------------------------------|
| book_id     | integer | Foreign key referencing Favorite_Books   |
| category_id | integer | Foreign key referencing Categories       |

--- 
