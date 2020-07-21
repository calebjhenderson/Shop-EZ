//  ./routes/users.js

const express = require("express");
const usersRouter = express.Router();
const {
    getAllUsers,
    createUser,
    getUserByUserName,
    getUserById,
    getCartByUserId,
} = require("../db");
const { getUserProductsByUserId } = require("../db/user_products");
const { getUserOrdersByUserId } = require("../db/user_orders");
const { getProductById } = require("../db/products");
const { getShopByUserId } = require("../db/shops");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SALT_COUNT = 10;

usersRouter.use(async function (req, res, next) {
    console.log("A request is being made to the /api/users endpoint.");
    next();
});

//Get All Users Route------------------------------WORKS!
usersRouter.get("/", async function (req, res, next) {
    try {
        const users = await getAllUsers();
        res.send({ users });
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

//Create New User Route------------------------------WORKS!
usersRouter.post("/register", async function (req, res, next) {
    const recievedObj = req.body;
    const {
        username,
        password,
        firstName,
        lastName,
        role,
        active,
        email,
        public,
        addresses,
        paymentInfo,
        shopName,
    } = req.body;
    try {
        bcrypt.hash(password, SALT_COUNT, function (error, hashedPassword) {
            if (error) {
                throw error;
            } else {
                createUser({
                    username,
                    password: hashedPassword,
                    firstName,
                    lastName,
                    role,
                    active,
                    email,
                    public,
                    addresses,
                    paymentInfo,
                    shopName,
                }).then((newUser) => {
                    if (!newUser.name || newUser.name !== "UserAlreadyExists") {
                        console.log("NewUser", newUser);
                        const token = jwt.sign(
                            {
                                username,
                                password: hashedPassword,
                                id: newUser.id,
                            },
                            process.env.JWT_SECRET,
                            {
                                expiresIn: "1w",
                            }
                        );

                        res.send({
                            messageName: "UserCreated",
                            message: "Thanks for choosing Shop-Ez!",
                            token,
                            username,
                            id: newUser.id,
                        });
                    } else {
                        next({
                            messageName: "UserAlreadyExists",
                            message:
                                "A user with this username or email already exists! Please try again. ",
                        });
                    }
                });
            }
        });
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

//Login User Route------------------------------WORKS!
usersRouter.post("/login", async function (req, res, next) {
    const { username, password } = req.body;
    try {
        const user = await getUserByUserName(username);
        const hashedPassword = user.password;
        const { id } = user;
        const firstName = user.firstName;
        const lastName = user.lastName;

        bcrypt.compare(password, hashedPassword, function (
            err,
            passwordsMatch
        ) {
            if (err) {
                throw err;
            } else {
                if (passwordsMatch) {
                    const token = jwt.sign(
                        { id, username, firstName, lastName },
                        process.env.JWT_SECRET,
                        { expiresIn: "1w" }
                    );

                    res.send({
                        messageName: "Success",
                        message: "Welcome back!",
                        token,
                        firstName,
                        lastName,
                        id,
                        username,
                    });
                } else {
                    return next({
                        messageName: "IncorrectCredentials",
                        message:
                            "Wrong username or password. Please try again.",
                    });
                }
            }
        });
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

//Post User Tokens Route---------------------------------In Progress
usersRouter.post("/token", async function (req, res, next) {
    const { token } = req.body;
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        res.send({
            name: "TokenVerified",
            message: "The token sent has been verified. Welcome back!",
            decodedToken,
        });
    } catch (error) {
        const { name, message } = error;
        if (name === "JsonWebTokenError") {
            next({
                name: "TokenNotVerified",
                message: "The token sent could not be verified",
            });
        }
        next({ name, message });
    }
});

//Get User Orders Route------------------------------WORKS!
usersRouter.get("/orders", async function (req, res, next) {
    const { id } = req.params;
    try {
        const userOrders = await getUserOrdersByUserId(id);

        if (!userOrders) {
            next({
                name: "NoOrdersForUserError",
                message: "No orders found for that specified user",
            });
        } else {
            res.send({
                name: "userOrdersFound",
                message: "Orders for this user have been found. See attached",
                userOrders,
            });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

//Get Products By UserID Route------------------------------WORKS!
usersRouter.get("/products/:userId", async function (req, res, next) {
    const userId = req.params.userId;

    try {
        const userProductIdsArr = await getUserProductsByUserId(userId);

        if (userProductIdsArr && userProductIdsArr.length) {
            const userProducts = await Promise.all(
                userProductIdsArr.map(
                    async (userProductIdObj) =>
                        await getProductById(userProductIdObj.productId)
                )
            );

            res.send({
                name: "userProductsFound",
                message:
                    "Products for this user have been found. See attached.",
                userProducts,
            });
        } else {
            next({
                name: "NoUserProductsFound",
                message: "No products have been found for the specified user",
            });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

//Get Shop By UserID Route------------------------------WORKS!
usersRouter.get("/shop/:userId", async function (req, res, next) {
    const userId = req.params.userId;
    try {
        const userShop = await getShopByUserId(userId);

        if (!userShop) {
            next({
                name: "NoShopForUserError",
                message: "No Shop found for that specified user",
            });
        } else {
            res.send({
                name: "userShopFound",
                message: "Shop for this user have been found. See attached",
                userShop,
            });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

usersRouter.get("/cart/:userId", async function (req, res, next) {
    const userId = req.params.userId;
    try {
        const userExists = await getUserById(userId);

        if (userExists) {
            const userCart = await getCartByUserId(userId);

            if (userCart) {
                res.send({
                    name: "UserCartObtained",
                    message: "The cart for that user was found. See attached",
                    userCart,
                });
            } else {
                next({
                    name: "CartNotFound",
                    message: "No active cart was found for this user.",
                });
            }
        } else {
            next({
                name: "UserNotFound",
                message:
                    "We were not able to find a user with the provided userId.",
            });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

module.exports = usersRouter;
