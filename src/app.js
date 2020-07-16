// ./src/app.js

import ReactRouterDOM from "react-router-dom";
import React, { useState } from "react";
import ReactDOM from "react-dom";

import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Typography } from "@material-ui/core";

import StoreContent from "./components/StoreContent";
import StoreHeader from "./components/StoreHeader";
import CartDrawer from "./components/CartDrawer";
import { DrawerContext } from "./DrawerContext";
import InsertBanner from "./components/Banner";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import variables from "./styles";

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
  const [drawer, setDrawer] = useState({
    cart: false,
    account: false,
    explore: false,
    customizeShop: false,
  });

  const useStyles = makeStyles({
    root: {
      display: "flex",
    },
  });

  const classes = useStyles(theme);

  const toggleDrawer = (anchor) =>
    setDrawer({ ...drawer, [anchor]: !drawer[anchor] });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <DrawerContext.Provider value={{ drawer, setDrawer, toggleDrawer }}>
          <div id="app">
            <Nav />
            <CartDrawer />
            <InsertBanner />
            <StoreHeader />
            <StoreContent />
            <Footer />
          </div>
        </DrawerContext.Provider>
      </CssBaseline>
    </ThemeProvider>
  );
};

const app = document.getElementById("root");
ReactDOM.render(<App />, app);
