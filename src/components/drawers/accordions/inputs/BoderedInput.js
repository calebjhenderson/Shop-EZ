// ./src/components/accordions/inputs/BorderedInput

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import variables from "../../../../styles";
const { logInAccordionStyling } = variables;

function BorderedInput({
    name,
    type = "text",
    first = false,
    value,
    onChange,
}) {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

    const handleSubmit = () => {};
    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles = makeStyles(logInAccordionStyling);

    const classes = useStyles();
    const { input, firstInput } = classes;

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/
    console.log("username value is ", value);
    return (
        <TextField
            variant="outlined"
            placeholder={name}
            label={name}
            className={first ? `${input} ${firstInput}` : input}
            value={value}
            onChange={onChange}
            type={type}
        />
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default BorderedInput;
