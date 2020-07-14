// ./src/components/CartDrawer

import React, { useContext } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/list";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import RemoveIcon from "@material-ui/icons/RemoveCircle";
import IconButton from "@material-ui/core/IconButton";

import variables from '../styles'
import { DrawerContext } from "../DrawerContext";


const { drawerWidth, themeMain, textColor } = variables;


const testCart = [
  {
    id: 1,
    name: "Pet Rock",
    description: "A friendly rock found in Joshua Tree looking for a home",
    price: 300.99,
    quantity: 1,
    delivery: '{"pickup"}',
    rating: 5.0,
    userId: 3,
    categoryId: "{2, 3}",
  },
  {
    id: 2,
    name: "Turntables",
    description:
      "A pair of used Pioneer CDJ's in decent condition, perfect for getting your scratch on!",
    price: 450.99,
    quantity: 2,
    delivery: '{"standard", "express", "next-day"}',
    rating: 3.5,
    userId: 4,
    categoryId: "{4}",
  },
  {
    id: 3,
    name: "Embroidered Dress",
    description:
      "One of a kind, hand-made embroidered dress from Egypt, perfect for weddings, parties, and other special occassions!",
    price: 60.0,
    quantity: 50,
    delivery: '{"standard"}',
    rating: 5.0,
    userId: 2,
    categoryId: "{1}",
  },
];

const useStyles = makeStyles({

    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        backgroundColor: themeMain,
      },
    
      drawerPaper: {
        width: drawerWidth,
        backgroundColor: themeMain,
      },
    
      drawerContainer: {
        overflow: "auto",
      },
    
      drawerPaperRoot: {
        backgroundColor: themeMain,
        color: textColor,
      },
    
      // Cart
    
      remove: {
        color: 'red',
      }
})


function CartDrawer() {

  const { drawer, toggleDrawer } = useContext(DrawerContext);

  const classes = useStyles();

  const cartList = () => (
    <div id="cart-drawer">
      <List>
        {testCart.map((productObj) => (
          <ListItem component="div" key={productObj.userId} divider style={{ paddingLeft: '0', paddingRight: '0' }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                flexBasis: "1",
                fontSize: "0.7rem",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "45%",
                  borderRight: "1px solid grey",
                  marginLeft: '0.8rem',
                }}
              >
                <IconButton
                  color="inherit"
                  aria-label="delete cart item"
                  style={{ paddingRight: "0.5rem", }}
                //   classes={{ colorInherit: remove }}
                >
                  <RemoveIcon
                    style={{
                      fontSize: "1.3rem",
                    }}
                  />
                </IconButton>
                <Typography
                  align="left"
                  variant="h3"
                  style={{ fontSize: "0.9rem", paddingRight: "0.5rem" }}
                >
                  {" "}
                  {productObj.name}{" "}
                </Typography>
              </div>
              <Typography
                align="left"
                variant="h4"
                style={{
                  width: "15%",
                  fontSize: "0.8rem",
                  borderRight: "1px solid grey",
                  paddingRight: "0.5rem",
                }}
              >
                {" "}
                Qty: {productObj.quantity}{" "}
              </Typography>
              <Typography
                align="right"
                variant="h4"
                style={{
                    width: "20%",
                    fontSize: "0.8rem",
                    marginRight: '0.8rem',
                   
                  }}
              >
                {" "}
                {productObj.price}{" "}
              </Typography>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
  

  return (
    <Drawer
      
      className={classes.drawer}
      anchor="right"
      open={drawer.right}
      onClose={() => toggleDrawer("right", false)}
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={classes.drawerContainer}>{cartList()}</div>
    </Drawer>
  );
}

export default CartDrawer;
