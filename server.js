const dotenv = require('dotenv').config();
console.log(process.env)
const express = require('express');
const app = express();
const port = process.env.PORT || 3000

const {MongoClient} = require('mongodb')
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
app.listen(port, ()=>console.log(`listening at port ${port}`))

app.get('/survival_mode', (request, response)=>{
    response.sendFile(__dirname + '/public/resources/html/survival_mode.html')
})

app.get('/survival_mode/start_game', (request, response)=>{
    response.sendFile(__dirname + '/public/resources/html/questions_page.html')
})

app.get('/results', (request, response)=>{
    response.sendFile(__dirname + '/public/resources/html/results_page.html')
})
