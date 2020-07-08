// ./src/app.js

import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouterDOM from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import Nav from './components/Nav';

const App = () => {
  return (
    <>
      <CssBaseline />
        <Nav />
    </>
  );
}


const app = document.getElementById("root");
ReactDOM.render(<App />, app);