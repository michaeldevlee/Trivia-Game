## Game Summary
A browser based quiz-style game based on Open Trivia database

## Technologies Used
Javascript, HTML, CSS, NodeJs, MongoDB, Heroku

## General Game Loop
1) User is given some parameters to choose such as:
- Difficulty (Easy -> Hard)
- Category (pulled from Open Trivia database)
- Number of Lives (1 -> 5)

2) Based on parameters, display 10 random questions from specified category and difficulty
3) If the user chooses the wrong answer, a life will be lost.
4) If the user chooses the correct answer, 10 points will be added to their score in local storage
5) After winning or losing the current question set, server will update MongoDB if user score is higher than high score
6) Users will accumulate points

## General Optimizations

I would implement an user/login feature to manage user data rather than storing strings in localStorage. This would provide a more secure solution and allow development to tailor to individualized experiences for the user.
