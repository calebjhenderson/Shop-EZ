// ./src/app.js

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ReactRouterDOM from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import variables from './styles';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { DrawerContext } from './DrawerContext'

import Nav from './components/Nav';
import CartDrawer from './components/CartDrawer'






const theme = createMuiTheme({

  palette: {
    primary: {
      light: '#3c2e75',
      main: '#080849',
      dark: '#000023'
    },
    secondary: {
      light: '#e5adff',
      main: '#b17de8',
      dark: '#7f4fb5'
    },
  },

});


const App = () => {


  const [drawer, setDrawer] = useState({
    left: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => setDrawer({ ...drawer, [anchor]: open });



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline >
      
        <DrawerContext.Provider value={{ drawer, setDrawer, toggleDrawer }} >

          <div id='app'>
            <Nav />
            <CartDrawer />
          </div>
          
        </DrawerContext.Provider>

      </CssBaseline>
    </ThemeProvider>
  );
}


const app = document.getElementById("root");
ReactDOM.render(<App />, app);