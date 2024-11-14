import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../features/books/booksSlice";
import { useState } from "react";

export default function Search({ children }) {
  const [search, setSearch] = useState("");

  const { searchQuery } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(search));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={children}
        value={search}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
}
