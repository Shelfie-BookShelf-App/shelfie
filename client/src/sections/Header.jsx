import Nav from "../components/Nav";
import Search from "../components/Search";
import UserAvatar from "../components/UserAvatar";

export default function Header() {
  return (
    <header className="header flex justify-between items-cent3er p-8 px-12 fixed w-full top-0 left-0 z-10">
      <h1>Shelfie</h1>
      <Nav />
      {/* <UserAvatar /> */}
    </header>
  );
}
