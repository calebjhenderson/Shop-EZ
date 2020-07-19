import React from "react";
import ProductCard from "./ProductCard";
import ProductView from "./ProductView";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core/";

const useStyles = makeStyles({
    storeContent: {
        marginRight: 75,
        marginLeft: 75,
        padding: 30,
        background: "#3d2f75",
    },
});

function StoreContent({ cart, setCart }) {
    const classes = useStyles();
    return (
        <Grid className={classes.storeContent}>
            <ProductCard cart={cart} setCart={setCart} />
        </Grid>
    );
}

export default StoreContent;
