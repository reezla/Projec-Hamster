const { connect } = require('../database.js')
const db = connect()

const hamsters = 'hamsters'

deleteOne();


async function deleteOne(id) {
	console.log('Deleting a document...');
	const docId = id || '2EQ0Di6Twd5I5d7H9isY'

	const docRef = db.collection(hamsters).doc(docId)
	const docSnapshot = await docRef.get()
	console.log('Document exists? ', docSnapshot.exists);
	const result = await docRef.delete()
}