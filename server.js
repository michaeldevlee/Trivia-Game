const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000

const {MongoClient, ObjectId} = require('mongodb');
const { type } = require('os');
const uri = process.env.CONNECTIONSTRING;
const instance = new MongoClient(uri,{ useNewUrlParser: true })
const dbName = 'triviaGameDb'
const collection = 'high_score'
const collection_id = '62abbe4a34e53b3e3b5dc088'

app.use(express.static('public'))
app.listen(port, ()=>console.log(`listening at port ${port}`))

let high_score = 0

const updateHighScoreInApp = () => {
    instance.connect( async (err,client)=>{
        if (err) console.log('failed to connect');
        console.log('updating high score')
        const db = client.db(dbName)
        const collections = await db.collection(collection)
        const current_high_score = await collections.findOne({_id: ObjectId(collection_id)})
        high_score = current_high_score.high_score
    })
}

updateHighScoreInApp();

const updateHighScoreInDatabase = (score)=>{
    instance.connect((err, client)=>{
        if (err) console.log('failed to connect');
        console.log('connected succesfully to server')
        const db = client.db(dbName)
        const collections = db.collection(collection)
        if (parseInt(high_score) < parseInt(score)){
            console.log(`updating score to ${score}`)
            console.log(`previous high score was ${high_score}`)
            high_score = score;
            collections.updateOne({},{$set: {high_score : score}})
        }
        })
}


app.get('/survival_mode', (request, response)=>{
    response.sendFile(__dirname + '/public/resources/html/survival_mode.html')
})

app.get('/survival_mode/start_game', (request, response)=>{
    response.sendFile(__dirname + '/public/resources/html/questions_page.html')
})

app.get('/results', (request, response)=>{
    response.sendFile(__dirname + '/public/resources/html/results_page.html')
})

app.get('/update_high_score/:score', (request, response)=>{
    updateHighScoreInDatabase(request.params.score)
    response.json({high_score:request.params.score})
})

app.get('/get_high_score', (request,response)=>{
    response.json({score: high_score})
})
