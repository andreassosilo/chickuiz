// Get reference for the question
const question = document.getElementById('question')
const choices = Array.from(document.getElementsByClassName('choice-text'))

let currentQuestion = {}
let acceptingAnswers = false
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
  {
    question: 'Who invented radio?',
    choice1: 'Marconi',
    choice2: 'Meucci',
    answer: 1
  },
  {
    question: 'Capital city of Australia?',
    choice1: 'Canberra',
    choice2: 'Sydney',
    answer: 1
  },
  {
    question: 'Potassium in periodic table?',
    choice1: 'P',
    choice2: 'K',
    answer: 2
  },
  {
    question: 'Prime number?',
    choice1: '37',
    choice2: '39',
    answer: 1
  },
  {
    question: 'Where is Mount Kilimanjaro',
    choice1: 'Kenya',
    choice2: 'Tanzania',
    answer: 2
  },
  {
    question: 'Who is Socrates?',
    choice1: 'Inventor',
    choice2: 'Philosopher',
    answer: 2
  },
  {
    question: 'Where is Eritrea?',
    choice1: 'Asia',
    choice2: 'Africa',
    answer: 2
  },
  {
    question: 'Primary colour in painting?',
    choice1: 'Blue',
    choice2: 'Green',
    answer: 1
  },
  {
    question: 'Who wrote Oliver Twist?',
    choice1: 'Charles Dickens',
    choice2: 'Mark Twain',
    answer: 1
  },
  {
    question: 'United Nations headquarter?',
    choice1: 'New York',
    choice2: 'Chicago',
    answer: 1
  },
  {
    question: 'Capsicum is a type of?',
    choice1: 'Animal',
    choice2: 'Plant',
    answer: 2
  },
  {
    question: 'Which airport is in Tokyo?',
    choice1: 'Itami',
    choice2: 'Haneda',
    answer: 2
  },
  {
    question: 'Who is Galileo Galilei?',
    choice1: 'Astronomer',
    choice2: 'Painter',
    answer: 1
  },
  {
    question: 'Winner of World Cup 2014?',
    choice1: 'France',
    choice2: 'Germany',
    answer: 2
  },
  {
    question: 'Einstein won Noble Prize in?',
    choice1: 'Physics',
    choice2: 'Peace',
    answer: 1
  }
]

// CONSTANTS
const correctBonus = 10
const maxQuestions = 3

function startGame () {
  questionCounter = 0
  score = 0
  availableQuestions = [...questions]
  console.log(availableQuestions)
  getNewQuestion()
}

function getNewQuestion () {
  questionCounter++
  // To make the questions randomize
  const questionIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })
}

// Start the quiz app
startGame()
