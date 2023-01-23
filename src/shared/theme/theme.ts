import { createTheme } from "@mui/material/styles"

// THIS OBJECT SHOULD BE SIMILAR TO ../tailwind.config.js
const themeConstants = {
  paper: "#FAFAFB",
  primary: {
    main: "#024ED5"
  },
  breakpoints: {
    xs: 0,
    mb: 350,
    sm: 640,
    md: 768,
    lg: 1280,
    xl: 1536
  }
}

// Check here for more configurations https://material-ui.com/customization/default-theme/
const theme = createTheme({
  palette: {
    primary: themeConstants.primary,
    background: { paper: themeConstants.paper }
  },
  breakpoints: {
    values: themeConstants.breakpoints
  }
})

export { theme }
