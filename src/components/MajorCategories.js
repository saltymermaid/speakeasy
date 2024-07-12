// src/components/MajorCategories.js
import React from 'react';
import { Link } from 'react-router-dom';
import wordsData from '../words.json';
import styles from './MajorCategories.module.css';

function MajorCategories() {
  return (
    <div className="container">
      <h2>Major Categories</h2>
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