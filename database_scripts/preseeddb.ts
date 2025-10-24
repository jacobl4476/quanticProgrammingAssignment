const Database = require('better-sqlite3')
const db = new Database('database.db')

db.exec(`
PRAGMA foreign_keys = ON;
CREATE TABLE users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
email TEXT UNIQUE NOT NULL,
password_hash TEXT NOT NULL,
role TEXT CHECK(role IN ('rep','manager')) DEFAULT 'rep',
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE leads (
id INTEGER PRIMARY KEY AUTOINCREMENT,
owner_id TEXT NOT NULL REFERENCES users(id),
name TEXT NOT NULL,
company TEXT,
status TEXT CHECK(status IN ('new','working','qualified','disqualified'))
DEFAULT 'new',
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE accounts (
id INTEGER PRIMARY KEY AUTOINCREMENT,
owner_id TEXT NOT NULL REFERENCES users(id),
name TEXT NOT NULL,
industry TEXT,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE activities (
id INTEGER PRIMARY KEY AUTOINCREMENT,
account_id TEXT NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
user_id TEXT NOT NULL REFERENCES users(id),
type TEXT CHECK(type IN ('call','email','demo')),
notes TEXT,
next_follow_up DATETIME,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
/* bcrypt hash for 'Password1!' */
INSERT INTO users (email,password_hash,role) VALUES
('alice@corp.com','$2b$10$YvQtSbN2UiKNnyW7LwRIfuaNT0uOh4NoRZsnyp2Q2yBmZtjo/9hAq','manager'),
('bob@corp.com','$2b$10$YvQtSbN2UiKNnyW7LwRIfuaNT0uOh4NoRZsnyp2Q2yBmZtjo/9hAq','rep');
INSERT INTO leads (owner_id,name,company,status) VALUES
('2','Charlie','Acme Inc','working');
INSERT INTO accounts (owner_id,name,industry) VALUES
('2','Acme Inc','Manufacturing');
INSERT INTO activities (account_id,user_id,type,notes) VALUES
('1','2','call','Intro call--good fit!');
`)
db.close()