'use client';

import { createContext, useContext, useState } from 'react';
import type { QuizQuestion } from '@/lib/questions';

interface QuizContextType {
  isGameStarted: boolean;
  isGameCompleted: boolean;
  isGameOver: boolean;
  revealedPositions: number[];
  attempts: number;
  currentQuestion: QuizQuestion | null;
  language: 'hr' | 'en';
  feedback: { show: boolean; isSuccess: boolean; message: string };
  isAnswering: boolean;
  setGameStarted: (value: boolean) => void;
  setGameCompleted: (value: boolean) => void;
  setGameOver: (value: boolean) => void;
  setRevealedPositions: (positions: number[]) => void;
  setAttempts: (value: number) => void;
  setCurrentQuestion: (question: QuizQuestion | null) => void;
  setLanguage: (lang: 'hr' | 'en') => void;
  setFeedback: (feedback: { show: boolean; isSuccess: boolean; message: string }) => void;
  setIsAnswering: (value: boolean) => void;
  resetGame: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [isGameStarted, setGameStarted] = useState(false);
  const [isGameCompleted, setGameCompleted] = useState(false);
  const [isGameOver, setGameOver] = useState(false);
  const [revealedPositions, setRevealedPositions] = useState<number[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [language, setLanguage] = useState<'hr' | 'en'>('hr');
  const [feedback, setFeedback] = useState({ show: false, isSuccess: false, message: '' });
  const [isAnswering, setIsAnswering] = useState(false);

  const resetGame = () => {
    setGameStarted(false);
    setGameCompleted(false);
    setGameOver(false);
    setRevealedPositions([]);
    setAttempts(0);
    setCurrentQuestion(null);
    setFeedback({ show: false, isSuccess: false, message: '' });
  };

  return (
    <QuizContext.Provider value={{
      isGameStarted,
      isGameCompleted,
      isGameOver,
      revealedPositions,
      attempts,
      currentQuestion,
      language,
      feedback,
      isAnswering,
      setGameStarted,
      setGameCompleted,
      setGameOver,
      setRevealedPositions,
      setAttempts,
      setCurrentQuestion,
      setLanguage,
      setFeedback,
      setIsAnswering,
      resetGame
    }}>
      {children}
    </QuizContext.Provider>
  );
}

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) throw new Error('useQuiz must be used within QuizProvider');
  return context;
}; 