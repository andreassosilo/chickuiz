// Get reference for the question
const question = document.getElementById('question')
const choices = Array.from(document.getElementsByClassName('choice-text'))

// Get value for questionCounter
const progressText = document.getElementById('progressText')
const scoreText = document.getElementById('score')

// Get value for progressBar
const progressBarFull = document.getElementById('progressBarFull')

// Get value for timer counter
const timerCounter = document.getElementById('timerCounter')

let currentQuestion = {}
let acceptingAnswers = false
let score = 0
let questionCounter = 0
let availableQuestions = []

// Variables for counter render
let questionTime = 5 // 5 secs for every question
let timer = null

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
const maxQuestions = 10

function startGame () {
  questionCounter = 0
  score = 0
  availableQuestions = [...questions]
  counterRender()
  timer = setInterval(counterRender, 1000)
  getNewQuestion()
}

function getNewQuestion () {
  // If there is no more question in the array or we have used max counter, stop the game
  if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
    // Clear interval of the timer
    clearInterval(timer)
    // Save the score to local storage
    localStorage.setItem('mostRecentScore', score)
    // Go to the end page
    return window.location.assign('end.html')
  }
  questionCounter++
  // Display questionCounter in HUD
  progressText.innerText = `Question ${questionCounter}/${maxQuestions}`

  // Update the progress bar
  progressBarFull.style.width = `${(questionCounter / maxQuestions) * 100}%`

  // Set the counterTimer to 5s again
  questionTime = 5

  // To make the questions randomize
  const questionIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionIndex]
  question.innerText = currentQuestion.question
  // Get the choices for that selected question
  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })
  // Remove the selected question from the list of available questions array
  availableQuestions.splice(questionIndex, 1)
  // After loading the questions, then the player can start to give the answer
  acceptingAnswers = true
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return
    acceptingAnswers = false

    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']
    // If the selected answer is correct, return message
    const classToApply = Number(selectedAnswer) === Number(currentQuestion.answer) ? 'correct' : 'incorrect'

    // Add score according to the answer using if-else conditional
    if (classToApply === 'correct') {
      incrementScore(correctBonus)
    }

    // Add class to the button
    selectedChoice.parentElement.classList.add(classToApply)

    // Set time to give a delay before we remove that class
    setTimeout(() => {
      // Remove the class after we are done
      selectedChoice.parentElement.classList.remove(classToApply)
      // After we answered the question, load a new question
      getNewQuestion()
    }, 1000)
  })
})

function incrementScore (num) {
  score += num
  scoreText.innerText = score
}

function counterRender () {
  if (questionTime >= 0) {
    timerCounter.innerHTML = `${questionTime}s`
    questionTime--
  } else {
    questionTime = 5
    getNewQuestion()
  }
}

// Start the quiz app
startGame()
