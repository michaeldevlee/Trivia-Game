## What kind of game is this?
A browser based quiz-style game based on Open Trivia database

## Which technologies did you use?
Javascript, HTML, CSS, NodeJs, MongoDB, Heroku

## How does it work?
1) User is given some parameters to choose such as:
- Difficulty (Easy -> Hard)
- Category (pulled from Open Trivia database)
- Number of Lives (1 -> 5)

2) Based on parameters, display 10 random questions from specified category and difficulty
3) If the user chooses the wrong answer, a life will be lost.
4) If the user chooses the correct answer, 10 points will be added to their score in local storage
5) After winning or losing the current question set, server will update MongoDB if user score is higher than high score
6) Users will accumulate points
