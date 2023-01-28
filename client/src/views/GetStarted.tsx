import { Avatar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import StorageIcon from '@mui/icons-material/Storage';
import { CreateAdmin } from "./CreateAdmin";
import React from "react";

export function GetStarted() {
  const [connectionOk, setConnectionOk] = React.useState(false);
  const [database, setDatabase] = React.useState("")
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    testConnection()
  }
  const fieldsOk = () => { return (database.length > 0 && username.length > 0 && password.length > 0) };

  const testConnection = async () => {
    const hash = btoa(`${username}:${password}`);
    const response = await fetch("http://localhost:3000/api/1/test", {
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
    setConnectionOk(result);
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <StorageIcon />
      </Avatar>
      <Typography component="h1" variant="h5">Get started</Typography>

      <Box component="form" onSubmit={onSubmitForm} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          onChange={e => setDatabase(e.target.value)}
          name="database"
          id="database-address-field"
          label="Database address"
          />
        <TextField
          margin="normal"
          required
          fullWidth
          onChange={e => setUsername(e.target.value)}
          name="user"
          id="database-user-field"
          label="Database user"
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
            autocomplete: 'new-password',
            form: {
              autocomplete: 'off',
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
        <Button
          type="submit"
          fullWidth
          disabled={!connectionOk}
          variant="contained"
          sx={{ mt: 3, mb: 2}}
        >
          Next
        </Button>
      </Box>

      <CreateAdmin/>
      
    </Box>
  )
}