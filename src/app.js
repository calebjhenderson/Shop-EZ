// ./src/app.js

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

// React
import ReactRouterDOM from "react-router-dom";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

// Components
import StoreContent from "./components/StoreContent";
import StoreHeader from "./components/StoreHeader";
import CartDrawer from "./components/CartDrawer";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Nav from "./components/Nav";

// Material-UI
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";

// Other packages/modules
import axios from 'axios';

// Local
import { DrawerContext } from "./DrawerContext";
import variables from "./styles";
import LoggedOutDrawer from "./components/LoggedOutDrawer";

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


  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]);
  const [drawer, setDrawer] = useState({
    cart: false,
    accountLoggedOut: false,
    accountLoggedIn: false,
    explore: false,
    customizeShop: false,
  });
  

  // Check if user is logged in and set their cart in state, else check if cart exists for non-user and set cart in state
  // useEffect(() => {
    
  //   const isToken =  localStorage.getItem('token');
  //   const isCart = localStorage.getItem('cart') || (cart && cart.length);

  //   if(user && Object.keys(user).length){setCart(user.cart)}
  //   else if(isToken){
      
  //     // Check if token is valid and if it is, set user and then set cart



  //   }
  //   else if(isCart){
  //     // set cart

  //   }

  // }, [])

  /*-------------------------------------------------------------- Helper Functions ------------------------------------------------------------------*/

  const toggleDrawer = (anchor) =>{
    
    console.log('anchor is ', anchor);
    console.log('drawer[anchor] is' , drawer[anchor]);

    if(anchor === 'accountLoggedOut' && drawer[anchor] === false && drawer.cart === true){
      setDrawer({ ...drawer, [anchor]: !drawer[anchor], cart: false });
    }
    else if(anchor === 'cart' && drawer[anchor] === false && drawer.accountLoggedOut === true){
      setDrawer({ ...drawer, [anchor]: !drawer[anchor], accountLoggedOut: false });
    }
    else{
      setDrawer({ ...drawer, [anchor]: !drawer[anchor] });
    }
  }

  /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

  return (
    // <div className={ classes.root }>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <DrawerContext.Provider value={{ drawer, setDrawer, toggleDrawer }}>
          <div id="app">
            <Nav />
            <CartDrawer />
            <LoggedOutDrawer />

            <Banner />
            <StoreHeader />
            <StoreContent />
            <Footer />
          </div>
        </DrawerContext.Provider>
      </CssBaseline>
    </ThemeProvider>
    // </div>
  );
};

/*-------------------------------------------------------------- Render ------------------------------------------------------------------*/

const app = document.getElementById("root");
ReactDOM.render(<App />, app);
