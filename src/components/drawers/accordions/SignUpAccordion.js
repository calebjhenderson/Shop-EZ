// ./src/components/accordions/SignUpAccordion

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

import React, { useState } from "react";

import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";

import BorderedInput from "./inputs/BoderedInput";
import PasswordInput from "./Inputs/PasswordInput";

import variables from "../../../styles";
const { accordionStyling } = variables;

import axios from "axios";

import SignUpModal from "./SignUpAccModal.js";
import { Container } from "@material-ui/core";

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function SignUpAccordion() {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

    const [expanded, setExpanded] = useState(false);
    const [signUpValues, setSignUpValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        showPassword: false,
    });
    const [submit, setSubmit] = useState(false);
    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles = makeStyles(accordionStyling);

    const classes = useStyles();

    const {
        accordionRoot,
        headerTitle,
        accordion,
        submit: submitStyle,
        form,
        listItem,
    } = classes;

    /*-------------------------------------------------------------- Event Handlers ------------------------------------------------------------------*/

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleSignUp = async (e) => {
        event.preventDefault();
        event.stopPropagation();
        console.log("handleSignUp here");

        try {
            const { data } = await axios.post("/api/users/register", {
                firstName: signUpValues.firstName,
                lastName: signUpValues.lastName,
                email: signUpValues.email,
                username: signUpValues.username,
                password: signUpValues.password,
                role: "user",
            });

            if (data.messageName === "UserAlreadyExists") {
                console.log("Username or Email Exists");
            } else if (data.messageName === "UserCreated") {
                console.log("It worked");
                localStorage.setItem("token", data.token);

                setSignUpValues({
                    firstName: "",
                    lastName: "",
                    email: "",
                    username: "",
                    password: "",
                });
                setSubmit(true);
            } else {
                console.log("An error has occurred.");
            }
        } catch (err) {
            console.error(
                "Error signing up in user @handleSignUp in SignupAccordion.jsß",
                err
            );
        }
    };

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/
    console.log("submit", submit);
    return (
        <ListItem className={listItem}>
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
                    <Typography
                        align="center"
                        variant="h3"
                        className={headerTitle}
                    >
                        Sign Up
                    </Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <form className={form} onSubmit={(e) => handleSignUp(e)}>
                        <BorderedInput
                            name="First Name"
                            first={true}
                            value={signUpValues.firstName}
                            onChange={(e) =>
                                setSignUpValues({
                                    ...signUpValues,
                                    ["firstName"]: e.target.value,
                                })
                            }
                        />
                        <BorderedInput
                            name="Last Name"
                            value={signUpValues.lastName}
                            onChange={(e) =>
                                setSignUpValues({
                                    ...signUpValues,
                                    ["lastName"]: e.target.value,
                                })
                            }
                        />
                        <BorderedInput
                            name="E-mail"
                            type="email"
                            value={signUpValues.email}
                            onChange={(e) =>
                                setSignUpValues({
                                    ...signUpValues,
                                    ["email"]: e.target.value,
                                })
                            }
                        />
                        <BorderedInput
                            name="Username"
                            value={signUpValues.username}
                            onChange={(e) =>
                                setSignUpValues({
                                    ...signUpValues,
                                    ["username"]: e.target.value,
                                })
                            }
                        />
                        <PasswordInput
                            value={signUpValues.password}
                            onChange={(e) =>
                                setSignUpValues({
                                    ...signUpValues,
                                    ["password"]: e.target.value,
                                })
                            }
                        />
                        <Container>
                            <Button
                                className={submitStyle}
                                variant="contained"
                                color="secondary"
                                type="submit"
                            >
                                Sign Up
                            </Button>
                            {submit ? (
                                <SignUpModal
                                    submit={submit}
                                    setSubmit={setSubmit}
                                />
                            ) : null}
                        </Container>
                    </form>
                </AccordionDetails>
            </Accordion>
        </ListItem>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default SignUpAccordion;
