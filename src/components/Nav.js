// ./src/components/Nav.js

<<<<<<< HEAD
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import styles from "../styles";
import ArrowDropDown from "@material-ui/icons/ArrowDropDownCircleOutlined";
import PersonIcon from "@material-ui/icons/Person";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ExploreIcon from "@material-ui/icons/Explore";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const { nav, logo, mainSearch, mainSearchInput, leftNav, explore } = styles;

const handleSubmit = () => {};
=======
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import styles from '../styles';
import ArrowDropDown from '@material-ui/icons/ArrowDropDownCircleOutlined';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ExploreIcon from '@material-ui/icons/Explore';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';

const { nav, logo, mainSearch, mainSearchInput, leftNav, explore } = styles;

const handleSubmit = () => {

}

const handleClose = () => {

}
>>>>>>> d9bd4816fb2161bc8e69075331e9a8179d2ff091

const handleClose = () => {};

function Nav() {
  return (
<<<<<<< HEAD
    <AppBar className="nav" position="static">
      <Toolbar className="nav-toolbar" style={nav}>
        <div style={leftNav}>
          <a href="#">
            <img
              src="/assets/logo.png"
              alt="A pastel lavendar capital E and Z in a filled circle with pastel water colors"
              style={logo}
            />
          </a>
          <Button
            style={explore}
            variant="contained"
            color="secondary"
            startIcon={<ExploreIcon />}
          >
            Explore
          </Button>
        </div>

        <form style={mainSearch} onSubmit={handleSubmit}>
          <IconButton aria-label="main search filters" color="inherit">
            <ArrowDropDown />
          </IconButton>
          <input
            type="search"
            placeholder="search"
            style={mainSearchInput}
          ></input>
          <IconButton aria-label="main search filters" color="inherit">
            <SearchIcon />
          </IconButton>
        </form>

        <div className="nav-buttons">
          <IconButton color="inherit" aria-label="open cart drawer">
            <PersonIcon />
          </IconButton>
          <IconButton aria-label="open account options drawer" color="inherit">
            <ShoppingCartIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
=======
      <AppBar className='nav' position="static">
        <Toolbar className='nav-toolbar' style={ nav }>

          <div style={ leftNav }>
            <a href='#' >
              <img src='/assets/logo.png' alt='A pastel lavendar capital E and Z in a filled circle with pastel water colors' style={ logo } />
            </a>
            <Menu
              keepMounted
              onClose={handleClose}
              >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
            <Button style={ explore } variant="contained" color="secondary" startIcon={<ExploreIcon />} >
              Explore
            </Button>
          </div>

          <form style={ mainSearch } onSubmit={handleSubmit}>
            <IconButton aria-label="main search filters" color="inherit">
              <ArrowDropDown />
            </IconButton>
            <input type='search' placeholder='search' style={ mainSearchInput }>
            </input>
            <IconButton aria-label="main search filters" color="inherit">
              <SearchIcon />
            </IconButton>
          </form>


          <div className="nav-buttons">
            
            <IconButton color="inherit" aria-label="open cart drawer">
              <PersonIcon />
            </IconButton>
            <IconButton aria-label="open account options drawer" color="inherit">
              <ShoppingCartIcon />
            </IconButton>

          </div>
        </Toolbar>
      </AppBar>
>>>>>>> d9bd4816fb2161bc8e69075331e9a8179d2ff091
  );
}

export default Nav;
