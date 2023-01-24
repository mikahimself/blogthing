import { testDbConnection } from "../database/db.mjs"

// Test connection
export const testConnection = async (req, res) => {
  const creds = atob(req.headers.authorization)
  const [user, pass] = creds.split(":");
  const db = req.body.database;
  let result = await testDbConnection(db, user, pass);
  
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
};