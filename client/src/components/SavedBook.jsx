import { useNavigate } from "react-router-dom";

export default function SavedBook({ savedBook }) {
  const { id, title, image, language, description, pageCount, authors } =
    savedBook;

  const navigate = useNavigate();

  const removeSavedBook = async () => {
    const res = await fetch(`http://localhost:3001/api/books/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      navigate(0);
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
        {/* <p className="text-sm text-gray-600 mb-1">
          <strong>Published Date:</strong> {publishedDate || "N/A"}
        </p> */}
        <p className="text-sm text-gray-600 mb-1">
          <strong>Pages:</strong> {pageCount || "N/A"}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Language:</strong> {language || "Loading..."}
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
          {description || "No description available"}
        </p>
        {/* <p className="text-sm text-gray-600 mb-2">
          <strong>Categories:</strong>{" "}
          {book?.volumeInfo?.categories?.join(", ") || "Uncategorized"}
        </p> */}
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