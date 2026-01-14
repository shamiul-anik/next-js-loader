import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const url = process.env.TURSO_DATABASE_URL;
    const authToken = process.env.TURSO_AUTH_TOKEN;
    if (!url) {
      return NextResponse.json({ error: 'TURSO_DATABASE_URL not set' }, { status: 500 });
    }

    const { connect } = await import('@tursodatabase/database');
    const db = await connect(url, authToken ? { authToken } : undefined);

    const createTable = db.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL
      )
    `);
    createTable.run();

    // insert sample data if table is empty
    let count = 0;
    try {
      const countStmt = db.prepare('SELECT COUNT(*) as cnt FROM users');
      const row = countStmt.get();
      count = row?.cnt ?? 0;
    } catch (e) {
      count = 0;
    }

    if (count === 0) {
      const insert = db.prepare('INSERT INTO users (username) VALUES (?)');
      insert.run('alice');
      insert.run('bob');
    }

    const stmt = db.prepare('SELECT * FROM users');
    const users = stmt.all();

    db.close();

    return NextResponse.json({ users });
  } catch (err: any) {
    console.error('API /api/users error:', err);
    const message = err?.message ?? String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
