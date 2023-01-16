import express, { query } from "express";
import { testConnection } from './database/db.mjs';

const app = express();
app.use(express.static('build'));
app.get("/api/1/test", async (req, res) => {
  let result = await testConnection(req.query.db, req.query.user, req.query.pw);
  console.log("Connection works: ", result);
})

app.listen(3000, () => {
  console.log("App listening on http://localhost:3000")
})
let test = await testConnection("localhost", "postgres", "lol");