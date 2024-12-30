'use client';

import { useQuiz } from '@/components/quiz/QuizContext';
import styles from '@/components/quiz/LanguageSwitch.module.css';

export function LanguageSwitch() {
  const { language, setLanguage } = useQuiz();

  return (
    <div className={styles.languageSwitch}>
      <button
        className={`${styles.langButton} ${language === 'hr' ? styles.active : ''}`}
        onClick={() => setLanguage('hr')}
      >
        🇭🇷 HR
      </button>
      <button
        className={`${styles.langButton} ${language === 'en' ? styles.active : ''}`}
        onClick={() => setLanguage('en')}
      >
        🇬🇧 EN
      </button>
    </div>
  );
} 