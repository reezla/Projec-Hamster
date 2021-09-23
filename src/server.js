// import express and middleware
const express = require('express')
const hamstersRouter = require('./routes/hamster.js')

// import database 

const hamsters = require('./data.json')

// konfig. server

const app = express()
const PORT = process.env.PORT || 1337


//app.get('/hamsters', ( req, res ) => {     // ovo imamo u hamsters.js
  //  res.send(hamsters)
//})

// install middleware

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next()
})

app.use( express.json() )

app.use('/', express.static(__dirname + 'public')) 


// set-up routes
app.use('/hamsters', hamstersRouter)


app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})
