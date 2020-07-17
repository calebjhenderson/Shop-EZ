// ./src/components/LoggedOutdrawer

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

import React, { useContext, useState } from "react";

import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PaymentIcon from "@material-ui/icons/Payment";
import Accordion from "@material-ui/core/Accordion";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/list";

import { DrawerContext } from "../DrawerContext";
import variables from "../styles";

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/

const {
  secondaryAccent,
  primaryAccent,
  drawerWidth,
  textColor,
  navHeight,
} = variables;

function LoggedOutDrawer() {
  /*-------------------------------------------------------------- State ------------------------------------------------------------------*/

  const { drawer, toggleDrawer } = useContext(DrawerContext);
  const [expanded, setExpanded] = useState(false);

  /*-------------------------------------------------------------- Styling ------------------------------------------------------------------*/

  const useStyles = makeStyles({
    // Drawer

    drawer: {
      overflowX: "hidden",
      width: drawerWidth,
      flexShrink: 0,
    },

    drawerPaper: {
      backgroundColor: "rgba(90,68,179, 1)",
      width: drawerWidth,
      color: textColor,
    },

    drawerContainer: {
      overflow: "auto",
    },

    blankSpace: {
      height: `calc(${navHeight} + 0.5rem)`,
    },

    wrapper: {
      flexDirection: "column",
      position: "relative",
      alignItems: "center",
      display: "flex",
    },

    // Accordions

    accordion: {
      boxShadow: ` 0 -1px 8px ${primaryAccent} `,
      paddingRight: "0",
      paddingLeft: "0",
    },

    accordionRoot: {
      background: "rgba(255, 255, 255, 0.75)",
      width: "100%",
    },

    list: {
      width: "100%",
    },

    listItem: {
      padding: 0,
    },

    //Accordion Header

    headerTitle: {
      padding: "0 0.7rem",
      fontSize: "1.6rem",
      width: "100%",
    },
  });

  const classes = useStyles();

  const {
    drawer: drawerStyle,
    drawerContainer,
    accordionRoot,
    headerTitle,
    drawerPaper,
    blankSpace,
    accordion,
    listItem,
    wrapper,
    list,
  } = classes;

  /*-------------------------------------------------------------- Event Handlers ------------------------------------------------------------------*/

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

  return (
    <Drawer
      className={drawerStyle}
      anchor="right"
      open={drawer.accountLoggedOut}
      onClose={() => toggleDrawer("accountLoggedOut")}
      classes={{ paper: drawerPaper }}
    >
      <div className={blankSpace}></div>
      <div className={drawerContainer}>
        <div id="accountLoggedOut-drawer" className={wrapper}>
          <List className={list}>
            <ListItem className={listItem}>
              <Accordion
                // @ts-ignore
                expanded={expanded === `panelSignUp`}
                onChange={handleChange(`panelSignUp`)}
                classes={{ root: accordionRoot }}
              >
                <AccordionSummary
                  aria-controls={`panelbh-content`}
                  id={`panelbh-header`}
                  className={accordion}
                >
                  <Typography align="center" variant="p" className={headerTitle}>
                    {" "}
                    Sign Up
                  </Typography>
                </AccordionSummary>
              </Accordion>
            </ListItem>

            <ListItem className={listItem}>
              <Accordion
                // @ts-ignore
                expanded={expanded === `panelSignUp`}
                onChange={handleChange(`panelSignUp`)}
                classes={{ root: accordionRoot }}
              >
                <AccordionSummary
                  aria-controls={`panelbh-content`}
                  id={`panelbh-header`}
                  className={accordion}
                >
                  <Typography align="center" variant="p" className={headerTitle}>
                    {" "}
                    Log In
                  </Typography>
                </AccordionSummary>
              </Accordion>
            </ListItem>

            <ListItem className={listItem}>
              <Accordion
                // @ts-ignore
                expanded={expanded === `panelSignUp`}
                onChange={handleChange(`panelSignUp`)}
                classes={{ root: accordionRoot }}
              >
                <AccordionSummary
                  aria-controls={`panelbh-content`}
                  id={`panelbh-header`}
                  className={accordion}
                >
                  <Typography align="center" variant="p" className={headerTitle}>
                    {" "}
                    Settings
                  </Typography>
                </AccordionSummary>
              </Accordion>
            </ListItem>
          </List>
        </div>
      </div>
    </Drawer>
  );
}

/*-------------------------------------------------------------- Exports ------------------------------------------------------------------*/

export default LoggedOutDrawer;
