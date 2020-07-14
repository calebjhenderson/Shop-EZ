import React from "react";
import { Grid } from "@material-ui/core/";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  storeHeader: {
    background: "#3d2f75",
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 75,
    marginRight: 75,
    padding: 20,
    color: "#ffffff",
  },
});

function StoreHeader() {
  const classes = useStyles();
  return (
    <Grid className={classes.storeHeader} position="static">
      <Typography align="center" variant="h5" noWrap>
        Store Name
      </Typography>
    </Grid>
  );
}

export default StoreHeader;
