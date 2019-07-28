const highScoresList = document.getElementById('highScoresList')
// Get the high scores from the local storage
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

// Add each scores in the unordered list (li)
highScoresList.innerHTML = highScores.map(score => {
  return `<li class="high-score">${score.name} - ${score.score} points</li>`
}).join('')
