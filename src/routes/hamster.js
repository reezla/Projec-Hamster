// const { response } = require('express');
const express = require('express');
const router = express.Router();

const hamsters = require('../data.json');

router.get('/', (req, res) => { 
    res.send(hamsters)
})

router.get('/hamsters', ( req, res) => { 

})

module.exports = router
