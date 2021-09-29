const { connect } = require('../database.js')
const db = connect()


const hamsters = 'hamsters'

updateOne();

async function updateOne(id) {
console.log('Update');
    const docId = id || '0xOdLxAtMmzvO2WfxMy9'  // Lelaah

    const update = { 
      "favFood":"raddiccio",
      "loves":"allt möjligt",
    }

    await db.collection(hamsters).doc(docId).set(update, { merge: true })
}