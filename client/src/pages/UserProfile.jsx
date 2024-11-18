import Recommend from "../components/Recommend";
export default function UserProfile() {
  const books = ['The Great Gatsby', 'The Catcher in the Rye', 'To Kill a Mockingbird', '1984', 'Brave New World', 'The Grapes of Wrath']
  return <div>
    <Recommend books={books}/>
  </div>;
}
