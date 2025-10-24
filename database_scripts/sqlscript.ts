const Database = require('better-sqlite3')
const db = new Database('database.db')

const sql = db.prepare(`SELECT * FROM leads`)
console.log(sql.all())