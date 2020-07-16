import React from "react";
import { useState } from "react";
import { Grid } from "@material-ui/core/";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

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

const BASE_URL = "http://localhost:3000/api/users";

function StoreHeader() {
  const [shop, setShop] = useState([]);

  //Get Shop by this user and store in a userState
  async function getUserShop(userId) {
    try {
      const userShop = await axios.get(BASE_URL + `/shop/${userId}`);
      if (userShop) {
        message: "Shop exist for this userId!";
        const shopArray = userShop.data.userShop;

        setShop(shopArray);

        return userShop;
        console.log("testshop", shopArray);
      } else {
        message: "No shop for that userId";
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  console.log("shop", shop);

  if (!shop || !shop.length) {
    // getUserShop(1);
  }

  const classes = useStyles();

  return (
    <Grid className={classes.storeHeader} position="static">
      <Typography align="center" variant="h5" noWrap>
        Shop Name
      </Typography>
    </Grid>
  );
}

export default StoreHeader;
