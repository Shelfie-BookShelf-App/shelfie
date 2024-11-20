import Recommend from "../components/Recommend";
import SavedBooks from "../components/SavedBooks";
export default function Saved_Books({ api_url }) {
  const books = [
    "The Great Gatsby",
    "The Catcher in the Rye",
    "To Kill a Mockingbird",
    "1984",
    "Brave New World",
    "The Grapes of Wrath",
  ];

  return (
    <div>
      <SavedBooks />
      <Recommend books={books} api_url={api_url} />
    </div>
  );
}
