const mainScreenButton = document.querySelector('.go-to-main-screen-button')
const yourScoreText = document.querySelector('.your-score')
const highScoreText = document.querySelector('.high-score')

const redirectToMainScreen = ()=>{
    location.href = `${location.origin}`
}

const displayScores = () =>{
    yourScoreText.innerText = `Your Score : ${localStorage['High Score']}` 
    highScoreText.innerText = `High Score : 5`
}

mainScreenButton.addEventListener('click', redirectToMainScreen)
displayScores();