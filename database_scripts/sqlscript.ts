const Database = require('better-sqlite3')
const db = new Database('database.db')

const sql = db.prepare(`SELECT * FROM accounts`)
console.log(sql.all())