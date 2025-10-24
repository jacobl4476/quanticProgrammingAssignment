
import { Injectable } from '@nestjs/common';
const Database = require('better-sqlite3')
const db = new Database('database.db')

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()

export class UsersService {
    

  async findOne(email: string): Promise<User | undefined> {
    const select = db.prepare(
        `SELECT * FROM users`
    )
    const rows = select.all()
    const users = rows;
    return users.find(user => user.email === email);
  }

  async createOne(email: string, password: string, hashed: string, role: string): Promise<User | undefined> {
    if(!isAllCharPresent(password)){
        return
    }
    const insert = db.prepare(`
        INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)
         `)
    insert.run(email, hashed, role)
    return true
  }
}

function isAllCharPresent(str) {
    let pattern = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
    );
    return pattern.test(str)
}
