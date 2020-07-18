// ./src/components/accordions/SignUpAccordion

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

import React, { useState } from "react";

import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import Button from "@material-ui/core/Button";

import BorderedInput from "./inputs/BoderedInput";
import PasswordInput from "./Inputs/PasswordInput";

import variables from "../../../styles"
const { logInAccordionStyling } = variables;

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function SignUpAccordion() {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

    const [expanded, setExpanded] = useState(false);

    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles = makeStyles({
        // Accordions

        accordion: {
            boxShadow: ` 0 0 7px -4px black`,
            paddingRight: "0",
            paddingLeft: "0",
        },

        accordionRoot: {
            background: "rgba(255, 255, 255, 0.75)",
            width: "100%",
        },

        //Accordion Header

        headerTitle: {
            padding: "0 0.7rem",
            fontSize: "1.6rem",
            width: "100%",
        },

        //Accordion Body

        form: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
        },

        submit: {
            width: "40%",
            margin: "0.5rem",
        },
    });

    const classes = useStyles();

    const { accordionRoot, headerTitle, accordion, submit, form } = classes;

    /*-------------------------------------------------------------- Event Handlers ------------------------------------------------------------------*/

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

    return (
        <Accordion
            // @ts-ignore
            expanded={expanded === `panelSignUp`}
            onChange={handleChange(`panelSignUp`)}
            classes={{ root: accordionRoot }}
        >
            <AccordionSummary
                aria-controls={`panelbh-content`}
                id={`panelbh-header`}
                className={accordion}
            >
                <Typography align="center" variant="h3" className={headerTitle}>
                    Sign Up
                </Typography>
            </AccordionSummary>

            <AccordionDetails>
                <form className={form}>
                    <BorderedInput name="First Name" first={true} />
                    <BorderedInput name="Last Name" />
                    <BorderedInput name="E-mail" type="email" />
                    <BorderedInput name="Username" />
                    <BorderedInput name="Password" />
                    <PasswordInput />

                    <Button
                        className={submit}
                        variant="contained"
                        color="secondary"
                    >
                        Sign Up
                    </Button>
                </form>
            </AccordionDetails>
        </Accordion>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default SignUpAccordion;
