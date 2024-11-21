import SavedBook from "./SavedBook";

export default function SavedBooks({savedBooks, api_url}) {

  return (
    <ul className="flex flex-wrap gap-4">
      {savedBooks?.map((savedBook) => (
        <li key={savedBook.id} className="list-none">
          <SavedBook savedBook={savedBook} api_url={api_url} />
        </li>
      ))}
    </ul>
  );
}
