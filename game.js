// Get reference for the question
const question = document.getElementById('question')
const choice = Array.from(document.getElementsByClassName('choice-text'))

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
  {
    question: 'Inside which HTML element do we put the JavaScript??',
    choice1: '<script>',
    choice2: '<javascript>',
    answer: 1
  },
  {
    question:
        "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script src='xxx.js'>",
    answer: 2
  },
  {
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alert('Hello World');",
    answer: 2
  }
]
