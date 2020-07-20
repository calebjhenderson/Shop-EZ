// ./src/app.js

/*-------------------------------------------------------------- Imports ------------------------------------------------------------------*/

// React
import ReactRouterDOM from "react-router-dom";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

// Material-UI
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

// Local Components
import AccountDrawer from "./components/drawers/AccountDrawer";
import CartDrawer from "./components/drawers/CartDrawer";
import StoreContent from "./components/StoreContent";
import StoreHeader from "./components/StoreHeader";
import SignUpModal from "./components/SignUpModal";
import Checkout from "./components/Checkout";
import Notice from "./components/Notice";
import Footer from "./components/Footer";
import Nav from "./components/Nav";

// Context
import { DrawerContext } from "./DrawerContext";
import { UserContext } from "./UserContext";

// Styling
import variables from "./styles";
const { muiTheme } = variables;

// Other packages/modules
import axios from "axios";

/*-------------------------------------------------------------- Globals ------------------------------------------------------------------*/
// Overrides Material-Ui Base Styling
const theme = createMuiTheme(muiTheme);
const App = () => {
    /*-------------------------------------------------------------- State ------------------------------------------------------------------*/
    const [user, setUser] = useState({});
    const [cart, setCart] = useState([]);
    const [token, setToken] = useState("");
    const [drawer, setDrawer] = useState({
        cart: false,
        account: false,
        explore: false,
        customizeShop: false,
    });
    const [alert, setAlert] = useState({
        message: "",
        severity: "",
        isVisible: false,
    });
    const [visibility, setVisibility] = useState(false);
    const [submit, setSubmit] = useState(false);

    // Check if user is logged in and set their cart in state, else check if cart exists for non-user and set cart in state

    useEffect(() => {
        //   const isToken =  localStorage.getItem('token');
        //   const isCart = localStorage.getItem('cart') || (cart && cart.length);

        //   if(user && Object.keys(user).length){setCart(user.cart)}
        //   else if(isToken){
        //     // Check if token is valid and if it is, set user and then set cart
        //   }
        //   else if(isCart){
        //     // set cart
        //   }

        const getUserCart = async () => {
            try {
                const { data } = await axios.get("/api/users/cart/1");
                if (data.name === "UserCartObtained") {
                    setCart(data.userCart.products);
                }
                //TODO: Add else statements for if user is not logged in or we receive invalid user error or no cart error
            } catch (err) {
                console.error("Error retrieving initial user cart", err);
            }
        };

        getUserCart();
    }, []);

    /*-------------------------------------------------------------- Event Handlers ------------------------------------------------------------------*/
    const toggleDrawer = (anchor) => {
        console.log(
            "anchor is ",
            anchor,
            " and drawer[anchor] is ",
            drawer[anchor],
            " and drawer.cart is ",
            drawer.cart,
            " and drawer.account is ",
            drawer["account"]
        );

        if (
            anchor === "account" &&
            drawer[anchor] === false &&
            drawer.cart === true
        ) {
            setDrawer({ ...drawer, [anchor]: !drawer[anchor], cart: false });
        } else if (
            anchor === "cart" &&
            drawer[anchor] === false &&
            drawer.account === true
        ) {
            console.log("iamhere");
            setDrawer({
                ...drawer,
                [anchor]: !drawer[anchor],
                account: false,
            });
        } else {
            setDrawer({ ...drawer, [anchor]: !drawer[anchor] });
        }
    };

    const handleClose = (event, reason) => {
        console.log("reason is ", reason);
        if (reason === "clickaway") {
            return;
        }

        setAlert({ ...alert, ["isVisible"]: false });
    };
    /*-------------------------------------------------------------- Component ------------------------------------------------------------------*/

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <UserContext.Provider
                    value={{
                        user,
                        setUser,
                        token,
                        setToken,
                    }}
                >
                    <DrawerContext.Provider
                        value={{
                            setVisibility,
                            toggleDrawer,
                            visibility,
                            setDrawer,
                            setAlert,
                            setCart,
                            drawer,
                            alert,
                            cart,
                        }}
                    >
                        <div id="app">
                            <Nav />
                            <CartDrawer />

                            <AccountDrawer
                                submit={submit}
                                setSubmit={setSubmit}
                            />
                            {submit ? (
                                <SignUpModal
                                    submit={submit}
                                    setSubmit={setSubmit}
                                />
                            ) : null}

                            {visibility ? (
                                <Checkout setVisibility={setVisibility} />
                            ) : (
                                <>
                                    <StoreHeader />
                                    <StoreContent
                                        cart={cart}
                                        setCart={setCart}
                                    />
                                </>
                            )}
                            <Notice
                                isVisible={alert.isVisible}
                                message={alert.message}
                                severity={alert.severity}
                                handleClose={handleClose}
                            />
                            <Footer />
                        </div>
                    </DrawerContext.Provider>
                </UserContext.Provider>
            </CssBaseline>
        </ThemeProvider>
    );
};
/*-------------------------------------------------------------- Render ------------------------------------------------------------------*/
const app = document.getElementById("root");
ReactDOM.render(<App />, app);
