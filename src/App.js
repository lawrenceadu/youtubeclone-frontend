import React from "react";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";

import { darkTheme } from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";
import Router from "./Router";

import "react-toastify/dist/ReactToastify.css";

export default () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <ToastContainer
        autoClose={2500}
        position="top-right"
        closeButton={false}
      />
      <Router />
    </ThemeProvider>
  );
};
