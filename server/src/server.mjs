import setupDB from './database/setup.mjs';
import { testConnection } from './database/db.mjs';

//setupDB();
let test = await testConnection("localhost", "postgres", "lol");