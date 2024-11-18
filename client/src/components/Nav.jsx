import { NavLink, useNavigate, Link } from 'react-router-dom';

export default function Nav({ user, api_url }) {
  const AUTH_URL = `${api_url}/auth/logout`;
  const AUTH_URL_LOGIN = `${api_url}/auth/github`
  const logout = async () => {
    try {
      const response = await fetch(AUTH_URL, { credentials: 'include' });
      if (!response.ok) {
        throw new Error('Failed to log out');
      }
      const json = await response.json();
      console.log(json);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav>
      <ul className="flex items-center gap-4 list-none">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/search">Search</NavLink></li>
        <li><NavLink to="/saved_books">Saved Books</NavLink></li>
        {user && user.id ? (
          <li>
            <button onClick={logout} className="logout-button">
              Logout
            </button>
          </li>
        ) : 
        <li>
          <a href={AUTH_URL_LOGIN} className="">
              🔒 Login via Github
            </a>
          </li>
          }
      </ul>
    </nav>
  );
}
