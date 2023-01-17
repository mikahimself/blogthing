import express, { query } from "express";
import { testConnection } from './database/db.mjs';

const app = express();
app.use(express.static('build'));
app.use(express.json())
app.post("/api/1/test", async (req, res) => {
  const creds = atob(req.headers.authorization)
  const [user, pass] = creds.split(":");
  let result = await testConnection("localhost", user, pass);
  console.log("Connection works: ", result);
})

app.listen(3000, () => {
  console.log("App listening on http://localhost:3000")
})
let test = await testConnection("localhost", "postgres", "lol");