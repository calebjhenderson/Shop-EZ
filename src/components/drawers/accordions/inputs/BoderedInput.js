// ./src/components/accordions/inputs/BorderedInput

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import variables from "../../../../styles";
const { inputStyling } = variables;

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

    const useStyles = makeStyles(inputStyling);

    const classes = useStyles();
    const { input, firstInput } = classes;

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

    return (
        <TextField
            required
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
