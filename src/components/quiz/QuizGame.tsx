'use client';
import { useQuiz } from '@/components/quiz/QuizContext';
import { translations } from '@/lib/translations';
import { quizQuestions } from '@/lib/questions';
import { WelcomeScreen } from '@/components/quiz/WelcomeScreen';
import { RevealedLetters } from '@/components/quiz/RevealedLetters';
import { QuestionCard } from '@/components/quiz/QuestionCard';
import styles from '@/components/quiz/QuizGame.module.css';
import confetti from 'canvas-confetti';
import React, { useCallback, useEffect, useState } from 'react';

export function QuizGame() {
  const {
    isGameStarted,
    isGameCompleted,
    isGameOver,
    currentQuestion,
    language,
    revealedPositions,
    attempts,
    feedback,
    setRevealedPositions,
    setAttempts,
    setFeedback,
    setGameCompleted,
    setCurrentQuestion,
    setGameOver
  } = useQuiz();

  const [isAnswering, setIsAnswering] = useState(false);
  const [usedQuestions, setUsedQuestions] = useState<string[]>([]);
  const [shownQuestions, setShownQuestions] = useState<string[]>([]);

  const handleAnswer = async (selectedAnswer: string) => {
    if (isAnswering) return;
    setIsAnswering(true);
    
    if (currentQuestion?.answer === selectedAnswer) {
      setFeedback({
        show: true,
        isSuccess: true,
        message: translations[language].correctAnswer
      });
      
      const position = wordLetters.findIndex((letter, index) => 
        letter === currentQuestion.letter && !revealedPositions.includes(index)
      );
      
      if (position !== -1) {
        const newRevealedPositions = [...revealedPositions, position];
        setRevealedPositions(newRevealedPositions);
        
        if (newRevealedPositions.length === wordLetters.length) {
          setGameCompleted(true);
          await confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      }
      
      setAttempts(0);
      
      setTimeout(() => {
        setFeedback({ show: false, isSuccess: false, message: '' });
        setIsAnswering(false);
        if (!isGameCompleted) {
          selectNewQuestion();
        }
      }, 1500);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        setAttempts(0);
        setGameOver(true);
        setFeedback({
          show: true,
          isSuccess: false,
          message: translations[language].wrongAnswer
        });
      } else {
        setFeedback({
          show: true,
          isSuccess: false,
          message: translations[language].wrongAnswer
        });
        
        setTimeout(() => {
          setFeedback({ show: false, isSuccess: false, message: '' });
          setIsAnswering(false);
        }, 1500);
      }
    }
  };

  const selectNewQuestion = useCallback(() => {
    const unrevealedLetters = wordLetters.filter((_, index) => !revealedPositions.includes(index));
    
    if (unrevealedLetters.length === 0) return;

    const randomIndex = Math.floor(Math.random() * unrevealedLetters.length);
    const targetLetter = unrevealedLetters[randomIndex];

    const availableQuestions = quizQuestions[language]
      .filter(q => q.letter === targetLetter && !shownQuestions.includes(q.id));

    if (availableQuestions.length > 0) {
      const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
      setCurrentQuestion({
        ...randomQuestion,
        id: randomQuestion.id,
        options: [...randomQuestion.options].sort(() => Math.random() - 0.5)
      });
      setShownQuestions(prev => [...prev, randomQuestion.id]);
    } else {
      const resetShownQuestions = shownQuestions.filter(id => {
        const question = quizQuestions[language].find(q => q.id === id);
        return question?.letter !== targetLetter;
      });
      setShownQuestions(resetShownQuestions);
      
      if (resetShownQuestions.length < shownQuestions.length) {
        setTimeout(() => {
          selectNewQuestion();
        }, 100);
      }
    }
  }, [language, revealedPositions, shownQuestions, setCurrentQuestion]);

  // Inicijalno postavljanje pitanja
  useEffect(() => {
    if (isGameStarted && !currentQuestion && !isGameCompleted && !isGameOver) {
      selectNewQuestion();
    }
  }, [isGameStarted, currentQuestion, isGameCompleted, isGameOver, selectNewQuestion]);

  // Resetiraj korištena pitanja kada se igra ponovno pokrene
  useEffect(() => {
    if (isGameStarted) {
      setUsedQuestions([]);
    }
  }, [isGameStarted]);

  // Resetiraj prikazana pitanja kada igra počne
  useEffect(() => {
    if (isGameStarted) {
      setShownQuestions([]);
    }
  }, [isGameStarted]);

  // Dodaj useEffect za praćenje promjena u revealedPositions
  useEffect(() => {
    if (isGameStarted && !isGameCompleted && !isGameOver) {
      const nextLetter = wordLetters.find((letter, index) => !revealedPositions.includes(index));
      
      if (nextLetter) {
        const availableQuestions = quizQuestions[language]
          .filter(q => q.letter === nextLetter && !usedQuestions.includes(q.id));
          
        if (availableQuestions.length > 0) {
          const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
          setCurrentQuestion({
            ...randomQuestion,
            id: randomQuestion.id,
            options: [...randomQuestion.options].sort(() => Math.random() - 0.5)
          });
          setUsedQuestions(prev => [...prev, randomQuestion.id]);
        }
      }
    }
  }, [revealedPositions, isGameStarted, isGameCompleted, isGameOver, language, usedQuestions]);

  const handleTouch = (selectedAnswer: string) => {
    handleAnswer(selectedAnswer);
  };

  if (!isGameStarted) {
    return <WelcomeScreen />;
  }

  return (
    <div className={styles.quiz}>
      <RevealedLetters />
      <div className={styles.questionContainer}>
        {currentQuestion && !isGameCompleted && (
          <QuestionCard 
            onAnswer={handleAnswer} 
            onTouch={handleTouch}
          />
        )}
        {(feedback.show || isGameOver || isGameCompleted) && (
          <div className={`${styles.feedbackOverlay} ${isGameOver ? styles.error : feedback.isSuccess ? styles.success : styles.error}`}>
            <div className={styles.feedbackMessage}>
              {isGameCompleted ? (
                <>
                  <div className={styles.feedbackEmoji}>🎉</div>
                  {translations[language].congratulations}
                  <div className={styles.revealedWord}>RAPHAEL</div>
                  <button 
                    onClick={() => window.location.reload()} 
                    className={styles.restartButton}
                  >
                    {translations[language].playAgain}
                  </button>
                </>
              ) : (
                <>
                  {isGameOver ? (
                    <>
                      {translations[language].gameOver} {translations[language].gameOverTitle}
                      <button 
                        onClick={() => window.location.reload()} 
                        className={styles.restartButton}
                      >
                        {translations[language].playAgain}
                      </button>
                    </>
                  ) : feedback.message}
                  <div className={styles.feedbackEmoji}>
                    {isGameOver ? '😔' : feedback.isSuccess ? '🎉' : '😢'}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const wordLetters = ['R', 'A', 'P', 'H', 'A', 'E', 'L'] as const; 