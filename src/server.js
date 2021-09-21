// import express and middleware
const express = require('express')


// import database 

const hamsters = require('./data.json')

// konfig. server

const app = express()
const PORT = process.env.PORT || 1337


app.get('/hamsters', ( req, res ) => {
    res.send(hamsters)
})
// install middleware
app.use( express.json() )



// app.use( '/web', express.static(__dirname, '/../public'))



app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})
