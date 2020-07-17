// ./src/components/LoggedOutdrawer

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

import React, { useContext, useState } from "react";

import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Accordion from "@material-ui/core/Accordion";
import TextField from "@material-ui/core/TextField";
import ListItem from "@material-ui/core/ListItem";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
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
  const [signUpValues, setSignUpValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    showPassword: false,
  });

  const [logInValues, setLogInValues] = useState({
    username: "",
    password: "",
    showPassword: false,
  });
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
      height: `calc(${navHeight} + 1.5rem)`,
    },

    wrapper: {
      flexDirection: "column",
      position: "relative",
      alignItems: "center",
      display: "flex",
    },

    // Accordions

    accordion: {
      boxShadow: ` 0 0 7px -4px black`,
      paddingRight: "0",
      paddingLeft: "0",
    },

    accordionRoot: {
      background: "rgba(255, 255, 255, 0.75)",
      width: "100%",
    },

    list: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },

    listItem: {
      padding: 0,
      marginBottom: "1.5rem",
      width: "99%",
    },

    //Accordion Header

    headerTitle: {
      padding: "0 0.7rem",
      fontSize: "1.6rem",
      width: "100%",
    },

    //Accordion Body

    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
      width: "100%",
    },

    input: {
      width: "85%",
      marginBottom: "1rem",
    },

    firstInput: {
      marginTop: "1rem",
    },

    submit: {
      width: "40%",
      margin: "0.5rem",
    },

    comingSoon: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
      width: "100%",
    },

    settings: {
      fontSize: "2rem",
      width: "100%",
      textAlign: "center",
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
    comingSoon,
    firstInput,
    accordion,
    settings,
    listItem,
    wrapper,
    submit,
    input,
    form,
    list,
  } = classes;

  /*-------------------------------------------------------------- Event Handlers ------------------------------------------------------------------*/

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClickShowPassword = () => {
    setSignUpValues({
      ...signUpValues,
      showPassword: !signUpValues.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignUpInput = (prop) => (event) => {
    setSignUpValues({ ...signUpValues, [prop]: event.target.value });
  };

  const handleLogInInput = (prop) => (event) => {
    setLogInValues({ ...logInValues, [prop]: event.target.value });
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
                  <Typography
                    align="center"
                    variant="h3"
                    className={headerTitle}
                  >
                    {" "}
                    Sign Up
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <form className={form}>
                    <TextField
                      placeholder="First Name"
                      variant="outlined"
                      label="First Name"
                      className={`${input} ${firstInput}`}
                      value={signUpValues.firstName}
                      onChange={handleSignUpInput("firstName")}
                    ></TextField>

                    <TextField
                      placeholder="Last Name"
                      variant="outlined"
                      label="Last Name"
                      className={input}
                      value={signUpValues.lastName}
                      onChange={handleSignUpInput("lastName")}
                    ></TextField>

                    <TextField
                      placeholder="Email"
                      variant="outlined"
                      label="Email"
                      type="email"
                      className={input}
                      value={signUpValues.email}
                      onChange={handleSignUpInput("email")}
                    ></TextField>

                    <TextField
                      placeholder="Username"
                      variant="outlined"
                      label="Username"
                      className={input}
                      value={signUpValues.username}
                      onChange={handleSignUpInput("username")}
                    ></TextField>

                    <TextField
                      placeholder="Password"
                      variant="outlined"
                      label="Password"
                      className={input}
                      type={signUpValues.showPassword ? "text" : "password"}
                      value={signUpValues.password}
                      onChange={handleSignUpInput("password")}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {signUpValues.showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Button
                      className={submit}
                      variant="contained"
                      color="secondary"
                    >
                      Sign Up
                    </Button>
                  </form>
                </AccordionDetails>
              </Accordion>
            </ListItem>

            <ListItem className={listItem}>
              <Accordion
                // @ts-ignore
                expanded={expanded === `panelLogIn`}
                onChange={handleChange(`panelLogIn`)}
                classes={{ root: accordionRoot }}
              >
                <AccordionSummary
                  aria-controls={`panelch-content`}
                  id={`panelbh-header`}
                  className={accordion}
                >
                  <Typography
                    align="center"
                    variant="h3"
                    className={headerTitle}
                  >
                    {" "}
                    Log In
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <form className={form}>
                    <TextField
                      placeholder="Username"
                      variant="outlined"
                      label="Username"
                      value={logInValues.username}
                      onChange={handleLogInInput("username")}
                      className={`${input} ${firstInput}`}
                    ></TextField>

                    <TextField
                      placeholder="Password"
                      variant="outlined"
                      label="Password"
                      className={input}
                      type={logInValues.showPassword ? "text" : "password"}
                      value={logInValues.password}
                      onChange={handleSignUpInput("password")}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {logInValues.showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Button
                      className={submit}
                      variant="contained"
                      color="secondary"
                    >
                      Login
                    </Button>
                  </form>
                </AccordionDetails>
              </Accordion>
            </ListItem>

            <ListItem className={listItem}>
              <Accordion
                // @ts-ignore
                expanded={expanded === `panelSettings`}
                onChange={handleChange(`panelSettings`)}
                classes={{ root: accordionRoot }}
              >
                <AccordionSummary
                  aria-controls={`paneldh-content`}
                  id={`panelbh-header`}
                  className={accordion}
                >
                  <Typography
                    align="center"
                    variant="h3"
                    className={headerTitle}
                  >
                    {" "}
                    Settings
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <div className={settings}>
                    <p className={comingSoon}>Coming Soon!</p>
                  </div>
                </AccordionDetails>
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
