// src/components/MajorCategories.js
import React from 'react';
import { Link } from 'react-router-dom';
import wordsData from '../words.json';
import styles from './MajorCategories.module.css';

function MajorCategories() {
  return (
    <div className={`${styles.majorCategoriesContainer} container`}>
      <h2 className={styles.majorCategoriesTitle}>Major Categories</h2>
      <div className={styles.categoriesList}>
        {Object.keys(wordsData).map((category) => (
          <Link key={category} to={`/categories/${category}`}>
            <button className={styles.categoryButton}>{category}</button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MajorCategories;