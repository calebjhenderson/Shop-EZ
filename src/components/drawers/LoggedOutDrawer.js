// ./src/components/LoggedOutdrawer

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

import React, { useContext, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/list";

import { DrawerContext } from "../../DrawerContext";
import variables from "../../styles";

import SignUpAccordion from "./accordions/SignUpAccordion";
import LogInAccordion from "./accordions/LogInAccordion";
import LogOutAccordion from "./accordions/LogInAccordion";
import SettingsAccordion from "./accordions/SettingsAccordion";

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

const { drawerStyling } = variables;

function LoggedOutDrawer() {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

    const { drawer, toggleDrawer } = useContext(DrawerContext);

    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles = makeStyles(drawerStyling);

    const classes = useStyles();

    const {
        drawer: drawerStyle,
        drawerContainer,
        drawerPaper,
        blankSpace,
        wrapper,
        list,
    } = classes;

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

    return (
        <Drawer
            className={drawerStyle}
            anchor="right"
            open={drawer.accountLoggedOut}
            onClose={() => toggleDrawer("accountLoggedOut")}
            classes={{ paper: drawerPaper }}
        >
            <div className={blankSpace}></div>
            <div className={drawerContainer}>
                <div id="accountLoggedOut-drawer" className={wrapper}>
                    <List className={list}>
                        <SignUpAccordion />
                        <LogInAccordion />
                        <SettingsAccordion />
                        <LogOutAccordion />
                    </List>
                </div>
            </div>
        </Drawer>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default LoggedOutDrawer;
