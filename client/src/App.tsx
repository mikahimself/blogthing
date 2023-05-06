import { Setup } from "./views/Setup"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import SetupLayout from "./layouts/SetupLayout";

const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <SetupLayout>
          <Setup />
        </SetupLayout>
      </Container>
    </ThemeProvider>
  )
}