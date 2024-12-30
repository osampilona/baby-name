import { QuizProvider } from '@/components/quiz/QuizContext';
import { QuizGame } from '@/components/quiz/QuizGame';
import { LanguageSwitch } from '@/components/quiz/LanguageSwitch';
import styles from "./page.module.css";

export default function Home() {
  return (
    <QuizProvider>
      <div className={styles.page}>
        <LanguageSwitch />
        <QuizGame />
      </div>
    </QuizProvider>
  );
}
