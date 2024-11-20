import { useState, useEffect } from "react";
import SavedBook from "./SavedBook";

export default function SavedBooks() {
  const [savedBooks, setSavedBooks] = useState([]);

  useEffect(() => {
    const fetchSavedBooks = async () => {
      const res = await fetch("http://localhost:3001/api/books", {
        credentials: "include",
      });
      const data = await res.json();
      setSavedBooks(data.books);
    };

    fetchSavedBooks();
  }, []);

  return (
    <ul className="pt-12 flex flex-wrap gap-4">
      {savedBooks?.map((savedBook) => (
        <li key={savedBook.id} className="list-none">
          <SavedBook savedBook={savedBook} />
        </li>
      ))}
    </ul>
  );
}
