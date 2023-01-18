import express, { query } from "express";
import bodyParser from "body-parser";
import { testConnection } from './database/db.mjs';

const app = express();
app.use(express.static('build'));
app.use(bodyParser.json())
app.post("/api/1/test", async (req, res) => {
  const creds = atob(req.headers.authorization)
  const [user, pass] = creds.split(":");
  const db = req.body.database;
  let result = await testConnection(db, user, pass);
  
  if (result.status) {
    res.json({
      status: "Success",
      db,
      user,
      pass
    })
  } else {
    res.json({
      status: "Failure",
      db,
      user,
      pass,
      message: result.message
    })
  }
  console.log("Connection works: ", result);
});

app.listen(3000, () => {
  console.log("App listening on http://localhost:3000")
});