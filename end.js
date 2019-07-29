const username = document.getElementById('username')
const saveScoreBtn = document.getElementById('saveScoreBtn')
const finalScore = document.getElementById('finalScore')

// Get the final result score from local storage
const mostRecentScore = localStorage.getItem('mostRecentScore')

// Save high scores in local storage
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

// Set max score to be displayed
const maxHighScores = 5

// Set the finalScore display to the mostRecentScore from local storage
finalScore.innerText = mostRecentScore

username.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !username.value
})

function saveHighScore (e) {
  console.log('clicked the save button!')
  e.preventDefault()

  // Create object to save the result
  const score = {
    score: mostRecentScore,
    name: username.value
  }

  // Add new score to the array
  highScores.push(score)

  // Sort the top 5 scorers using sort()
  highScores.sort((a, b) => {
    return b.score - a.score
  })

  // Cut the array and take only 5 best scorers -> maxHighScores
  highScores.splice(maxHighScores)

  // Update local storage
  localStorage.setItem('highScores', JSON.stringify(highScores))
  window.location.assign('index.html')
}
