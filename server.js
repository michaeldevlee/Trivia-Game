const dotenv = require('dotenv').config();
console.log(process.env)
const express = require('express');
const app = express();
const path = require('path')

const {MongoClient} = require('mongodb')
//const uri = 'mongodb+srv://mikelee53:cS4mXncYd27p5kvg@cluster0.ocvfnwt.mongodb.net/?retryWrites=true&w=majority'
const uri = process.env.CONNECTIONSTRING;
const instance = new MongoClient(uri,{ useNewUrlParser: true })
const dbName = 'test_db'
let db

const main = async ()=>{
    await instance.connect((err, client)=>{
        if (err) console.log('failed to connect')
        else{
            db = client.db('test_db')
            console.log('connected succesfully to server')
            
        }
    });
    

    return '.done'
}

main().catch(console.error).finally(instance.close())

app.use(express.static('public'))
app.listen(3000, ()=>console.log('listening at port 3000'))

app.get('/', (request, response)=>{
    response.sendFile(__dirname + '/index.html')
})

app.get('/survival_mode', (request, response)=>{
    response.sendFile(__dirname + '/public/resources/html/survival_mode.html')
})

app.get('/survival_mode/start_game', (request, response)=>{
    response.sendFile(__dirname + '/public/resources/html/questions_page.html')
})

app.get('/results', (request, response)=>{
    response.sendFile(__dirname + '/public/resources/html/results_page.html')
})
