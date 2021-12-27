import * as React from "react";
import { CookiesProvider } from "react-cookie";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { deepmerge } from '@mui/utils';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const muiTheme = createTheme();
const chakraTheme = extendTheme();
const theme = deepmerge(chakraTheme, muiTheme);

ReactDOM.render(
  <BrowserRouter>
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <ChakraProvider theme={theme} resetCSS>
          <App />
        </ChakraProvider>
      </ThemeProvider>
    </CookiesProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
