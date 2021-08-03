import { createTheme } from "@material-ui/core";
//Editar color de NavBar
const theme = createTheme({
  palette:{
    primary: {
        main: '#0033A0',
      },
      secondary: {
        main: '#00E1CD',
        contrastText: '#fff',
      },
    }
})
export default theme;