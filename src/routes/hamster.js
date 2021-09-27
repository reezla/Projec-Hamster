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

router.get('/:id' , async  (req, res) => {
	let id = await getOne(req.params.id) 
	if ( id ) {
		res.status(200).send( id )
	} else {
	res.sendStatus(404)
}
}) 


router.post('/', async (req, res) => {
	let body = await req.body
	if( !isHamsterObject(body) ) {
		res.sendStatus(400)
		return
	} 
	let newId = await postHamster(body)
	res.status(200).send({id:newId})
})

router.put('/:id', async (req, res) => {
	let body = req.body
	if (!changedHumster(body)){
		res.sendStatus(400);
		return;
	}

	const newHamsterInfo = await humsterUpdate(req.params.id, body);
	if(!newHamsterInfo) {
		res.sendStatus(404);
		return;
	} else {
		res.sendStatus(200)
	}
})



router.delete('/:id', async (req, res) => {
	let id = await deleteOneHamster(req.params.id)
	console.log('params: ', req.params.id, id);
	
	if ( id ){
		res.sendStatus(200)
	} else {
		
		res.sendStatus(404)
	}
})


////////////////////// f //////////////////////

function changedHumster(body) {            // handling PUT object
	if (typeof body !== "object") {
		console.log(typeof body);
		return false
	}

	let keys = Object.keys(body);
	if (!keys.includes("wins") || !keys.includes("games")) {
		return false;
	}

	return true;
}

async function humsterUpdate( id, body ) {            // PUT new results
	const docRef = await db.collection(hamsters).doc(id);
	const docSnapshot = await docRef.get();

	if (docSnapshot.exists) {
		const settings = { merge:true};
		const data = await db.collection(hamsters).doc(id).set(body, settings);
		return data;
	}
	return false
}

async function postHamster(object) {
	const docRef = await db.collection(hamsters).add(object)
	return (docRef.id)
	//const settings = { merge:true } till put koden

}

function isHamsterObject(body) {
	
	if (typeof body !== "object" ) {
		console.log(typeof body)
		return false;
	}
	let keys = Object.keys(body);
	
	if ( !keys.includes( "name" ) 
	|| !keys.includes( "age" ) 
	|| !keys.includes( "loves" ) 
	|| !keys.includes( "defeats" ) 
	|| !keys.includes( "wins" ) 
	|| !keys.includes( "imgName" )
	|| !keys.includes( "favFood" ) 
	|| !keys.includes( "games" )
	) {
        return false
    } 
        return true
}

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

async function getOne(id) {
	const docRef = db.collection(hamsters).doc(id)
	const docSnapshot = await docRef.get()
	if( docSnapshot.exists ) {
		return docSnapshot.data()
	} else { 
		return null
	}	
}

async function deleteOneHamster(id) {                // remove hamster with Id
	console.log('Deleting a document...');
	const docRef = db.collection(hamsters).doc(id)
	const docSnapshot = await docRef.get()
	console.log('Document exists? ', docSnapshot.exists);
	if (docSnapshot.exists) {
		await docRef.delete()
		return true
	} else 
	return false
}

module.exports = router



// ubaciti funkciju iz getAllDocuments.js u hamster.js 
// da bi dobili podatke sa Firebase