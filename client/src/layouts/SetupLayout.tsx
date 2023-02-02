import { ThemeProvider } from "@emotion/react";
import { Paper } from "@mui/material";
import { theme, SetupPageRoot } from "./SetupTheme";

export default function SetupLayout(props: any) {
  const { children } = props;

  return (
    <ThemeProvider theme={theme}>
      <SetupPageRoot>
        <Paper elevation={1} sx={{ p: 4}}>
          { children }
        </Paper>
      </SetupPageRoot>
    </ThemeProvider>
  )
}