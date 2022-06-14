const question_number = document.querySelector('.question-number')
const question_text = document.querySelector('.question-text')
const mc_one = document.querySelector('.choice-button-1')
const mc_two = document.querySelector('.choice-button-2')
const mc_three = document.querySelector('.choice-button-3')
const mc_four = document.querySelector('.choice-button-4')
const life_counter = document.querySelector('.life')

const mc_buttons = [mc_one,mc_two,mc_three,mc_four]
const choice_locations = [1,2,3,4]

let questions
let question_index
let lives
let points

const registerButtons = ()=>{
    mc_buttons.forEach((button)=>{
        button.addEventListener('click',processAnswer)
    })
}

const increaseIndex = ()=>{
    const index_str = localStorage.getItem('question_index')
    question_index += 1;
    return localStorage.setItem('question_index',parseInt(index_str) + 1)
}

const decreaseLife = ()=>{
    const life_str = localStorage.getItem('lives')
    lives -= 1
    life_counter.innerText = `Lives : ${lives}`
    return localStorage.setItem('lives',parseInt(life_str) - 1)
}

const addPoints = ()=>{
    const point_str = localStorage.getItem('High Score')
    return localStorage.setItem('High Score', parseInt(point_str) + 10)
}

const pointsInit = ()=>{
    if (localStorage['High Score'] == null){
        localStorage.setItem('High Score', 0)
    }
}

const formatText = (text)=>{
    const replace_ast = text.replace(/&#039;/g, '\'')
    const replace_quot = replace_ast.replace(/&quot;/g, '\"')
    const replace_amp = replace_quot.replace(/&amp;/g, '&')
    const replace_double_quot = replace_amp.replace(/&ldquo;/,'“ ”')
    return replace_double_quot;
}

const updateQuestion = (index) => {
    question_number.innerText = 'Question #' + (index+1)
    question_text.innerText = formatText(questions[index].question)
}

const assignAnswers = (index) =>{
    mc_one.innerText = formatText(questions[index].incorrect_answers[0])
    mc_one.setAttribute('value', questions[index].incorrect_answers[0])  
    mc_two.innerText = formatText(questions[index].incorrect_answers[1])
    mc_two.setAttribute('value', questions[index].incorrect_answers[1])  
    mc_three.innerText = formatText(questions[index].correct_answer)
    mc_three.setAttribute('value', questions[index].correct_answer) 
    mc_four.innerText = formatText(questions[index].incorrect_answers[2])
    mc_four.setAttribute('value', questions[index].incorrect_answers[2]) 
    const shuffledChoices = mc_buttons.sort(()=>Math.random()-0.5)
    shuffledChoices.forEach((choice)=>{
        question_text.appendChild(choice)
    })
}

const goToNextQuestion = ()=>{
    const index = localStorage['question_index']
    increaseIndex(index)
    updateQuestion(question_index)
    assignAnswers(question_index)
}

const resetGameStats = ()=>{
    localStorage.removeItem('question_index');
    localStorage.removeItem('questions');
    localStorage.removeItem('lives');
    questions = null
    question_index = null
    lives = null
}

const goToResultsPage = ()=>{
   location.href = `${location.origin}/results`
}

const processAnswer = (ev)=>{
    if (questions == null){
        location.href = `${location.origin}`
    }

    if (question_index < questions.length-1){
        if (ev.target['value'] == questions[question_index].correct_answer){
            goToNextQuestion();
            addPoints();
       }
       else{
           decreaseLife()
           if (lives <= 0){
            resetGameStats();
            goToResultsPage();
           }
           else{
            goToNextQuestion()
           }
           
       }
    }
    else{
        resetGameStats();
        goToResultsPage();
    }
}

const questionInit = ()=>{
    if (localStorage.getItem('questions') && localStorage.getItem('question_index')){
        console.log(localStorage.getItem('questions'))
        questions = JSON.parse(localStorage['questions'])
        question_index = JSON.parse(localStorage['question_index'])
        updateQuestion(question_index)
        assignAnswers(question_index)
        livesInit(lives)
        pointsInit();
    }
    else{
        location.href = `${location.origin}`
    }   
}

const livesInit = ()=>{
    if (localStorage.getItem('lives')){
        lives = JSON.parse(localStorage['lives'])
        life_counter.innerText = `Lives : ${lives}`
    }
}

questionInit()
registerButtons()
