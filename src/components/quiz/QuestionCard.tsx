'use client';

import React, { useState } from 'react';
import { useQuiz } from './QuizContext';
import { translations } from '@/lib/translations';
import styles from './QuestionCard.module.css';

interface QuestionCardProps {
  onAnswer: (answer: string) => void;
  onTouch: (answer: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ onAnswer, onTouch }) => {
  const { 
    currentQuestion, 
    language, 
    attempts, 
    isAnswering
  } = useQuiz();

  const [activeButton, setActiveButton] = useState<string | null>(null);

  if (!currentQuestion) return null;

  const handleButtonClick = (answer: string) => {
    onAnswer(answer);
    setActiveButton(answer);
  };

  const handleTouch = (e: React.TouchEvent<HTMLButtonElement>, answer: string) => {
    e.preventDefault();
    onTouch(answer);
    setActiveButton(answer);
  };

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
            onClick={() => handleButtonClick(option)}
            onTouchStart={(e) => handleTouch(e, option)}
            className={`${styles.optionButton} ${activeButton === option ? styles.active : ''}`}
            disabled={isAnswering}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}; 