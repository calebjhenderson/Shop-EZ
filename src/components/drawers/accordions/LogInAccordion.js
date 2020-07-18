// ./src/components/accordions/LogInUpAccordion

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
import variables from "../../../styles";
const { logInAccordionStyling } = variables;

import axios from "axios";

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function LogInAccordion() {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

    const [expanded, setExpanded] = useState(false);
    const [loggedInValues, setLoggedInValues] = useState({
        username: "",
        password: "TestPassword",
    });

    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles = makeStyles(logInAccordionStyling);
    const classes = useStyles();
    const { accordionRoot, headerTitle, accordion, submit, form } = classes;

    /*-------------------------------------------------------------- Event Handlers ------------------------------------------------------------------*/

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleInput = (key) => (event) => {
        setLoggedInValues({ ...loggedInValues, [key]: event.target.value });
    };

    const handleLogIn = async () => async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const token = await axios.post("/users/login", {
            username: loggedInValues.username,
            password: loggedInValues.password,
        });

        console.log("token is ", token);
    };

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

    console.log("password is ", loggedInValues.password);
    return (
        <Accordion
            // @ts-ignore
            expanded={expanded === `panelLogIn`}
            onChange={handleChange(`panelLogIn`)}
            classes={{ root: accordionRoot }}
        >
            <AccordionSummary
                aria-controls={`panelbh-content`}
                id={`panelbh-header`}
                className={accordion}
            >
                <Typography align="center" variant="h3" className={headerTitle}>
                    Log In
                </Typography>
            </AccordionSummary>

            <AccordionDetails>
                <form className={form} onSubmit={handleLogIn}>
                    <BorderedInput
                        name="Username"
                        first={true}
                        value={loggedInValues.username}
                        onChange={handleInput("username")}
                    />
                    <PasswordInput
                        value={loggedInValues.password}
                        onChange={(e) =>
                            setLoggedInValues({
                                ...loggedInValues,
                                ["password"]: e.target.value,
                            })
                        }
                    />

                    <Button
                        className={submit}
                        variant="contained"
                        color="secondary"
                    >
                        Log In
                    </Button>
                </form>
            </AccordionDetails>
        </Accordion>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default LogInAccordion;
