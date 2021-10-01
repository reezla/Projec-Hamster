// import express and middleware
const express = require('express')
const hamstersRouter = require('./routes/hamster.js')

// import database 

const hamsters = require('./data.json')

// konfig. server

const app = express()
const PORT = process.env.PORT || 1331
const cors = require('cors')
const path = require('path')
const staticFolder = path.join(__dirname, 'public')


// install middleware
app.use( cors())

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next()
})

app.use( express.urlencoded( { extended:true }) )
app.use( express.json() )


app.use('/', express.static(staticFolder)) 


// set-up routes
app.use('/hamsters', hamstersRouter)


app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})

