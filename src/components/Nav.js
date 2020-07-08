// ./src/components/Nav.js

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';



function Nav() {

  return (
      <AppBar className='nav' position="static">
        <Toolbar className='nav-toolbar'>
          <Typography className="title" variant="h5" noWrap>
            Material-UI
          </Typography>

          <div nav-buttons>
            
            <IconButton
              edge="start"
              className="nav-menu-button"
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <IconButton className='nav-search-button' aria-label="search" color="inherit">
              <SearchIcon />
            </IconButton>

          </div>
        </Toolbar>
      </AppBar>
  );
}

export default Nav;