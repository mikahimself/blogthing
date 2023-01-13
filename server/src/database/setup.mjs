import pg from 'pg';

async function createDB() {
  const dbName = process.env.DB_NAME || 'blogthing';
  const client = new pg.Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_USER_PW
  })

  // Connect and check if db exists. If not, create new.
  client.connect()
    .then(() => console.log('connected'))
    .catch(() => console.error('connection error'))

  let testDB = await client.query(`SELECT datname FROM pg_catalog.pg_database WHERE lower(datname) = lower('${dbName}')`);
  
  if (testDB.rows.length === 0) {
    let result = await client.query(`CREATE DATABASE ${dbName}`)
      .then((res) => res)
      .catch((e) => console.error(e));
    if (!result.rows) { 
      client.end();
      return false;
    }
  };
  client.end();
  return true;
}

async function createTables() {
  const client = new pg.Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_USER_PW,
    database: process.env.DB_NAME || 'blogthing'
  })

  const result = client.connect()
    .then(() => console.log("Connected to blogthing database"))
    .catch((e) => console.error("Error connecting to blogthing database: ", e))

  let createUserTabe = await client.query(`
    CREATE TABLE IF NOT EXISTS blog_user (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      firstName VARCHAR ( 50 ) NOT NULL,
      lastName VARCHAR ( 50 ) NOT NULL,
      mobile VARCHAR ( 20 ) NULL,
      email VARCHAR ( 100 ) NULL,
      pwHash VARCHAR ( 32 ) NOT NULL,
      registeredOn TIMESTAMPTZ NOT NULL,
      lastLogin TIMESTAMPTZ NULL DEFAULT NULL,
      intro VARCHAR ( 100 ) NULL DEFAULT NULL,
      profile TEXT NULL DEFAULT NULL )
  `)
    .then((res) => res)
    .catch((e) => console.error("Failed to create user table: ", e))
  let createPostTable = await client.query(`
      CREATE TABLE IF NOT EXISTS post (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        author_id INTEGER REFERENCES blog_user(id) ON DELETE NO ACTION,
        parent_id INTEGER NULL DEFAULT NULL,
        title VARCHAR ( 100 ) NOT NULL,
        meta_title VARCHAR ( 100 ) NOT NULL,
        slug VARCHAR ( 100 ) NOT NULL,
        summary VARCHAR ( 255 ) NOT NULL,
        published BOOLEAN NOT NULL DEFAULT FALSE,
        created_on TIMESTAMPTZ NOT NULL,
        updated_on TIMESTAMPTZ NULL DEFAULT NULL,
        published_on TIMESTAMPTZ NULL DEFAULT NULL,
        content TEXT NULL DEFAULT NULL
      )
  `)
    .then((res) => res)
    .catch((e) => console.error('Failed to create table "post": ', e))
  console.log(createPostTable);

  const createCategoryTable = await client.query(`
    CREATE TABLE IF NOT EXISTS category (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      parent_id INTEGER NULL DEFAULT NULL,
      title VARCHAR ( 75 ) NOT NULL,
      meta_title VARCHAR ( 100 ) NULL DEFAULT NULL,
      slug VARCHAR ( 100 ) NOT NULL,
      content TEXT NULL DEFAULT NULL
    )
  `)
    .then((res) => res)
    .catch((e) => console.error('Failed to create category table: ', e))

  console.log(createCategoryTable)

  const createPostCategoryTable = await client.query(`
    CREATE TABLE IF NOT EXISTS post_category (
      post_id INTEGER REFERENCES post(id) ON DELETE NO ACTION,
      category_id INTEGER REFERENCES category(id) ON DELETE NO ACTION,
      PRIMARY KEY (post_id, category_id)
    )
  `)
    .then((res) => res)
    .catch((e) => console.error('Failed to create post category table: ', e))

  client.end();
}

async function setupDB() {
  let db = await createDB();
  console.log("DB created: ", db);
  if (db) {
    createTables();
  }
}


export default setupDB;