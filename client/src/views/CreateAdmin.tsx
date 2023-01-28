import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React from "react";

export function CreateAdmin() {
  const [username, setUsername] = React.useState("admin");
  const [password, setPassword] = React.useState<string | null>(null);

  const onSubmitForm = () => {

  }

  return (
    <Box component="form" onSubmit={onSubmitForm} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          onChange={e => setUsername(e.target.value)}
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
          onChange={e => setPassword(e.target.value)}
          name="password"
          id="admin-user-password"
          inputProps={{
            autocomplete: 'new-password',
            form: {
              autocomplete: 'off',
            },
          }}
          label="Password"
        />
       
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2}}
        >
          Next
        </Button>
      </Box>
  )
}