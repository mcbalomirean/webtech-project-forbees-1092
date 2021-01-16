import { createMuiTheme } from "@material-ui/core/styles";
// Custom theme modyfing primary and secondary palette colors

export const notebeeTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffa000 ",
    },
    secondary: {
      main: "#81d4fa",
    },
  },
});

export default notebeeTheme;
