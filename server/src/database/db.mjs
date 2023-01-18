import pg from 'pg';

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_USER_PW,
  database: process.env.DB_NAME ? process.env.DB_NAME : 'blogthing'
})

async function testConnection(host, user, password) {
  const client = new pg.Client({
    host,
    user,
    password
  });
  const response = await client.connect()
    .then(() => { return { status: true }})
    .catch((err) =>  { return { status: false, message: err }});
  client.end();
  return response;
}

export { testConnection }