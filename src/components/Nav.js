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

import { DrawerContext } from "../DrawerContext";
import variables from "../styles";

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

const {
    themeMain,
    textColor,
    primaryAccent,
    secondaryAccent,
    navHeight,
} = variables;

/*-------------------------------------------------------------- Helper Functions ------------------------------------------------------------------*/

const handleSubmit = () => {};

function Nav() {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

    const { toggleDrawer } = useContext(DrawerContext);

    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles = makeStyles({
        // Nav

        nav: {
            justifyContent: "space-between",
            background: themeMain,
            alignItems: "center",
            height: navHeight,
            diplay: "flex",
            zIndex: 1301,
        },

        navHeader: {
            zIndex: 1301,
        },

        // Logo Area

        leftNav: {
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
        },

        logo: {
            borderRight: `2px solid ${secondaryAccent}`,
            margin: "1rem 1rem 1rem 0.5rem",
            paddingRight: "1rem",
            width: "6rem",
            height: "auto",
        },

        explore: {
            boxShadow: ` 0 1px 4px ${secondaryAccent} `,
            opacity: "92%",
        },

        // Search Area
        mainSearch: {
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
            width: "55vw",
        },

        mainSearchInput: {
            boxShadow: `0 0 4px ${primaryAccent}`,
            borderRadius: "10px",
            fontSize: "1.1rem",
            padding: "0.5rem",
            width: "50vw",
            height: "2rem",
            border: "none",

            "&:focus": {
                outline: "none",
            },
        },
    });

    const classes = useStyles();

    const {
        mainSearchInput,
        mainSearch,
        navHeader,
        leftNav,
        explore,
        logo,
        nav,
    } = classes;

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
                        <ArrowDropDown />
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
                        <SearchIcon />
                    </IconButton>
                </form>

                <div className="nav-buttons">
                    <IconButton
                        color="inherit"
                        aria-label="open account options drawer"
                        onClick={() => {
                            toggleDrawer("accountLoggedOut");
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

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default Nav;
