'use client';

import { useQuiz } from './QuizContext';
import { translations } from '@/lib/translations';
import styles from './QuestionCard.module.css';

interface QuestionCardProps {
  onAnswer: (answer: string) => void;
}

export function QuestionCard({ onAnswer }: QuestionCardProps) {
  const { 
    currentQuestion, 
    language, 
    attempts, 
    isAnswering
  } = useQuiz();

  if (!currentQuestion) return null;

  return (
    <div className={styles.questionCard}>
      <div className={styles.attempts}>
        {translations[language].attempts}: {3 - attempts}
      </div>
      
      <h3 className={styles.question}>{currentQuestion.question}</h3>
      
      <div className={styles.options}>
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className={styles.optionButton}
            disabled={isAnswering}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
} 