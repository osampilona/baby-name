'use client';

import { useQuiz } from '@/components/quiz/QuizContext';
import { translations } from '@/lib/translations';
import styles from '@/components/quiz/WelcomeScreen.module.css';

export function WelcomeScreen() {
  const { language, setGameStarted } = useQuiz();
  const t = translations[language];

  return (
    <div className={styles.welcomeScreen}>
      <div className={styles.babyIcon}>👶</div>
      <div className={styles.introText}>
        <p>{t.welcome}</p>
      </div>
      
      <div className={styles.rulesContainer}>
        <h2>{t.rulesTitle}</h2>
        <ul className={styles.rulesList}>
          {t.rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </div>

      <button 
        onClick={() => setGameStarted(true)} 
        className={styles.startButton}
      >
        {t.startButton}
      </button>
    </div>
  );
} 