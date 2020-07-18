// ./src/components/LoggedOutdrawer

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

import React, { useContext, useState } from "react";

import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import ListItem from "@material-ui/core/ListItem";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/list";

import { DrawerContext } from "../../DrawerContext";
import variables from "../../styles";

import SignUpAccordion from "./accordions/SignUpAccordion";
import LogInAccordion from "./accordions/LogInAccordion";

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

const { drawerWidth, textColor, navHeight, loggedOutDrawerStyling } = variables;

function LoggedOutDrawer() {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

    const { drawer, toggleDrawer } = useContext(DrawerContext);
    const [expanded, setExpanded] = useState(false);
    const [signUpValues, setSignUpValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        showPassword: false,
    });

    const [logInValues, setLogInValues] = useState({
        username: "",
        password: "",
        showPassword: false,
    });
    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles = makeStyles(loggedOutDrawerStyling);

    const classes = useStyles();

    const {
        drawer: drawerStyle,
        drawerContainer,
        accordionRoot,
        headerTitle,
        drawerPaper,
        blankSpace,
        comingSoon,
        accordion,
        settings,
        listItem,
        wrapper,
        list,
    } = classes;

    /*-------------------------------------------------------------- Event Handlers ------------------------------------------------------------------*/

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleClickShowPassword = () => {
        setSignUpValues({
            ...signUpValues,
            showPassword: !signUpValues.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSignUpInput = (prop) => (event) => {
        setSignUpValues({ ...signUpValues, [prop]: event.target.value });
    };

    const handleLogInInput = (prop) => (event) => {
        setLogInValues({ ...logInValues, [prop]: event.target.value });
    };

    const handleSignUpSubmit = () => {};

    const handleLogInSubmit = () => {};

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
                        <ListItem className={listItem}>
                            <SignUpAccordion />
                        </ListItem>

                        <ListItem className={listItem}>
                            <LogInAccordion />
                        </ListItem>

                        <ListItem className={listItem}>
                            <Accordion
                                // @ts-ignore
                                expanded={expanded === `panelSettings`}
                                onChange={handleChange(`panelSettings`)}
                                classes={{ root: accordionRoot }}
                            >
                                <AccordionSummary
                                    aria-controls={`paneldh-content`}
                                    id={`panelbh-header`}
                                    className={accordion}
                                >
                                    <Typography
                                        align="center"
                                        variant="h3"
                                        className={headerTitle}
                                    >
                                        Settings
                                    </Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <div className={settings}>
                                        <p className={comingSoon}>
                                            Coming Soon!
                                        </p>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </ListItem>
                    </List>
                </div>
            </div>
        </Drawer>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default LoggedOutDrawer;
