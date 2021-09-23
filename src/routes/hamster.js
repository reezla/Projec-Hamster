const express = require('express');
const router = express.Router();

const database = require('../database.js')
const connect = database.connect
const db = connect()
const cors = require('cors');
const hamsters = 'hamsters'
const app = express()

app.use( cors() )

router.get('/', async (req, res) => { 
    let array = await getAll()
    if ( array == 0 ) {
        res.sendStatus(404)
        console.log('No hamsters left')
    } else {
        res.send(array)
    }
})

router.get( '/random', async (req, res) => {     // get random hamster
	let array = await getAll()
	let randomHamster = array[Math.floor(Math.random()*array.length)]
	console.log(randomHamster);
	res.send(randomHamster)
})

router.get('/:id', (req, res) => {
	
})

async function getAll() {
	const hamstersRef = db.collection(hamsters)  
	const hamstersSnapshot = await hamstersRef.get()   // get all documents

	if( hamstersSnapshot.empty ) {
		return []
	}
	const array = []
	await hamstersSnapshot.forEach(async docRef => {
		const data = await docRef.data()
		data.id = docRef.id
		array.push(data)
	})

	// console.log('Data from database:', array);
	return array
}

module.exports = router



// ubaciti funkciju iz getAllDocuments.js u hamster.js 
// da bi dobili podatke sa Firebase