import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React from "react";

export default function TestConnection(props: any) {
  const [database, setDatabase] = React.useState("localhost")
  const [username, setUsername] = React.useState("postgres")
  const [password, setPassword] = React.useState("")
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    testConnection()
  }

  const testConnection = async () => {
    const hash = window.btoa(`${username}:${password}`);
    const response = await fetch("/api/1/test", {
      method: 'POST',
      headers: {
        "Authorization": `${hash}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"db": database})
    })
    const responseJson = await response.json();
    console.log(responseJson)
    const result = responseJson.status === "Success"
    props.setConnectionOk(result);
  }

  const fieldsOk = () => { return (database.length > 0 && username.length > 0 && password.length > 0) };
  return (
    <Box component="form" onSubmit={onSubmitForm} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          onChange={e => setDatabase(e.target.value)}
          name="database"
          type="url"
          id="database-address-field"
          label="Database address"
          value={database}
          />
        <TextField
          margin="normal"
          required
          fullWidth
          onChange={e => setUsername(e.target.value)}
          name="user"
          id="database-user-field"
          label="Database user"
          value={username}
        />
        <TextField
          margin="normal"
          required
          type="password"
          fullWidth
          onChange={e => setPassword(e.target.value)}
          name="password"
          id="database-user-password"
          label="User password"
          inputProps={{
            autoComplete: 'new-password',
            form: {
              autoComplete: 'off',
            },
          }}
        />
        <Button
          disabled={!fieldsOk()}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          >
          Test Connection
        </Button>
      </Box>
  )
}