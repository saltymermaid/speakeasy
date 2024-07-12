// src/components/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

function LandingPage() {
  return (
    <div className={`${styles.landing} container`}>
      <h1 className={styles.title}>SpeakEasy</h1>
      <Link to="/categories">
        <img src="/door.jpeg" alt="SpeakEasy" className={styles.image} />
      </Link>
    </div>
  );
}

export default LandingPage;