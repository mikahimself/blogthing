import express, { query } from "express";
import bodyParser from "body-parser";
import router from './router.mjs';

const app = express();
app.use(express.static('build'));
app.use(bodyParser.json())
app.use("/api/1", router);

app.listen(3000, () => {
  console.log("App listening on http://localhost:3000")
});