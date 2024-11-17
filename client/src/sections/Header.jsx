import Nav from "../components/Nav";
import Search from "../components/Search";
import UserAvatar from "../components/UserAvatar";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 fixed w-full top-0 left-0 z-10">
      <h1>Shelfie</h1>
      <Nav />
      {/* <UserAvatar /> */}
    </header>
  );
}
