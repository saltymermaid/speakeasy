import React from 'react';
import { Link, useParams } from 'react-router-dom';
import wordsData from '../words.json';
import styles from './Categories.module.css';

function Categories() {
  const { majorCategory } = useParams();

  return (
    <div className={`${styles.categoriesContainer} container`}>
      <h2 className={styles.categoryTitle}>{majorCategory}</h2>
      {Object.keys(wordsData[majorCategory]).map((category) => (
        <Link key={category} to={`/drill/${encodeURIComponent(majorCategory)}/${encodeURIComponent(category)}`}>
          <button>{category}</button>
        </Link>
      ))}
    </div>
  );
}

export default Categories;