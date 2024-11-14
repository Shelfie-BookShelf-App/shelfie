import { useState, useEffect } from 'react';

import CircularProgressBar from '../components/data_visualization/CircularProgressBar';
import styles from './UserProfile.module.css';

const UserProfile = ({ user }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 10 : 10));
    }, 1000);

    return () => clearInterval(interval);
  })

  return (
    <div className={styles.user_profile}>
      <div className={styles.user_data}>
        <CircularProgressBar progress={progress} />
      </div>
    </div>
  )
}

export default UserProfile;