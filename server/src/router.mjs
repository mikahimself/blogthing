import { Router } from "express";
import { testConnection } from './database/db.mjs';

const router = Router();

router.post("/test", async (req, res) => {
  const creds = atob(req.headers.authorization)
  const [user, pass] = creds.split(":");
  console.log(user, pass)
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
});

export default router;
