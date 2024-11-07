import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGoogleBooks } from "../features/books/booksSlice";
import GoogleBook from "./GoogleBook";

const query = "bestsellers";
const apiKey = import.meta.env.VITE_API_KEY;
const URL = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&key=${apiKey}`;

export default function GoogleBooks() {
  const [errorMsg, setErrorMsg] = useState("");

  const { googleBooks } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGoogleBooks = async () => {
      try {
        const res = await fetch(URL);
        if (!res.ok) {
          throw new Error("Failed to fetch google books data");
        }
        const data = await res.json();
        dispatch(setGoogleBooks(data.items));
      } catch (err) {
        setErrorMsg(err.message);
      }
    };

    fetchGoogleBooks();
  }, []);

  if (errorMsg) return <h3>{errorMsg}</h3>;

  return (
    <ul>
      {googleBooks.map((book) => (
        <li key={book.id}>
          <GoogleBook book={book} />
        </li>
      ))}
    </ul>
  );
}
