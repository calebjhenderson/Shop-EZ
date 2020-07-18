import React from "react";
import { useState, useEffect } from "react";
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
const userId = 1;

function StoreHeader() {
    const [shop, setShop] = useState([]);

    //Get Shop by this user and store in a userState
    useEffect(() => {
        async function getUserShop() {
            try {
                const userShop = await axios.get(BASE_URL + `/shop/${userId}`);
                if (userShop) {
                    const shopArray = userShop.data.userShop;
                    setShop(shopArray);
                } else {
                    throw new Error("No shop found for that userId");
                }
            } catch (err) {
                console.log(err);
                throw err;
            }
        }
        getUserShop();
    }, []);

    const classes = useStyles();

    return (
        <Grid className={classes.storeHeader} position="static">
            <Typography align="center" variant="h5" noWrap>
                {shop.name}
            </Typography>
        </Grid>
    );
}

export default StoreHeader;
