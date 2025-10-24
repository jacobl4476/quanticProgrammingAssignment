import { Injectable } from '@nestjs/common';
const Database = require('better-sqlite3')
const db = new Database('database.db')

@Injectable()
export class ActivitiesService {
  create(p: any, req: any): string {
    const id = req.path.split("/")[2]
    if(req.user.role !== "manager"){
        return "Only managers can perform this operation"
    }
    const insert = db.prepare(`
        INSERT INTO activities (account_id, user_id, type, notes, next_follow_up) VALUES (?, ?, ?, ?, ?)
        `)
    insert.run(id, req.user.id.toString(), p.type, p.notes, p.next_follow_up || null)
    return 'Success';
  }
  read(req: any): string {
    const id = req.path.split("/")[2]
    const select = db.prepare('SELECT * FROM activities WHERE user_id = ? AND account_id = ?');
    const rows = select.all(req.user.id.toString(), id);
    return JSON.stringify(rows);
  }
  update(p: any, req: any): string {
    const id = req.path.split("/")[2]
    if(req.user.role !== "manager"){
        return "Only managers can perform this operation"
    }
    if(p.type){
      const insert = db.prepare(`
          UPDATE activities SET type = ? WHERE id = ? AND user_id = ? AND account_id = ?
          `)
      insert.run(p.type, p.id, req.user.id.toString(), id)
    }
    if(p.notes){
      const insert = db.prepare(`
          UPDATE Activities SET notes = ? WHERE id = ? AND user_id = ? AND account_id = ?
          `)
      insert.run(p.notes, p.id, req.user.id.toString(), id)
    }
    if(p.next_follow_up){
      const insert = db.prepare(`
          UPDATE Activities SET next_follow_up = ? WHERE id = ? AND owner_id = ? AND account_id = ?
          `)
      insert.run(p.next_follow_up, p.id, req.user.id.toString(), id)
    }
    return 'Success';
  }
  delete(id: string, req: any): string {
    const aid = req.path.split("/")[2]
    if(req.user.role !== "manager"){
        return "Only managers can perform this operation"
    }
    const insert = db.prepare(`
        DELETE FROM activities WHERE id = ? AND user_id = ? AND account_id = ?
        `)
    insert.run(parseInt(id), req.user.id.toString(), aid)
    return 'Success';
  }
}
