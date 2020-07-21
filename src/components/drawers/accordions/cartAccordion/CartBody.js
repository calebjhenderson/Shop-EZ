// ./src/components/drawers/accordions/cartAccordion/CartBody.js

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

//React Components
import React, { useState } from "react";

//Material-UI Components
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

// Local Components
import RemoveBtn from "../../buttons/RemoveBtn";

// Styles
import variables from "../../../../styles";
const { accordionStyling } = variables;

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

function CartBody({ qtyAvailable, price }) {
    /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

    const useStyles = makeStyles(accordionStyling);
    const classes = useStyles();
    const {
        cartAccordionDetails,
        priceContainer,
        productImage,
        productInfo,
        qtyContainer,
        priceAmount,
        priceLabel,
        qtyCount,
        qty,
    } = classes;

    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

    return (
        <AccordionDetails className={cartAccordionDetails}>
            <img
                className={productImage}
                src="/assets/placeholder_product.png"
                alt="A generic placeholder image of an outline of sunglasses"
            />
            <div className={productInfo}>
                <div className={priceContainer}>
                    <Typography
                        className={priceLabel}
                        align="left"
                        variant="h4"
                    >
                        Item Price:
                    </Typography>
                    <Typography
                        className={priceAmount}
                        align="left"
                        variant="h4"
                    >
                        {price}
                    </Typography>
                </div>
                <div className={qtyContainer}>
                    <Typography className={qty} align="left" variant="h4">
                        Qty:
                    </Typography>

                    <input
                        className={qtyCount}
                        type="number"
                        min="1"
                        defaultValue={qtyAvailable}
                    ></input>
                </div>
                <RemoveBtn />
            </div>
        </AccordionDetails>
    );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default CartBody;
