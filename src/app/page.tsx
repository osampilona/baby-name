'use client'
import { useState } from "react";
import confetti from 'canvas-confetti';
import styles from "./page.module.css";
import Lottie from 'lottie-react';
import sadAnimation from './animations/sad-animation.json';

interface QuizQuestion {
  letter: string;
  question: string;
  answer: string;
  options: string[];
}

const quizQuestions: QuizQuestion[] = [
  {
    letter: "R",
    question: "Koja rijeka prolazi kroz Zagreb?",
    answer: "Sava",
    options: ["Drava", "Sava", "Dunav", "Kupa"]
  },
  {
    letter: "R",
    question: "U kojem hrvatskom gradu se nalazi Riječka luka?",
    answer: "Rijeka",
    options: ["Split", "Zadar", "Rijeka", "Pula"]
  },
  {
    letter: "R",
    question: "Koji je najpoznatiji dvorac u Hrvatskom zagorju?",
    answer: "Trakošćan",
    options: ["Miljana", "Oršić", "Veliki Tabor", "Trakošćan"]
  },
  {
    letter: "A",
    question: "Gdje se nalazi najpoznatiji antički amfiteatar u Hrvatskoj?",
    answer: "Pula",
    options: ["Salona", "Pula", "Narona", "Issa"]
  },
  {
    letter: "A",
    question: "Koji je glavni grad Istre?",
    answer: "Pazin",
    options: ["Pula", "Rovinj", "Pazin", "Poreč"]
  },
  {
    letter: "A",
    question: "Koja je najveća hrvatska sportska arena?",
    answer: "Arena Zagreb",
    options: ["Višnjik", "Dom Sportova", "Spaladium Arena", "Arena Zagreb"]
  },
  {
    letter: "P",
    question: "Koji je tradicionalni slavonski suhomesnati proizvod?",
    answer: "Kulen",
    options: ["Pršut", "Kulen", "Špek", "Kobasica"]
  },
  {
    letter: "P",
    question: "Koji je najveći hrvatski poluotok?",
    answer: "Istra",
    options: ["Pelješac", "Prevlaka", "Istra", "Pag"]
  },
  {
    letter: "P",
    question: "Koja je najpoznatija plaža u Makarskoj?",
    answer: "Punta Rata",
    options: ["Podrače", "Zlatni Rat", "Porporela", "Punta Rata"]
  },
  {
    letter: "H",
    question: "Koji hrvatski vladar je okrunjen 925. godine kao prvi kralj?",
    answer: "Tomislav",
    options: ["Tomislav", "Krešimir", "Zvonimir", "Domagoj"]
  },
  {
    letter: "H",
    question: "Koji je najviši vrh Hrvatske?",
    answer: "Dinara",
    options: ["Dinara", "Velebit", "Biokovo", "Učka"]
  },
  {
    letter: "H",
    question: "Koja je najduža hrvatska rijeka?",
    answer: "Sava",
    options: ["Sava", "Drava", "Dunav", "Kupa"]
  },
  {
    letter: "A",
    question: "Koja je najpoznatija hrvatska autohtona sorta masline?",
    answer: "Oblica",
    options: ["Oblica", "Buža", "Lastovka", "Levantinka"]
  },
  {
    letter: "A",
    question: "Koji je najveći jadranski otok?",
    answer: "Krk",
    options: ["Krk", "Cres", "Brač", "Hvar"]
  },
  {
    letter: "A",
    question: "U kojem se gradu nalazi Arheološki muzej Istre?",
    answer: "Pula",
    options: ["Pula", "Poreč", "Pazin", "Rovinj"]
  },
  {
    letter: "E",
    question: "U kojem hrvatskom gradu se nalazi crkva sv. Eufemije?",
    answer: "Rovinj",
    options: ["Rovinj", "Poreč", "Zadar", "Šibenik"]
  },
  {
    letter: "E",
    question: "Koji je najstariji nacionalni park u Hrvatskoj?",
    answer: "Plitvice",
    options: ["Plitvice", "Krka", "Paklenica", "Mljet"]
  },
  {
    letter: "E",
    question: "Koja je najpoznatija hrvatska endemska životinja?",
    answer: "Čovječja ribica",
    options: ["Čovječja ribica", "Velebitska degenija", "Eleonora", "Sredozemna medvjedica"]
  },
  {
    letter: "L",
    question: "Koji hrvatski otok je poznat po čipkarstvu?",
    answer: "Pag",
    options: ["Pag", "Hvar", "Brač", "Korčula"]
  },
  {
    letter: "L",
    question: "Koja je najpoznatija hrvatska luka?",
    answer: "Rijeka",
    options: ["Rijeka", "Split", "Zadar", "Ploče"]
  },
  {
    letter: "L",
    question: "Koji je najveći hrvatski svjetionik?",
    answer: "Palagruža",
    options: ["Palagruža", "Veli Rat", "Savudrija", "Porer"]
  }
];

