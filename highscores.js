const highScoresList = document.getElementById('highScoresList')
// Get the high scores from the local storage
const highScores = JSON.parse(localStorage.getItem('highScores')) || []

// Add each scores in the unordered list (li)
highScoresList.innerHTML = highScores.map(score => {
  if (score.score > 90) {
    return `<ul style="list-style-image: url(/chickuiz/assets/fullHeadedChickenIcon.png)">
    <li class="high-score">${score.name} - ${score.score} points</li></ul>`
  } else if (score.score > 40) {
    return `<ul style="list-style-image: url(/chickuiz/assets/happyChickIcon.png)">
    <li class="high-score">${score.name} - ${score.score} points</li></ul>`
  } else if (score.score >= 0) {
    return `<ul style="list-style-image: url(/chickuiz/assets/noobEggIcon.png)">
    <li class="high-score">${score.name} - ${score.score} points</li></ul>`
  }
}).join('')
