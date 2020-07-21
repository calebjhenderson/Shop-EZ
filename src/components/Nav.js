// ./src/components/Nav.js

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

import React, { useContext } from "react";

import ArrowDropDown from "@material-ui/icons/ArrowDropDownCircleOutlined";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import ExploreIcon from "@material-ui/icons/Explore";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";

// Context
import { DrawerContext } from "../DrawerContext";

// Styling
import variables from "../styles";
const { navStyling } = variables;

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function Nav() {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

    const { toggleDrawer } = useContext(DrawerContext);

    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles = makeStyles(navStyling);

    const classes = useStyles();

    const {
        mainSearchInput,
        mainSearch,
        navHeader,
        leftNav,
        explore,
        icons,
        logo,
        nav,
    } = classes;

    /*-------------------------------------------------------------- Event Handlers ------------------------------------------------------------------*/

    const handleSubmit = () => {};

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

    return (
        <AppBar position="static" classes={{ root: navHeader }}>
            <Toolbar className={nav}>
                <div className={leftNav}>
                    <a href="#">
                        <img
                            src="/assets/logo.png"
                            alt="A pastel lavendar capital E and Z in a filled circle with pastel water colors"
                            className={logo}
                        />
                    </a>
                    <Button
                        className={explore}
                        variant="contained"
                        color="secondary"
                        startIcon={<ExploreIcon />}
                        disabled
                    >
                        Explore
                    </Button>
                </div>

                <form className={mainSearch} onSubmit={handleSubmit}>
                    <IconButton
                        aria-label="main search filters"
                        color="inherit"
                    >
                        <ArrowDropDown className={icons} />
                    </IconButton>
                    <input
                        type="search"
                        placeholder="search (under construction)"
                        className={mainSearchInput}
                        disabled
                    ></input>
                    <IconButton
                        aria-label="main search filters"
                        color="inherit"
                    >
                        <SearchIcon className={icons} />
                    </IconButton>
                </form>

                <div className="nav-buttons">
                    <IconButton
                        color="inherit"
                        aria-label="open account options drawer"
                        onClick={() => {
                            toggleDrawer("account");
                        }}
                    >
                        <PersonIcon className={icons} />
                    </IconButton>

                    <IconButton
                        aria-label="open cart drawer"
                        color="inherit"
                        onClick={() => {
                            toggleDrawer("cart");
                        }}
                    >
                        <Badge badgeContent={4} color="secondary">
                            <ShoppingCartIcon className={icons} />
                        </Badge>
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default Nav;
