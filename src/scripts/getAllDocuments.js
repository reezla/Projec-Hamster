const database = require('../database.js')
const connect = database.connect
const db = connect()

const USERS = 'users'

getAll();



async function getAll() {
	console.log('Retrieving all documents from database...');

	// Hämta en referens till den collection vi vill använda
	const usersRef = db.collection(USERS)

	// Hämta alla documents som collection innehåller
	const usersSnapshot = await usersRef.get()

	if( usersSnapshot.empty ) {
		console.log('No documents in collection.');
		return
	}

	// Det finns dokument i snapshot
	// Lägg all data i en ny array - om det hade varit Express, ska arrayen skickas tillbaka till frontend
	const array = []

	// Kom ihåg att vänta på att forEach ska bli färdig, annars får du en tom array
	await usersSnapshot.forEach(async docRef => {
		// Vänta på att datan ska hämtas
		const data = await docRef.data()
		// id behövs om man senare vill ändra på ett document (PUT/DELETE)
		data.id = docRef.id
		array.push(data)
	})

	console.log('Data from database:', array);
	return array
}

// GET	/hamsters/:id	  moze da se vidi u lekciji 14/9