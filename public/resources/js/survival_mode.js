console.log('loading js')

const play_button = document.getElementById('play-button')
const clear_button = document.getElementById('clear-button')
const go_back_button = document.getElementById('go-back-button')

const category_select = document.getElementById('category')
const difficult_select = document.getElementById('difficulty')
const lives_select = document.getElementById('lives')

const fetchCategories = async ()=>{
    const response = await fetch('https://opentdb.com/api_category.php')
    const data = await response.json()
    const categories = data.trivia_categories
    
    for (let category of categories){
        const new_category = document.createElement('option')
        new_category.value = category.id
        new_category.innerText = category.name
        category_select.appendChild(new_category)
    }
}

const startGame = () =>{
    fetchQuestions()
}

const fetchQuestions = async () =>{
    const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${category_select.value}&difficulty=${difficult_select.value}&type=multiple`)
    const data = await response.json()
    const questions = data.results
    localStorage.setItem('questions',JSON.stringify(questions))
    localStorage.setItem('question_index', 0);
    localStorage.setItem('lives', lives_select.value);
    loadQuestionPage()
}

const loadQuestionPage = async () =>{
    location.href = `${location.origin}/survival_mode/start_game`
}

const handlePlay = (ev)=>{
    startGame()
}
const handleGoBack = (ev)=>{
    console.log('ready to go back to main menu')
}
const handleClear = (ev)=>{
    console.log('ready to clear the selection')
}

go_back_button.addEventListener('click', handleGoBack)
play_button.addEventListener('click', handlePlay)
clear_button.addEventListener('click', handleClear)

fetchCategories()

