// ./src/components/accordions/LogOutAccordion.js

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

import React, { useState } from "react";

import AccordionSummary from "@material-ui/core/AccordionSummary";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import ListItem from "@material-ui/core/ListItem";

import variables from "../../../styles";
const { accordionStyling } = variables;

import axios from "axios";

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function LogOutAccordion() {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

    const [expanded, setExpanded] = useState(false);

    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles = makeStyles(accordionStyling);
    const classes = useStyles();
    const { accordionRoot, headerTitle, accordion, logOut, listItem } = classes;

    /*-------------------------------------------------------------- Event Handlers ------------------------------------------------------------------*/

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleLogOut = () => {
        console.log("logging out...");
        localStorage.setItem("token", "");
        console.log("finished logging out");
    };

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

    return (
        <ListItem className={listItem}>
            <Accordion
                // @ts-ignore
                expanded={expanded === `panelLogIn`}
                onChange={handleChange(`panelLogIn`)}
                classes={{ root: accordionRoot }}
            >
                <AccordionSummary
                    aria-controls={`panelbh-content`}
                    id={`panelbh-header`}
                    className={`${accordion} ${logOut}`}
                    onClick={handleLogOut}
                >
                    <Typography
                        align="center"
                        variant="h3"
                        className={headerTitle}
                    >
                        Log Out
                    </Typography>
                </AccordionSummary>
            </Accordion>
        </ListItem>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default LogOutAccordion;
