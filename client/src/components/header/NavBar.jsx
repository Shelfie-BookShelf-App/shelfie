import { useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = ({ user }) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/user/${user.username}`);
  }

  return (
    <nav className={styles.nav}>
      <h2>Shelfie</h2>
      <div>
        <button onClick={handleImageClick}>
          <img
            className={styles.avatar}
            src={user.avatarurl}
            alt={user.name}
          />
        </button>
      </div>
    </nav>
  )
}

export default NavBar;