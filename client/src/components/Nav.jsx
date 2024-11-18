import { NavLink } from 'react-router-dom';

export default function Nav({ user, api_url }) {
  const AUTH_URL = `${api_url}/auth/logout`;
  const AUTH_URL_LOGIN = `${api_url}/auth/github`;

  const logout = async (event) => {
    event.preventDefault(); // Prevent the default navigation
    try {
      const response = await fetch(AUTH_URL, { credentials: 'include' });
      if (!response.ok) {
        throw new Error('Failed to log out');
      }
      const json = await response.json();
      console.log(json);
      window.location.href = '/'; // Redirect to home after logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav>
      <ul className="flex items-center gap-4 list-none">
        <li>
          <NavLink to="/" className="text-white">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/search" className="text-white">
            Search
          </NavLink>
        </li>
        <li>
          <NavLink to="/saved_books" className="text-white">
            Saved Books
          </NavLink>
        </li>
        {user && user.id ? (
          <li>
            <a
              href="/"
              onClick={logout}
              className="text-white cursor-pointer"
            >
              Logout
            </a>
          </li>
        ) : (
          <li>
            <a
              href={AUTH_URL_LOGIN}
              className="text-white cursor-pointer"
            >
              🔒 Login via GitHub
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
}
