// ./src/components/Nav.js

import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import ArrowDropDown from "@material-ui/icons/ArrowDropDownCircleOutlined";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import ExploreIcon from "@material-ui/icons/Explore";
import PersonIcon from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge"


import variables from '../styles'
import { DrawerContext } from "../DrawerContext";


const { themeMain, textColor, primaryAccent, secondaryAccent, navHeight } = variables;


const handleSubmit = () => {};

function Nav() {

  const { toggleDrawer } = useContext(DrawerContext);

  const useStyles = (makeStyles({

    // root
  
    root: {
      display: "flex",
    },
  
    // Nav/header
  
    nav: {
      zIndex: 1301,
      background: themeMain,
      diplay: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: navHeight,
    },
  
    navHeader: {
      zIndex: 1301,
    },
  
    leftNav: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      
    },
    
    logo: {
      width: "6rem",
      height: "auto",
      margin: "1rem 1rem 1rem 0.5rem",
      paddingRight: "1rem",
      borderRight: `2px solid ${secondaryAccent}`,
    },
  
    explore: {
      opacity: '92%',
      boxShadow: ` 0 1px 4px ${ secondaryAccent } `
    },
  
    mainSearch: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '55vw'
    },
  
    mainSearchInput: {
      width: '50vw',
      height: '2rem',
      padding: '0.5rem',
      border: 'none',
      borderRadius: '10px',
      boxShadow: `0 0 4px ${ primaryAccent }`,
      fontSize: '1.1rem',
      '&:focus': {
        outline: 'none'
      }
    },
  
    searchAll: {
      color: textColor,
    },
  }));

  const classes = useStyles();

  const {
    nav,
    logo,
    mainSearch,
    mainSearchInput,
    leftNav,
    explore,
    navHeader
  } = classes;

  return (
<<<<<<< HEAD
    <AppBar position='static' classes={{ root: navHeader }}>
=======
    <AppBar position='static' classes={{ root: navHeader }} >
>>>>>>> e9ce69cd39652f5022c2e13e3e5b9cc16a064fd8
      <Toolbar className={ nav }>
        <div className={ leftNav }>
          <a href="#">
            <img
              src="/assets/logo.png"
              alt="A pastel lavendar capital E and Z in a filled circle with pastel water colors"
              className={ logo }
            />
          </a>
          <Button
            className={ explore }
            variant="contained"
            color="secondary"
            startIcon={<ExploreIcon />}
          >
            Explore
          </Button>
        </div>

        <form className={ mainSearch } onSubmit={ handleSubmit }>
          <IconButton aria-label="main search filters" color="inherit">
            <ArrowDropDown />
          </IconButton>
          <input
            type="search"
            placeholder="search"
            className={ mainSearchInput }
          ></input>
          <IconButton aria-label="main search filters" color="inherit">
            <SearchIcon />
          </IconButton>
        </form>

        <div className="nav-buttons">
          <IconButton
            color="inherit"
            aria-label="open account options drawer"
            onClick={() => {
              toggleDrawer("cart");
            }}
          >
            <PersonIcon />
          </IconButton>

          <IconButton
            aria-label="open cart drawer"
            color="inherit"
            onClick={() => {
              toggleDrawer("cart");
            }}
          >
            <Badge badgeContent={4} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
