import { useState, useEffect } from "react";

export default function GoogleBook({ book, api_url }) {
  const [saveBook, setSaveBook] = useState(false);
  const [languageName, setLanguageName] = useState(""); 
  const languageCode = book?.volumeInfo?.language; 

  // Fetch the language name using the code
  useEffect(() => {
    const fetchLanguageName = async () => {
      try {
        const response = await fetch(`${api_url}/languages/${languageCode}`);
        if (!response.ok) {
          throw new Error(`Error fetching language: ${response.statusText}`);
        }
        const data = await response.json();
        setLanguageName(data.name); // Set the fetched language name
      } catch (error) {
        console.error("Failed to fetch language name:", error);
        setLanguageName("Unknown"); // Fallback in case of error
      }
    };

    if (languageCode) {
      fetchLanguageName();
    }
  }, [languageCode, api_url]);

  const toggleSaveBook = () => {
    setSaveBook((prev) => !prev);
  };

  return (
    <article>
      <figure>
        <img src={book?.volumeInfo?.imageLinks?.thumbnail} alt="" />
      </figure>
      <h3 className="font-bold">{book?.volumeInfo?.title}</h3>
      <p>Authors: {book?.volumeInfo?.authors?.join(", ")}</p>
      <p>Published Date: {book?.volumeInfo?.publishedDate}</p>
      <p>Page Count: {book?.volumeInfo?.pageCount}</p>
      <p>Language: {languageName || "Loading..."} {/* Display the fetched language name */}</p>
      <p>Description: {book?.volumeInfo?.description?.slice(0, 100)}</p>
      <p>Categories: {book?.volumeInfo?.categories?.join(", ")}</p>
      <p onClick={toggleSaveBook}>{saveBook ? "❤️" : "🤍"}</p>
    </article>
  );
}
