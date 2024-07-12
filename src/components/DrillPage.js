import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import wordsData from '../words.json';
import styles from './DrillPage.module.css';

function DrillPage() {
  const { majorCategory, category } = useParams();
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [cardCount, setCardCount] = useState(2);
  const [currentWords, setCurrentWords] = useState([]);
  const [results, setResults] = useState({});

  useEffect(() => {
    setSubcategories(Object.keys(wordsData[majorCategory][category]));
  }, [majorCategory, category]);

  const selectSubcategory = (subcat) => {
    setSelectedSubcategory(subcat);
    const words = wordsData[majorCategory][category][subcat];
    setCurrentWords(words.slice(0, cardCount));
  };

  const shuffleWords = () => {
    const allWords = subcategories.flatMap(subcat => wordsData[majorCategory][category][subcat]);
    const shuffled = allWords.sort(() => 0.5 - Math.random());
    setCurrentWords(shuffled.slice(0, cardCount));
  };

  const markWord = (word, correct) => {
    setResults(prev => {
      const subcat = subcategories.find(sub => wordsData[majorCategory][category][sub].includes(word));
      const key = `${majorCategory}-${category}-${subcat}-${word}`;
      const current = prev[key] || { correct: 0, incorrect: 0 };
      return {
        ...prev,
        [key]: {
          ...current,
          [correct ? 'correct' : 'incorrect']: current[correct ? 'correct' : 'incorrect'] + 1
        }
      };
    });
  };

  return (
    <div className="container">
      <h2>{category}</h2>
      <div className={styles.drillContainer}>
        <div className={styles.sidebar}>
          {subcategories.map(subcat => (
            <button 
              key={subcat} 
              onClick={() => selectSubcategory(subcat)}
              className={styles.subcategoryButton}
            >
              {subcat}
            </button>
          ))}
          <div className={styles.controlsContainer}>
            <button onClick={shuffleWords} className={styles.shuffleButton}>Shuffle</button>
            <select 
              value={cardCount} 
              onChange={(e) => setCardCount(Number(e.target.value))}
              className={styles.cardCountSelect}
            >
              {[1, 2, 3].map(num => (
                <option key={num} value={num}>{num} Card{num !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.content}>
          {currentWords.map(word => (
            <div key={word} className={styles.wordCard}>
              <h3 className={styles.wordText}>{word}</h3>
              <button className={styles.correctButton} onClick={() => markWord(word, true)}>✓</button>
              <button className={styles.incorrectButton} onClick={() => markWord(word, false)}>✗</button>
            </div>
          ))}
        </div>
      </div>
      <table className={styles.resultsTable}>
        <thead>
          <tr>
            <th>Word</th>
            <th>Major Category</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Correct</th>
            <th>Incorrect</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(results).map(([key, result]) => {
            const [majorCat, cat, subcat, word] = key.split('-');
            return (
              <tr key={key}>
                <td>{word}</td>
                <td>{majorCat}</td>
                <td>{cat}</td>
                <td>{subcat}</td>
                <td>{result.correct}</td>
                <td>{result.incorrect}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DrillPage;