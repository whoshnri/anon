import { Pool, QueryResult } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // for Neon or Render with SSL
  },
});

export default {
  query: (
    text: string,
    params?: (string | number | boolean | null)[]
  ): Promise<QueryResult> => pool.query(text, params),
};
