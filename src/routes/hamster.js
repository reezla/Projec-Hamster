// const { response } = require('express');
const express = require('express');
const router = express.Router();

const hamsters = require('../data.json');

router.get('/', (req, res) => { 
    console.log('cao');
    res.send(hamsters)
})


module.exports = router



// ubaciti funkciju iz getAllDocuments.js u hamster.js 
// da bi dobili podatke sa Firebase