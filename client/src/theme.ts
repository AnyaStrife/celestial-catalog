import { createTheme } from "@mui/material";

// Thème sombre « espace », partagé par l'appli et Storybook.
export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#9fa8ff" },
    background: { default: "#0b0d1a", paper: "#151a2e" },
  },
});
