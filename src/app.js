// ./src/app.js

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

import ReactRouterDOM from "react-router-dom";
import React, { useState } from "react";
import ReactDOM from "react-dom";

import StoreContent from "./components/StoreContent";
import StoreHeader from "./components/StoreHeader";
import ProductView from "./components/productView";
import ProductCard from "./components/ProductCard";
<<<<<<< HEAD
import Checkout from "./components/Checkout"
import CartDrawer from './components/CartDrawer'
import { DrawerContext } from './DrawerContext'
=======
import CartDrawer from "./components/CartDrawer";
>>>>>>> a1e2467f906ba17480f1fae322755ec635f57020
import InsertBanner from "./components/Banner";
import Footer from "./components/Footer";
import Nav from "./components/Nav";

import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";

import { DrawerContext } from "./DrawerContext";
import variables from "./styles";

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

// Overrides Material-Ui Base Styling
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
  /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

  const [drawer, setDrawer] = useState({
    cart: false,
    account: false,
    explore: false,
    customizeShop: false,
  });

  /*-------------------------------------------------------------- Helper Functions ------------------------------------------------------------------*/

  const toggleDrawer = (anchor) =>
    setDrawer({ ...drawer, [anchor]: !drawer[anchor] });

  /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

  return (
<<<<<<< HEAD
      <ThemeProvider theme={theme}>
        <CssBaseline >
        
          <DrawerContext.Provider value={{ drawer, setDrawer, toggleDrawer }} >

            <div id='app'>
              <Nav />
              <CartDrawer />

              <InsertBanner />
              <StoreHeader />
              <Checkout/>
              <StoreContent />
              <Footer />
            </div>
            
          </DrawerContext.Provider>

      </CssBaseline>
      </ThemeProvider>
=======
    // <div className={ classes.root }>
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
    // </div>
>>>>>>> a1e2467f906ba17480f1fae322755ec635f57020
  );
};

/*-------------------------------------------------------------- Render ------------------------------------------------------------------*/

const app = document.getElementById("root");
ReactDOM.render(<App />, app);
