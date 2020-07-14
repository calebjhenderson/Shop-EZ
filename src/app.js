// ./src/app.js

import React from "react";
import ReactDOM from "react-dom";
import ReactRouterDOM from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

import Nav from "./components/Nav";
import StoreContent from "./components/StoreContent";
import StoreHeader from "./components/StoreHeader";
import Footer from "./components/Footer";
import InsertBanner from "./components/Banner";
import ProductView from "./components/productView";
import { Typography } from "@material-ui/core";
import ProductCard from "./components/ProductCard";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Nav />
      <InsertBanner />
      <StoreHeader />
      <StoreContent />
      <Footer />
    </>
  );
};

const app = document.getElementById("root");
ReactDOM.render(<App />, app);
