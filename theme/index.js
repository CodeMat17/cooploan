import { extendTheme } from "@chakra-ui/react";
// import "@fontsource/babylonica/400.css";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
    // font1: `"Babylonica",
    // sans-serif`,
  
  },
});

export default theme;
