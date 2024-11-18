import Nav from "../components/Nav";
import UserAvatar from "../components/UserAvatar";

export default function Header({user, api_url}) {
  return (
    <header className="header flex justify-between items-cent3er p-8 px-12 fixed w-full top-0 left-0 z-10">
      <h1>Shelfie</h1>
      <Nav user={user} api_url={api_url}/>
      {user && user.id ? <UserAvatar user={user} /> : null}
    </header>
  );
}
