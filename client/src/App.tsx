import { GetStarted } from "./views/GetStarted"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <GetStarted />
      </Container>
    </ThemeProvider>
  )
}