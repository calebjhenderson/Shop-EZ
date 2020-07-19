// ./src/components/drawers/accordions/SignUpAccordion

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

//React
import React, { useState } from "react";

// Material-UI Components
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";

// Local Components
import BorderedInput from "./inputs/BoderedInput";
import PasswordInput from "./Inputs/PasswordInput";

// Styling
import variables from "../../../styles";
const { accordionStyling } = variables;

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

    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles = makeStyles(accordionStyling);

    const classes = useStyles();

    const {
        accountAccordion,
        accountListItem,
        accordionRoot,
        headerTitle,
        submit,
        form,
    } = classes;

    /*-------------------------------------------------------------- Event Handlers ------------------------------------------------------------------*/

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleSignUp = async (e) => {
        event.preventDefault();
        event.stopPropagation();
        console.log("handle here");

        try {
            const { data } = await axios.post("/api/users/register", {
                firsName: signUpValues.firstName,
                lastname: signUpValues.lastName,
                email: signUpValues.email,
                username: signUpValues.username,
                password: signUpValues.password,
            });

            if (
                data.messageName === "IncorrectCredentials" ||
                data.name === "UserNotFoundError"
            ) {
                console.log("incorrect credentials inputted");
            } else if (data.messageName === "Success") {
                localStorage.setItem("token", data.token);
            } else {
                console.log("An error has occurred.");
            }
        } catch (err) {
            console.error(
                "Error logging in user @handleLogin in SignupAccordion.jsß",
                err
            );
        }
    };

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

    return (
        <ListItem className={accountListItem}>
            <Accordion
                // @ts-ignore
                expanded={expanded === `panelSignUp`}
                onChange={handleChange(`panelSignUp`)}
                classes={{ root: accordionRoot }}
            >
                <AccordionSummary
                    aria-controls={`panelch-content`}
                    id={`panelch-header`}
                    className={accountAccordion}
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
                    <form className={form}>
                        <BorderedInput
                            name="First Name"
                            first={true}
                            value={signUpValues.firstName}
                        />
                        <BorderedInput name="Last Name" />
                        <BorderedInput name="E-mail" type="email" />
                        <BorderedInput name="Username" />
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
        </ListItem>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default SignUpAccordion;
