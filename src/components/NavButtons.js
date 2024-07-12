import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './NavButtons.module.css';

function NavButtons() {
  const navigate = useNavigate();
  const location = useLocation();

  const goHome = () => navigate('/categories');
  const goBack = () => navigate(-1);

  const showHomeButton = location.pathname !== '/categories' && location.pathname !== '/';
  const showBackButton = location.pathname.startsWith('/drill/');

  return (
    <div className={styles.navButtons}>
      {showHomeButton && (
        <button onClick={goHome} className={styles.navButton}>
          <FontAwesomeIcon icon={faHome} />
        </button>
      )}
      {showBackButton && (
        <button onClick={goBack} className={styles.navButton}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      )}
    </div>
  );
}

export default NavButtons;