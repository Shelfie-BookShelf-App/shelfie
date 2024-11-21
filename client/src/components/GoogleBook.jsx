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

  const toggleSaveBook = async () => {
    const { id } = book;
    console.log(book);
    const {
      title,
      imageLinks: { thumbnail },
      description,
      pageCount,
      language,
      authors,
      categories
    } = book?.volumeInfo;
    const favoriteBookObj = {
      id,
      title,
      image: thumbnail,
      description,
      pageCount,
      language,
      authors: authors?.join(", "),
      categories: categories?.join(", "),
    };
    const res = await fetch("http://localhost:3001/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(favoriteBookObj),
      credentials: "include",
    });
    if (res.ok) {
      setSaveBook(true);
    }
  };

  return (
    <article
      className="flex flex-col p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
      style={{
        width: "300px",
        margin: "0 auto",
        height: "600px",
        display: "flex",
      }}
    >
      <figure className="flex justify-center mb-4">
        <img
          src={book?.volumeInfo?.imageLinks?.thumbnail || "/placeholder.png"}
          alt={book?.volumeInfo?.title || "Book Cover"}
          className="rounded-md max-h-48 object-cover"
        />
      </figure>
      <div style={{ flexGrow: 1 }}>
        <h3 className="font-bold text-lg mb-2">{book?.volumeInfo?.title}</h3>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Authors:</strong>{" "}
          {book?.volumeInfo?.authors?.join(", ") || "Unknown"}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Published Date:</strong>{" "}
          {book?.volumeInfo?.publishedDate || "N/A"}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Pages:</strong> {book?.volumeInfo?.pageCount || "N/A"}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Language:</strong> {languageName || "Loading..."}
        </p>
        <p
          className="text-sm text-gray-600 mb-2 truncate-lines"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            WebkitLineClamp: 2,
          }}
        >
          <strong>Description:</strong>{" "}
          {book?.volumeInfo?.description || "No description available"}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Categories:</strong>{" "}
          {book?.volumeInfo?.categories?.join(", ") || "Uncategorized"}
        </p>
      </div>
      <button
        onClick={toggleSaveBook}
        className="self-start px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
        style={{
          marginTop: "10px",
        }}
      >
        {saveBook ? "❤️ Saved" : "🤍 Save"}
      </button>
    </article>
  );
}
