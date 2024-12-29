'use client'
import { useState, useEffect } from "react";
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

const quizQuestions = {
  hr: [
    // R
    {
      letter: "R",
      question: "Koja rijeka prolazi kroz Zagreb?",
      answer: "Sava",
      options: ["Drava", "Sava", "Dunav", "Kupa"]
    },
    {
      letter: "R",
      question: "U kojem hrvatskom gradu se nalazi najveća industrijska luka?",
      answer: "Rijeka",
      options: ["Split", "Zadar", "Rijeka", "Pula"]
    },
    {
      letter: "R",
      question: "Koji je najpoznatiji dvorac u Hrvatskom zagorju?",
      answer: "Trakošćan",
      options: ["Miljana", "Oršić", "Veliki Tabor", "Trakošćan"]
    },
    // A (prvo)
    {
      letter: "A",
      question: "Gdje se nalazi najpoznatiji antički amfiteatar u Hrvatskoj?",
      answer: "Pula",
      options: ["Salona", "Pula", "Narona", "Issa"]
    },
    {
      letter: "A",
      question: "Koji je grad administrativnog središta Istre?",
      answer: "Pazin",
      options: ["Pula", "Pazin", "Poreč", "Rovinj"]
    },
    {
      letter: "A",
      question: "Koja je najveća hrvatska arena?",
      answer: "Arena Zagreb",
      options: ["Spaladium Arena", "Arena Zagreb", "Višnjik", "Gradski Vrt"]
    },
    // P
    {
      letter: "P",
      question: "Koji je tradicionalni slavonski suhomesnati proizvod?",
      answer: "Kulen",
      options: ["Kulen", "Pršut", "Špek", "Kobasica"]
    },
    {
      letter: "P",
      question: "Koji je najveći hrvatski poluotok?",
      answer: "Istra",
      options: ["Pelješac", "Istra", "Prevlaka", "Pag"]
    },
    {
      letter: "P",
      question: "Koja je najpoznatija plaža u Makarskoj?",
      answer: "Punta Rata",
      options: ["Punta Rata", "Zlatni Rat", "Podrače", "Porporela"]
    },
    // H
    {
      letter: "H",
      question: "Koji hrvatski vladar je okrunjen 925. godine kao prvi kralj?",
      answer: "Tomislav",
      options: ["Tomislav", "Zvonimir", "Krešimir", "Držislav"]
    },
    {
      letter: "H",
      question: "Koji je najviši vrh Hrvatske?",
      answer: "Dinara",
      options: ["Velebit", "Dinara", "Biokovo", "Učka"]
    },
    {
      letter: "H",
      question: "Koja je najduža hrvatska rijeka?",
      answer: "Sava",
      options: ["Sava", "Drava", "Dunav", "Kupa"]
    },
    // A (drugo)
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
    // E
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
    // L
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
  ],
  en: [
    // R
    {
      letter: "R",
      question: "Which river flows through Zagreb?",
      answer: "Sava",
      options: ["Drava", "Sava", "Danube", "Kupa"]
    },
    {
      letter: "R",
      question: "In which Croatian city is located main industrial port?",
      answer: "Rijeka",
      options: ["Split", "Zadar", "Rijeka", "Pula"]
    },
    {
      letter: "R",
      question: "Which is the most famous castle in Croatian Zagorje?",
      answer: "Trakošćan",
      options: ["Miljana", "Oršić", "Veliki Tabor", "Trakošćan"]
    },
    // A (first)
    {
      letter: "A",
      question: "Where is the most famous ancient amphitheater in Croatia located?",
      answer: "Pula",
      options: ["Salona", "Pula", "Narona", "Issa"]
    },
    {
      letter: "A",
      question: "What is the administrative center of Istria?",
      answer: "Pazin",
      options: ["Pula", "Pazin", "Poreč", "Rovinj"]
    },
    {
      letter: "A",
      question: "Which is the largest arena in Croatia?",
      answer: "Arena Zagreb",
      options: ["Spaladium Arena", "Arena Zagreb", "Višnjik", "Gradski Vrt"]
    },
    // P
    {
      letter: "P",
      question: "What is the traditional Slavonian cured meat product?",
      answer: "Kulen",
      options: ["Kulen", "Pršut", "Špek", "Kobasica"]
    },
    {
      letter: "P",
      question: "Which is the largest Croatian peninsula?",
      answer: "Istra",
      options: ["Pelješac", "Istra", "Prevlaka", "Pag"]
    },
    {
      letter: "P",
      question: "What is the most famous beach in Makarska?",
      answer: "Punta Rata",
      options: ["Punta Rata", "Zlatni Rat", "Podrače", "Porporela"]
    },
    // H
    {
      letter: "H",
      question: "Which Croatian ruler was crowned as the first king in 925?",
      answer: "Tomislav",
      options: ["Tomislav", "Zvonimir", "Krešimir", "Držislav"]
    },
    {
      letter: "H",
      question: "What is the highest peak in Croatia?",
      answer: "Dinara",
      options: ["Velebit", "Dinara", "Biokovo", "Učka"]
    },
    {
      letter: "H",
      question: "Which is the longest river in Croatia?",
      answer: "Sava",
      options: ["Sava", "Drava", "Danube", "Kupa"]
    },
    // A (second)
    {
      letter: "A",
      question: "What is the most famous Croatian indigenous olive variety?",
      answer: "Oblica",
      options: ["Oblica", "Buža", "Lastovka", "Levantinka"]
    },
    {
      letter: "A",
      question: "Which is the largest Adriatic island?",
      answer: "Krk",
      options: ["Krk", "Cres", "Brač", "Hvar"]
    },
    {
      letter: "A",
      question: "In which city is the Archaeological Museum of Istria located?",
      answer: "Pula",
      options: ["Pula", "Poreč", "Pazin", "Rovinj"]
    },
    // E
    {
      letter: "E",
      question: "In which Croatian city is the Church of St. Euphemia located?",
      answer: "Rovinj",
      options: ["Rovinj", "Poreč", "Zadar", "Šibenik"]
    },
    {
      letter: "E",
      question: "Which is the oldest national park in Croatia?",
      answer: "Plitvice",
      options: ["Plitvice", "Krka", "Paklenica", "Mljet"]
    },
    {
      letter: "E",
      question: "What is the most famous Croatian endemic animal?",
      answer: "Čovječja ribica",
      options: ["Čovječja ribica", "Velebitska degenija", "Eleonora", "Mediterranean Monk Seal"]
    },
    // L
    {
      letter: "L",
      question: "Which Croatian island is famous for its lace making?",
      answer: "Pag",
      options: ["Pag", "Hvar", "Brač", "Korčula"]
    },
    {
      letter: "L",
      question: "Which is the most famous Croatian port?",
      answer: "Rijeka",
      options: ["Rijeka", "Split", "Zadar", "Ploče"]
    },
    {
      letter: "L",
      question: "Which is the largest Croatian lighthouse?",
      answer: "Palagruža",
      options: ["Palagruža", "Veli Rat", "Savudrija", "Porer"]
    }
  ]
};