export default function Home() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const wordLetters = ['R', 'A', 'P', 'H', 'A', 'E', 'L'];
  const [revealedPositions, setRevealedPositions] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState<{
    show: boolean;
    isSuccess: boolean;
    message: string;
  }>({ show: false, isSuccess: false, message: '' });
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswering, setIsAnswering] = useState(false);

  const shuffleQuestions = () => {
    const availablePositions = wordLetters
      .map((_, index) => index)
      .filter(index => !revealedPositions.includes(index));
    
    if (availablePositions.length === 0) return;
    
    const randomPosition = availablePositions[Math.floor(Math.random() * availablePositions.length)];
    const targetLetter = wordLetters[randomPosition];
    
    const availableQuestions = quizQuestions
      .filter(q => q.letter === targetLetter);
    
    const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    
    if (randomQuestion) {
      const shuffledOptions = [...randomQuestion.options].sort(() => Math.random() - 0.5);
      setCurrentQuestion({
        ...randomQuestion,
        options: shuffledOptions
      });
    }
  };

  const handleAnswer = (selectedAnswer: string) => {
    if (!currentQuestion || isAnswering) return;
    
    setIsAnswering(true);
    setSelectedOption(selectedAnswer);

    if (selectedAnswer === currentQuestion.answer) {
      const position = wordLetters.findIndex((letter, index) => 
        letter === currentQuestion.letter && !revealedPositions.includes(index)
      );

      if (position !== -1) {
        const newRevealedPositions = [...revealedPositions, position];
        setRevealedPositions(newRevealedPositions);

        setFeedback({
          show: true,
          isSuccess: true,
          message: 'Bravo! Točan odgovor! 🎉'
        });
        
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        setTimeout(() => {
          setFeedback({ show: false, isSuccess: false, message: '' });
          setSelectedOption(null);
          setIsAnswering(false);
          
          if (newRevealedPositions.length === wordLetters.length) {
            setIsGameCompleted(true);
          } else {
            setAttempts(0);
            // Direktno pozivamo shuffleQuestions s novim revealed positions
            const nextAvailablePositions = wordLetters
              .map((_, index) => index)
              .filter(index => !newRevealedPositions.includes(index));
            
            if (nextAvailablePositions.length > 0) {
              const randomPosition = nextAvailablePositions[Math.floor(Math.random() * nextAvailablePositions.length)];
              const targetLetter = wordLetters[randomPosition];
              
              const availableQuestions = quizQuestions
                .filter(q => q.letter === targetLetter);
              
              const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
              
              if (randomQuestion) {
                const shuffledOptions = [...randomQuestion.options].sort(() => Math.random() - 0.5);
                setCurrentQuestion({
                  ...randomQuestion,
                  options: shuffledOptions
                });
              }
            }
          }
        }, 2000);
      }
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      setFeedback({
        show: true,
        isSuccess: false,
        message: newAttempts >= 3 ? 
          'Nažalost, iskoristili ste sve pokušaje! 😔' : 
          'Netočno! Pokušajte ponovno! 😮'
      });

      setTimeout(() => {
        setFeedback({ show: false, isSuccess: false, message: '' });
        setSelectedOption(null);
        setIsAnswering(false);
        
        if (newAttempts >= 3) {
          setIsGameOver(true);
        }
      }, 2000);
    }
  };

  const handleGameStart = () => {
    setIsGameStarted(true);
    setIsGameCompleted(false);
    setIsGameOver(false);
    setRevealedPositions([]);
    setAttempts(0);
    setSelectedOption(null);
    setFeedback({ show: false, isSuccess: false, message: '' });
    shuffleQuestions();
  };

  const handleRestart = () => {
    setIsGameStarted(false);
    setIsGameCompleted(false);
    setIsGameOver(false);
    setRevealedPositions([]);
    setAttempts(0);
    setCurrentQuestion(null);
    setFeedback({ show: false, isSuccess: false, message: '' });
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.mainTitle}>Otkrijte ime bebe! 👶</h1>
      </header>
      <main className={styles.main}>
        {isGameCompleted ? (
          <div className={styles.congratulations}>
            <h1>Čestitamo! 🎉</h1>
            <p>Uspješno ste otkrili ime naše bebe!</p>
            <p className={styles.revealedWord}>
              {wordLetters.join('')}
            </p>
            <p className={styles.congratsMessage}>
              Hvala vam što ste sudjelovali u ovoj zabavnoj igri otkrivanja imena! 
              Nadamo se da ste naučili nešto novo o Hrvatskoj i uživali u kvizu. 💝
            </p>
            <button 
              onClick={handleRestart} 
              className={styles.startButton}
            >
              Igraj ponovo
            </button>
          </div>
        ) : isGameOver ? (
          <div className={styles.gameOver}>
            <h1>Game Over! 😔</h1>
            <p>Iskoristili ste sve pokušaje.</p>
            <p>Ne odustajte, pokušajte ponovno!</p>
            <button 
              onClick={handleRestart} 
              className={styles.startButton}
            >
              Igraj ponovno
            </button>
          </div>
        ) : !isGameStarted ? (
          <div className={styles.welcomeContainer}>
            <div className={styles.introText}>
              <p>Dobrodošli u zabavni kviz otkrivanja imena naše bebe!</p>
            </div>
            
            <div className={styles.rulesContainer}>
              <h2>Pravila igre:</h2>
              <ul className={styles.rulesList}>
                <li>Za svako slovo u imenu dobivate jedno pitanje</li>
                <li>Za svako pitanje imate 3 pokušaja</li>
                <li>Ako iskoristite sve pokušaje, vraćate se na početak s novim pitanjima</li>
              </ul>
            </div>

            <button onClick={handleGameStart} className={styles.startButton}>
              Započni igru
            </button>
          </div>
        ) : (
          <div className={styles.quiz}>
            
            <div className={styles.revealedLetters}>
              {wordLetters.map((letter, index) => (
                <span key={index} className={`${styles.letter} ${revealedPositions.includes(index) ? styles.revealed : ''}`}>
                  {revealedPositions.includes(index) ? letter : '_'}
                </span>
              ))}
            </div>
            
            <div className={styles.questionCard}>
              <div className={styles.attempts}>
                Preostali pokušaji: {3 - attempts}
              </div>
              <h3>Pitanje {revealedPositions.length + 1}</h3>
              {currentQuestion && (
                <>
                  <p>{currentQuestion.question}</p>
                  <div className={styles.options}>
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        className={`${styles.optionButton} ${
                          selectedOption === option ? styles.selected : ''
                        }`}
                        disabled={isAnswering}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>
      {feedback.show && (
        <div className={`${styles.feedback} ${feedback.isSuccess ? styles.success : styles.error}`}>
          {feedback.isSuccess ? (
            <div className={styles.successMessage}>
              {feedback.message}
            </div>
          ) : (
            <div className={styles.feedbackContent}>
              <div className={styles.lottieContainer}>
                <Lottie 
                  animationData={sadAnimation} 
                  loop={false}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
              <div className={styles.message}>{feedback.message}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
