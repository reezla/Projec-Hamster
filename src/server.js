// import express and middleware

const express = require('express')


// import database 

const hamsterList = require('./data.json')

// konfig. server

const app = express()
const PORT = 1337


// install middleware

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
})