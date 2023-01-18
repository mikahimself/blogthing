import { Avatar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import StorageIcon from '@mui/icons-material/Storage';
import React from "react";

export function GetStarted() {
  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const formData = {
      database: data.get("database"),
      user: data.get("user"),
      password: data.get("password")
    };
    testConnection(formData)
  }

  const testConnection = async (data: any) => {
    const hash = btoa(`${data.user}:${data.password}`);
    const response = await fetch("http://localhost:3000/api/1/test", {
      method: 'POST',
      headers: {
        "Authorization": `${hash}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"db": data.database})
    })
    const responseJson = await response.json();
    console.log(responseJson)
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
          name="database"
          id="database-address-field"
          label="Database address"
          />
        <TextField
          margin="normal"
          required
          fullWidth
          name="user"
          id="database-user-field"
          label="Database user"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          id="database-user-password"
          label="User password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          >
          Connect
        </Button>
      </Box>
    </Box>
  )
}