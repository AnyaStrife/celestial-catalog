import { createTheme } from "@mui/material";

// “Space” dark theme, shared by the app and Storybook.
export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#9fa8ff" },
    background: { default: "#0b0d1a", paper: "#151a2e" },
  },
});
