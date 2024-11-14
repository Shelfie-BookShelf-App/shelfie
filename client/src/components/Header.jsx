import Nav from "./Nav";
import Search from "./Search";
import UserAvatar from "./UserAvatar";

export default function Header() {
  return (
    <header className="flex justify-between items-center">
      <h1>Shelfie</h1>
      <Search>Search for the book you want...</Search>
      <Nav />
      <UserAvatar />
    </header>
  );
}
