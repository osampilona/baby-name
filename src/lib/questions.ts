export interface QuizQuestion {
  id: string;
  letter: string;
  question: string;
  answer: string;
  options: string[];
}

export const quizQuestions: Record<string, QuizQuestion[]> = {
  hr: [
    {
      id: 'hr-r-1',
      letter: 'R',
      question: 'Koji grad je glavni grad Hrvatske?',
      answer: 'Zagreb',
      options: ['Zagreb', 'Split', 'Rijeka', 'Osijek']
    },
    {
      id: 'hr-r-2',
      letter: 'R',
      question: 'Koja životinja je poznata po dugom vratu?',
      answer: 'Žirafa',
      options: ['Slon', 'Žirafa', 'Zebra', 'Lav']
    },
    {
      id: 'hr-a-1',
      letter: 'A',
      question: 'Koje voće počinje sa slovom A?',
      answer: 'Ananas',
      options: ['Banana', 'Ananas', 'Naranča', 'Jagoda']
    },
    {
      id: 'hr-p-1',
      letter: 'P',
      question: 'Koji je glavni grad Francuske?',
      answer: 'Pariz',
      options: ['London', 'Madrid', 'Pariz', 'Berlin']
    },
    {
      id: 'hr-h-1',
      letter: 'H',
      question: 'Koji je glavni grad Mađarske?',
      answer: 'Budimpešta',
      options: ['Prag', 'Budimpešta', 'Varšava', 'Bukurešt']
    },
    {
      id: 'hr-a-2',
      letter: 'A',
      question: 'Koja životinja živi na Antarktici?',
      answer: 'Pingvin',
      options: ['Polarni medvjed', 'Pingvin', 'Tuljan', 'Kit']
    },
    {
      id: 'hr-e-1',
      letter: 'E',
      question: 'Koji kontinent počinje sa slovom E?',
      answer: 'Europa',
      options: ['Afrika', 'Amerika', 'Europa', 'Azija']
    },
    {
      id: 'hr-l-1',
      letter: 'L',
      question: 'Koji grad je glavni grad Engleske?',
      answer: 'London',
      options: ['Paris', 'London', 'Madrid', 'Rim']
    }
  ],
  en: [
    {
      id: 'en-r-1',
      letter: 'R',
      question: 'What is the capital of Croatia?',
      answer: 'Zagreb',
      options: ['Zagreb', 'Split', 'Rijeka', 'Osijek']
    },
    {
      id: 'en-r-2',
      letter: 'R',
      question: 'Which animal is known for its long neck?',
      answer: 'Giraffe',
      options: ['Elephant', 'Giraffe', 'Zebra', 'Lion']
    },
    {
      id: 'en-a-1',
      letter: 'A',
      question: 'Which fruit starts with the letter A?',
      answer: 'Pineapple',
      options: ['Banana', 'Pineapple', 'Orange', 'Strawberry']
    },
    {
      id: 'en-p-1',
      letter: 'P',
      question: 'What is the capital of France?',
      answer: 'Paris',
      options: ['London', 'Madrid', 'Paris', 'Berlin']
    },
    {
      id: 'en-h-1',
      letter: 'H',
      question: 'What is the capital of Hungary?',
      answer: 'Budapest',
      options: ['Prague', 'Budapest', 'Warsaw', 'Bucharest']
    },
    {
      id: 'en-a-2',
      letter: 'A',
      question: 'Which animal lives in Antarctica?',
      answer: 'Penguin',
      options: ['Polar bear', 'Penguin', 'Seal', 'Whale']
    },
    {
      id: 'en-e-1',
      letter: 'E',
      question: 'Which continent starts with E?',
      answer: 'Europe',
      options: ['Africa', 'America', 'Europe', 'Asia']
    },
    {
      id: 'en-l-1',
      letter: 'L',
      question: 'What is the capital of England?',
      answer: 'London',
      options: ['Paris', 'London', 'Madrid', 'Rome']
    }
  ]
};
