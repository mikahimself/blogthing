import pg from 'pg';

export const pool = new pg.Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_USER_PW,
  database: process.env.DB_NAME ? process.env.DB_NAME : 'blogthing'
})
