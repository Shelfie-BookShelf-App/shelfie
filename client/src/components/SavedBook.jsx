import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SavedBook({ savedBook, api_url }) {
  const { id, title, image, language, description, pagecount, authors, categories } =
    savedBook;

  const [languageName, setLanguageName] = useState("");
  const [pagesRead, setPagesRead] = useState(0);
  const [debouncedPagesRead, setDebouncedPagesRead] = useState(0);

  useEffect(() => {
    const fetchLanguageName = async () => {
      try {
        const response = await fetch(`${api_url}/languages/${language}`);
        if (!response.ok) {
          throw new Error(`Error fetching language: ${response.statusText}`);
        }
        const data = await response.json();
        setLanguageName(data.name);
      } catch (error) {
        console.error("Failed to fetch language name:", error);
        setLanguageName("Unknown");
      }
    };

    if (language) {
      fetchLanguageName();
    }
  }, [language, api_url]);

  useEffect(() => {
    const fetchPagesRead = async () => {
      try {
        const res = await fetch(`${api_url}/api/books/${id}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch pages read");
        const data = await res.json();
        setPagesRead(data.pagesread);
      } catch (error) {
        console.error("Error fetching pages read:", error);
      }
    };

    fetchPagesRead();
  }, [id, api_url]);

  // Debounce `pagesRead` updates
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedPagesRead(pagesRead);
    }, 1000); // Wait 1 second before updating

    return () => clearTimeout(handler);
  }, [pagesRead]);

  // Update the backend when `debouncedPagesRead` changes
  useEffect(() => {
    const updatePagesRead = async () => {
      try {
        const res = await fetch(`${api_url}/api/books/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ pagesRead: debouncedPagesRead }),
        });

        if (!res.ok) {
          throw new Error("Failed to update pages read");
        }
      } catch (error) {
        console.error("Error updating pages read:", error);
      }
    };

    if (debouncedPagesRead !== 0) {
      updatePagesRead();
    }
  }, [debouncedPagesRead, id, api_url]);

  const navigate = useNavigate();

  const removeSavedBook = async () => {
    try {
      const res = await fetch(`${api_url}/api/books/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        navigate(0); // Refresh the page after deletion
      } else {
        throw new Error("Failed to delete book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const sliderStyles = {
    container: {
      position: "relative",
      width: "100%",
      height: "30px",
      marginBottom: "1rem",
    },
    slider: {
      width: "100%",
      position: "absolute",
      bottom: 0,
      height: "2px",
      backgroundColor: "#e5e7eb",
      appearance: "none",
      cursor: "pointer",
    },
    label: {
      position: "absolute",
      top: "0",
      transform: "translateX(-50%)",
      color: "black",
      padding: "2px 6px",
      borderRadius: "4px",
      fontSize: "12px",
      left: `${(pagesRead / pagecount) * 100}%`,
    },
  };

  return (
    <article
      className="flex flex-col p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
      style={{
        width: "300px",
        margin: "0 auto",
        minHeight: "600px",
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
          className="text-sm text-gray-600 mb-2 truncate-lines"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            WebkitLineClamp: 2,
          }}
        >
          <strong>Description:</strong> {description || "No description available"}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Categories:</strong> {categories.join(", ") || "Uncategorized"}
        </p>
      </div>
      <button
        onClick={removeSavedBook}
        className="self-start px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
        style={{
          marginTop: "10px",
        }}
      >
        ❤️ Saved - Click to Unsaved
      </button>
      <div style={sliderStyles.container}>
        <div style={sliderStyles.label}>{pagesRead}</div>
        <input
          type="range"
          min="0"
          max={pagecount}
          value={pagesRead}
          onChange={(e) => setPagesRead(parseInt(e.target.value))}
          className="w-full"
          style={{
            ...sliderStyles.slider,
            background: `linear-gradient(to right, #3b82f6 ${(pagesRead / pagecount) * 100}%, #e5e7eb ${(pagesRead / pagecount) * 100}%)`,
          }}
        />
      </div>
    </article>
  );
}
