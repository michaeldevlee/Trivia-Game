const survival_button = document.querySelector('.survival-mode-button')
const yourScoreText = document.querySelector('.your-score-main')
const highScoreText = document.querySelector('.high-score-main')

const retrieveHighScoreFromDatabase = async ()=>{
    const response = await fetch('/get_high_score')
    const data = await response.json()
    const high_score = data.score
    highScoreText.innerText = `High Score : ${high_score}`
}

const survivalModeInput = (ev)=>{
    location.href = `${location.origin}/survival_mode`
}

const pointsInit = ()=>{
    if (localStorage['High Score'] == null){
        localStorage.setItem('High Score', 0)
    }
}

const displayScores = () =>{
    yourScoreText.innerText = `Your Score : ${localStorage['High Score']}`
}

survival_button.addEventListener('click', survivalModeInput)
pointsInit();
displayScores();
retrieveHighScoreFromDatabase();