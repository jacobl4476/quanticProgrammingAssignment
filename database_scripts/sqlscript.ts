const Database = require('better-sqlite3')
const db = new Database('db.db')

const sql = db.prepare(`SELECT * FROM users`)
console.log(sql.all())