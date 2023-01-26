import pg from "pg";

// Test connection
export const testConnection = async (req, res) => {
  const creds = atob(req.headers.authorization)
  const [user, password] = creds.split(":");
  const host = req.body.database;
  const client = new pg.Client({ host, user, password });
  const response = await client.connect()
    .then(() => { return { status: true }})
    .catch((err) =>  { return { status: false, message: err }});
  client.end();
  
  if (response.status) {
    res.json({ status: "Success" })
  } else {
    res.json({ status: "Failure", message: response.message })
  }
};