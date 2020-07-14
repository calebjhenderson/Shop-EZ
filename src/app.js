// ./src/app.js

import React from "react";
import ReactDOM from "react-dom";
import ReactRouterDOM from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";
import styles from "./styles";
import { ThemeProvider } from "@material-ui/core/styles";
import Nav from "./components/Nav";
import StoreContent from "./components/StoreContent";
import StoreHeader from "./components/StoreHeader";
import Footer from "./components/Footer";
import InsertBanner from "./components/Banner";
import ProductView from "./components/productView";
import { Typography } from "@material-ui/core";
import ProductCard from "./components/ProductCard";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#3c2e75",
      main: "#080849",
      dark: "#000023",
    },
    secondary: {
      light: "#e5adff",
      main: "#b17de8",
      dark: "#7f4fb5",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Nav />
      <InsertBanner />
      <StoreHeader />
      <StoreContent />
      <Footer />
    </ThemeProvider>
  );
};

const app = document.getElementById("root");
ReactDOM.render(<App />, app);
