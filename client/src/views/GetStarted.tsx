import { Avatar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import StorageIcon from '@mui/icons-material/Storage';

export function GetStarted() {
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

      <Box component="form" onSubmit={() => {}} noValidate sx={{ mt: 2 }}>
        <TextField
          required
          fullWidth
          id="server-address-field"
          label="Server address"
          />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          >
          Test connection
        </Button>
      </Box>
    </Box>
  )
}