const translations = {
  hr: {
    title: "Otkrijte ime bebe! 👶",
    startButton: "Započni igru",
    attempts: "Preostali pokušaji",
    correctAnswer: "Bravo! Točan odgovor! 🎉",
    wrongAnswer: "Netočno! Pokušajte ponovno! 😮",
    gameOver: "Nažalost, iskoristili ste sve pokušaje! 😔",
    congratulations: "Čestitamo! 🎉",
    revealed: "Uspješno ste otkrili ime naše bebe!",
    thanks: "Hvala vam što ste sudjelovali u ovoj zabavnoj igri otkrivanja imena! 💝",
    playAgain: "Igraj ponovo",
    welcome: "Dobrodošli u zabavni kviz otkrivanja imena naše bebe!",
    rulesTitle: "Pravila igre:",
    rules: [
      "Za svako slovo u imenu dobivate jedno pitanje",
      "Za svako pitanje imate 3 pokušaja",
      "Ako iskoristite sve pokušaje, vraćate se na početak s novim pitanjima"
    ],
    gameOverTitle: "Igra je završena! 😔",
    gameOverText: "Iskoristili ste sve pokušaje.",
    tryAgain: "Ne odustajte, pokušajte ponovno!"
  },
  en: {
    title: "Discover the baby's name! 👶",
    startButton: "Start game",
    attempts: "Remaining attempts",
    wrongAnswer: "Wrong! Try again! 😮",
    correctAnswer: "Hurray! Correct answer! 🎉",
    gameOver: "Sorry, you've used all your attempts! 😔",
    congratulations: "Congratulations! 🎉",
    revealed: "You've successfully revealed our baby's name!",
    thanks: "Thank you for participating in this fun name reveal game! 💝",
    playAgain: "Play again",
    welcome: "Welcome to our fun baby name reveal quiz!",
    rulesTitle: "Game rules:",
    rules: [
      "You get one question for each letter in the name",
      "You have 3 attempts for each question",
      "If you use all attempts, you'll start over with new questions"
    ],
    gameOverTitle: "Game Over! 😔",
    gameOverText: "You've used all your attempts.",
    tryAgain: "Don't give up, try again!"
  }
};

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
  const [language, setLanguage] = useState<'hr' | 'en'>('hr');
  const t = translations[language];

  const shuffleQuestions = () => {
    const availablePositions = wordLetters
      .map((_, index) => index)
      .filter(index => !revealedPositions.includes(index));
    
    if (availablePositions.length === 0) return;
    
    const randomPosition = availablePositions[Math.floor(Math.random() * availablePositions.length)];
    const targetLetter = wordLetters[randomPosition];
    
    const availableQuestions = quizQuestions[language]
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

  useEffect(() => {
    if (currentQuestion) {
      const newQuestion = quizQuestions[language].find(q => 
        q.letter === currentQuestion.letter && 
        q.answer === currentQuestion.answer
      );
      if (newQuestion) {
        setCurrentQuestion({
          ...newQuestion,
          options: [...newQuestion.options].sort(() => Math.random() - 0.5)
        });
      }
    }
  }, [language]);

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
          message: translations[language].correctAnswer
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
            shuffleQuestions();
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
          translations[language].gameOver : 
          translations[language].wrongAnswer
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
      <div className={styles.languageSwitch}>
        <button 
          onClick={() => setLanguage('hr')}
          className={`${styles.langButton} ${language === 'hr' ? styles.active : ''}`}
        >
          🇭🇷 HR
        </button>
        <button 
          onClick={() => setLanguage('en')}
          className={`${styles.langButton} ${language === 'en' ? styles.active : ''}`}
        >
          🇬🇧 EN
        </button>
      </div>

      <header className={styles.header}>
        <h1 className={styles.mainTitle}>{t.title}</h1>
      </header>

      <main className={styles.main}>
        {isGameCompleted ? (
          <div className={styles.congratulations}>
            <h1>{t.congratulations}</h1>
            <p>{t.revealed}</p>
            <p className={styles.revealedWord}>
              {wordLetters.join('')}
            </p>
            <p className={styles.congratsMessage}>{t.thanks}</p>
            <button onClick={handleRestart} className={styles.startButton}>
              {t.playAgain}
            </button>
          </div>
        ) : isGameOver ? (
          <div className={styles.gameOver}>
            <h1>{t.gameOverTitle}</h1>
            <p>{t.gameOverText}</p>
            <p>{t.tryAgain}</p>
            <button onClick={handleRestart} className={styles.startButton}>
              {t.playAgain}
            </button>
          </div>
        ) : !isGameStarted ? (
          <div className={styles.welcomeContainer}>
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

            <button onClick={handleGameStart} className={styles.startButton}>
              {t.startButton}
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
                {t.attempts}: {3 - attempts}
              </div>
              <h3>Pitanje {revealedPositions.length + 1}</h3>
              {currentQuestion && (
                <>
                  <p>{currentQuestion.question}</p>
                  <div className={styles.options}>
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.preventDefault();
                          handleAnswer(option);
                        }}
                        onTouchStart={(e) => {
                          e.preventDefault();
                          handleAnswer(option);
                        }}
                        onTouchMove={(e) => e.preventDefault()}
                        onTouchEnd={(e) => e.preventDefault()}
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
