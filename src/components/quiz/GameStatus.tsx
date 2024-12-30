'use client';

import { useQuiz } from '@/components/quiz/QuizContext';
import { translations } from '@/lib/translations';
import styles from '@/components/quiz/QuizGame.module.css';

export function GameStatus() {
  const { 
    isGameCompleted, 
    isGameOver, 
    language, 
    resetGame 
  } = useQuiz();

  if (!isGameCompleted && !isGameOver) return null;

  return (
    <div className={styles.gameStatus}>
      {isGameCompleted ? (
        <>
          <h1>{translations[language].congratulations}</h1>
          <p>{translations[language].revealed}</p>
          <p className={styles.revealedWord}>RAPHAEL</p>
          <p className={styles.congratsMessage}>{translations[language].thanks}</p>
        </>
      ) : (
        <>
          <h1>{translations[language].gameOverTitle}</h1>
          <p>{translations[language].gameOverText}</p>
          <p>{translations[language].tryAgain}</p>
        </>
      )}
      
      <button 
        onClick={resetGame} 
        className={styles.playAgainButton}
      >
        {translations[language].playAgain}
      </button>
    </div>
  );
} 