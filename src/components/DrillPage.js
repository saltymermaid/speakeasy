import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import wordsData from '../words.json';
import styles from './DrillPage.module.css';

function DrillPage() {
  const { majorCategory: encodedMajorCategory, category: encodedCategory } = useParams();
  const majorCategory = decodeURIComponent(encodedMajorCategory);
  const category = decodeURIComponent(encodedCategory);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [cardCount, setCardCount] = useState(2);
  const [currentWords, setCurrentWords] = useState([]);
  const [results, setResults] = useState({});
  const [markedWords, setMarkedWords] = useState({});

  useEffect(() => {
    setSubcategories(Object.keys(wordsData[majorCategory][category]));
    if (selectedSubcategory) {
      const words = wordsData[majorCategory][category][selectedSubcategory];
      const shuffled = [...words].sort(() => 0.5 - Math.random());
      setCurrentWords(shuffled.slice(0, cardCount));
    }
  }, [majorCategory, category, cardCount, selectedSubcategory]);

  const selectSubcategory = (subcat) => {
    setSelectedSubcategory(subcat);
    const words = wordsData[majorCategory][category][subcat];
    const shuffled = [...words].sort(() => 0.5 - Math.random());
    setCurrentWords(shuffled.slice(0, cardCount));
    setMarkedWords({}); // Reset marked words
  };
  
  const shuffleWords = () => {
    const allWords = subcategories.flatMap(subcat => wordsData[majorCategory][category][subcat]);
    const shuffled = [...allWords].sort(() => 0.5 - Math.random());
    setCurrentWords(shuffled.slice(0, cardCount));
    setMarkedWords({}); // Reset marked words
  };

  const markWord = (word, correct) => {
    setMarkedWords(prev => ({ ...prev, [word]: true }));
    setResults(prev => {
      const subcat = subcategories.find(sub => wordsData[majorCategory][category][sub].includes(word));
      const key = `${majorCategory}*${category}*${subcat}*${word}`;
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
      <h1 className={styles.pageTitle}>{majorCategory} | {category}</h1>
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
          {currentWords.length > 0 ? (
            <div className={styles.cardContainer}>
              {currentWords.map(word => (
                <div key={word} className={styles.wordCard}>
                  <h3 className={styles.wordText}>{word}</h3>
                  <div className={styles.buttonContainer}>
                    <button 
                      className={styles.correctButton} 
                      onClick={() => markWord(word, true)}
                      disabled={markedWords[word]}
                    >
                      ✓
                    </button>
                    <button 
                      className={styles.incorrectButton} 
                      onClick={() => markWord(word, false)}
                      disabled={markedWords[word]}
                    >
                      ✗
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>Click on a subcategory on the left to start your drill!</p>
            </div>
          )}
        </div>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.resultsTable}>
          <thead>
            <tr>
              <th>Word</th>
              <th>Major Category</th>
              <th>Subcategory</th>
              <th>Correct</th>
              <th>Incorrect</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(results).map(([key, result]) => {
              const [majorCat, _cat, subcat, word] = key.split('*');
              return (
                <tr key={key}>
                  <td>{word}</td>
                  <td>{majorCat}</td>
                  <td>{subcat}</td>
                  <td>{result.correct}</td>
                  <td>{result.incorrect}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DrillPage;