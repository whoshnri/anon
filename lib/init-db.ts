import db from "./db.ts"

async function init() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      user TEXT NOT NULL,
      prompt TEXT DEFAULT '',
      content TEXT NOT NULL,
      ip TEXT DEFAULT 'unknown',
      timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('✅ Tables created');
}

init();
