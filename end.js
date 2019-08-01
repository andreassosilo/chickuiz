const username = document.getElementById('username')
const saveScoreBtn = document.getElementById('saveScoreBtn')
const finalScore = document.getElementById('finalScore')
const scoreImage = document.getElementById('scoreImage')
const yourRank = document.getElementById('yourRank')

// Get the final result score from local storage
const mostRecentScore = localStorage.getItem('mostRecentScore')

// Save high scores in local storage
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

// Set max score to be displayed
const maxHighScores = 5

// Set the finalScore display to the mostRecentScore from local storage
finalScore.innerText = `${mostRecentScore} points`

// Choose image based on score
let img = (mostRecentScore > 90) ? '/chickuiz/assets/fullHeadedChicken.png'
  : (mostRecentScore > 40) ? '/chickuiz/assets/happyChick.png' : '/chickuiz/assets/noobEgg.png'

scoreImage.innerHTML = `<img src="${img}" width = 100>`

// Display rank based on score
let rank = (mostRecentScore > 90) ? 'Full Headed Chicken'
  : (mostRecentScore > 40) ? 'Happy Chick' : 'Noob Egg'

yourRank.innerText = `Your Rank: ${rank}`

// If user not yet input the
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
