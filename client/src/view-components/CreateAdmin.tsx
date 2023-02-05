import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React from "react";

export function CreateAdmin(props:any) {
  const [username, setUsername] = React.useState("admin");
  const [password, setPassword] = React.useState<string>("");

  const onChangeFields = (e: any) => {
    props.setCredsOk(username.length > 0 && password.length > 0)
  }

  const onSubmitPW = async (e: any) => {
    e.preventDefault();
    const hash = window.btoa(`${username}:${password}`);
    const response = await fetch("http://localhost:3000/api/1/setup", {
      method: "POST",
      headers: {
        "Authorization": `${hash}`,
      }
    });
    const responseJson = await response.json();
    console.log(responseJson)
  }

  return (
    <Box component="form" onSubmit={onSubmitPW} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          onChange={e => {setUsername(e.target.value); onChangeFields(e)}}
          name="user"
          id="admin-user-field"
          label="Admin username"
          defaultValue="admin"
        />
        <TextField
          margin="normal"
          required
          type="password"
          fullWidth
          onChange={e => {setPassword(e.target.value); onChangeFields(e)}}
          name="password"
          id="admin-user-password"
          inputProps={{
            autoComplete: 'new-password',
            form: {
              autoComplete: 'off',
            },
          }}
          label="Password"
        />
      </Box>
  )
}