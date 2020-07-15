import React from "react";
import ProductCard from "./product-card";
import ProductView from "./product-view";
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

function StoreContent() {
  const classes = useStyles();
  return (
    <Grid className={classes.storeContent}>
      <ProductCard />
    </Grid>
  );
}

export default StoreContent;
