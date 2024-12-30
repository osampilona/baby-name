import { useQuiz } from './QuizContext';
import styles from './RevealedLetters.module.css';

export function RevealedLetters() {
  const { revealedPositions } = useQuiz();
  const wordLetters = ['R', 'A', 'P', 'H', 'A', 'E', 'L'];

  return (
    <div className={styles.revealedLetters}>
      {wordLetters.map((letter, index) => (
        <div 
          key={index} 
          className={`${styles.letter} ${revealedPositions.includes(index) ? styles.revealed : ''}`}
        >
          {revealedPositions.includes(index) ? letter : '?'}
        </div>
      ))}
    </div>
  );
} 