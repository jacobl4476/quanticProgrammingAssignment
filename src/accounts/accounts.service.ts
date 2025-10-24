import { Injectable } from '@nestjs/common';
const Database = require('better-sqlite3')
const db = new Database('database.db')

@Injectable()
export class AccountsService {
  create(p: any, req: any): string {
    if(req.user.role !== "manager"){
        return "Only managers can perform this operation"
    }
    const insert = db.prepare(`
        INSERT INTO accounts (owner_id, name, industry) VALUES (?, ?, ?)
        `)
    insert.run(req.user.id.toString(), p.name, p.industry)
    return 'Success';
  }
  read(req: any): string {
    const select = db.prepare('SELECT * FROM accounts WHERE owner_id = ?');
    const rows = select.all(req.user.id.toString());
    return JSON.stringify(rows);
  }
  update(p: any, req: any): string {
    if(req.user.role !== "manager"){
        return "Only managers can perform this operation"
    }
    if(p.name){
      const insert = db.prepare(`
          UPDATE accounts SET name = ? WHERE id = ? AND owner_id = ?
          `)
      insert.run(p.name, p.id, req.user.id.toString())
    }
    if(p.industry){
      const insert = db.prepare(`
          UPDATE accounts SET industry = ? WHERE id = ? AND owner_id = ?
          `)
      insert.run(p.industry, p.id, req.user.id.toString())
    }
    return 'Success';
  }
  delete(id: string, req: any): string {
    if(req.user.role !== "manager"){
        return "Only managers can perform this operation"
    }
    const insert = db.prepare(`
        DELETE FROM accounts WHERE id = ? AND owner_id = ?
        `)
    insert.run(parseInt(id), req.user.id.toString())
    return 'Success';
  }
}
