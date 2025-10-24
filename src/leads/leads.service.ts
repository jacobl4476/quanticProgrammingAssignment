import { Injectable } from '@nestjs/common';
const Database = require('better-sqlite3')
const db = new Database('database.db')

@Injectable()
export class LeadsService {
  create(name: string, company: string, status: string, req: any): string {
    if(req.user.role !== "manager"){
        return "Only managers can perform this operation"
    }
    const insert = db.prepare(`
        INSERT INTO leads (owner_id, name, company, status) VALUES (?, ?, ?, ?)
        `)
    insert.run(req.user.id.toString(), name, company, status)
    return 'Success';
  }
  read(req: any): string {
    const select = db.prepare('SELECT * FROM leads WHERE owner_id = ?');
    const rows = select.all(req.user.id.toString());
    return JSON.stringify(rows);
  }
  update(id: string, status: string, req: any): string {
    if(req.user.role !== "manager"){
        return "Only managers can perform this operation"
    }
    const insert = db.prepare(`
        UPDATE leads SET status = ? WHERE id = ? AND owner_id = ?
        `)
    insert.run(status, id, req.user.id)
    return 'Success';
  }
  delete(id: string, req: any): string {
    if(req.user.role !== "manager"){
        return "Only managers can perform this operation"
    }
    const insert = db.prepare(`
        DELETE FROM leads WHERE id = ? AND owner_id = ?
        `)
    insert.run(parseInt(id), req.user.id.toString())
    return 'Success';
  }
}
