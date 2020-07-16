// ./src/components/CartDrawer

import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import RemoveIcon from "@material-ui/icons/RemoveCircle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Accordion from "@material-ui/core/Accordion";
import ListItem from "@material-ui/core/ListItem";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/list";

import variables from "../styles";
import { DrawerContext } from "../DrawerContext";

const { drawerWidth, textColor, navHeight, primaryAccent } = variables;

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

function CartDrawer() {
  const { drawer, toggleDrawer } = useContext(DrawerContext);

  const useStyles = makeStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      overflowX: 'hidden',
    },

    drawerPaper: {
      width: drawerWidth,
      backgroundColor: "rgba(90,68,179, 1)",
      color: textColor,
    },

    drawerContainer: {
      overflow: "auto",
    },

    // Cart

    remove: {
      color: "rgba(146,8,8, 1)",
    },

    removeButton: {
      padding: '0 0.5rem 0 0.7rem',
    },

    blankSpace: {
      height: `calc(${navHeight} + 0.5rem)`,
    },

    productImage: {
      height: 'auto',
      width: `calc( ${ drawerWidth } - 70% )`,
    },

    accordion: {
      paddingLeft: '0',
      boxShadow: ` 0 -1px 8px ${ primaryAccent } `,
    },
    
    accordionRoot: {
      background: 'rgba(255, 255, 255, 0.85)',
      width: '100%',
    }

  });

  const classes = useStyles();

  const {
    drawer: drawerStyle,
    drawerPaper,
    drawerContainer,
    remove,
    blankSpace,
    productImage,
    removeButton,
    accordion,
    accordionRoot,
  } = classes;

  const cartList = () => {
    
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    
    return (
    <div id="cart-drawer" style={{ position: "relative" }}>
      <List>
        {testCart.map((productObj, index) => (
          <ListItem
            component="div"
            key={productObj.userId}
            style={{ padding: "0" }}
          >
            <Accordion
              expanded={ expanded === `panel${ index }` }
              onChange={ handleChange(`panel${ index }`)}
              classes={{ root: accordionRoot }}
            >
              <AccordionSummary
                aria-controls={ `panel${ index }ah-content` }
                id={`panel${ index }ah-header`}
                className={ accordion }
              >
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
                    }}
                  >
                    <IconButton
                      color="primary"
                      aria-label="delete cart item"
                      className={ removeButton }
                      classes={{ colorPrimary: remove }}
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
                      marginRight: "0.8rem",
                    }}
                  >
                    {" "}
                    {productObj.price}{" "}
                  </Typography>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <img className={ productImage } src='/assets/placeholder_product.png' alt='A generic placeholder image of an outline of sunglasses' />
                </Typography>
              </AccordionDetails>
            </Accordion>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

  return (
    <Drawer
      className={drawerStyle}
      anchor="right"
      open={drawer.cart}
      onClose={() => toggleDrawer("cart")}
      classes={{ paper: drawerPaper }}
    >
      <div className={blankSpace}></div>
      <div className={drawerContainer}>{cartList()}</div>
    </Drawer>
  );
}

export default CartDrawer;
