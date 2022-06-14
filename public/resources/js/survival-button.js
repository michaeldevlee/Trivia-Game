const survival_button = document.querySelector('.survival-mode-button')
const yourScoreText = document.querySelector('.your-score-main')
const highScoreText = document.querySelector('.high-score-main')

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
    highScoreText.innerText = `High Score : 5`
}

survival_button.addEventListener('click', survivalModeInput)
pointsInit();
displayScores();