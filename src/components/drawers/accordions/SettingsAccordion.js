// ./src/components/accordions/SettingsAccordion

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

import React, { useState } from "react";

import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import ListItem from "@material-ui/core/ListItem";

import variables from "../../../styles";
const { accordionStyling } = variables;

import axios from "axios";

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function SettingsAccordion() {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

    const [expanded, setExpanded] = useState(false);

    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles = makeStyles(accordionStyling);
    const classes = useStyles();
    const {
        accordionRoot,
        headerTitle,
        accordion,
        settings,
        comingSoon,
        listItem,
    } = classes;

    /*-------------------------------------------------------------- Event Handlers ------------------------------------------------------------------*/

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

    return (
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
                        <p className={comingSoon}>Coming Soon!</p>
                    </div>
                </AccordionDetails>
            </Accordion>
        </ListItem>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default SettingsAccordion;
