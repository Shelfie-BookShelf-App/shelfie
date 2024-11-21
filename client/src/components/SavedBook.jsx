import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SavedBook({ savedBook, api_url, onBookRemoved }) {
  const { id, title, image, language, description, pagecount, authors } =
    savedBook;

  const [languageName, setLanguageName] = useState("");

  useEffect(() => {
    const fetchLanguageName = async () => {
      try {
        const response = await fetch(`${api_url}/languages/${language}`);
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

    if (language) {
      fetchLanguageName();
    }
  }, [language, api_url]);

  const navigate = useNavigate();

  const removeSavedBook = async () => {
    try {
      const res = await fetch(`${api_url}/api/books/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to delete book");
      }

      // Notify parent to remove the book from the list
      if (onBookRemoved) {
        onBookRemoved(id);
      } else {
        // Fallback to page refresh if no parent handler is provided
        navigate(0);
      }
    } catch (error) {
      console.error("Failed to delete book:", error);
      alert("Failed to delete book. Please try again.");
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
          src={image || "/placeholder.png"}
          alt={title || "Book Cover"}
          className="rounded-md max-h-48 object-cover"
        />
      </figure>
      <div style={{ flexGrow: 1 }}>
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Authors:</strong> {authors || "Unknown"}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Pages:</strong> {pagecount || "N/A"}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Language:</strong> {languageName || "Loading..."}
        </p>
        <p
          className="text-sm text-gray-600 mb-2"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            WebkitLineClamp: 2,
          }}
        >
          <strong>Description:</strong>{" "}
          {description || "No description available"}
        </p>
      </div>
      <button
        onClick={removeSavedBook}
        className="self-start px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
        style={{
          marginTop: "10px",
        }}
      >
        {"❤️ Saved - Click to Unsaved"}
      </button>
    </article>
  );
}
