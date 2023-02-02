import { createTheme } from "@mui/material/styles";
import styled from "@emotion/styled";
let theme = createTheme({
  palette: {
    mode: 'light'
  }
})

const SetupPageRoot = styled('div')`
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
`

export { theme, SetupPageRoot };