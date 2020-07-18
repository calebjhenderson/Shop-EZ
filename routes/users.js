//  ./routes/users.js

const express = require("express");
const usersRouter = express.Router();
const {
    getAllUsers,
    createUser,
    getUserByUserName,
} = require("../db/users.js");
const { getUserProductsByUserId } = require("../db/user_products");
const { getUserOrdersByUserId } = require("../db/user_orders");
const { getProductById } = require("../db/products");
const { getShopByUserId } = require("../db/shops");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cart_products = require("../db/cart_products.js");
const SALT_COUNT = 10;

usersRouter.use(async function (req, res, next) {
    console.log("A request is being made to the /api/users endpoint.");
    next();
});

//Get All Users Route---------------------------------Works!
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

//Create New User Route---------------------------------Works!
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
                        messageName: "User created!",
                        message: "Thanks for choosing Shop-Ez!",
                        token,
                        username,
                        id: newUser.id,
                    });
                });
            }
        });
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

//Login User Route---------------------------------Works!
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
                        messageName: "Success!",
                        message: "Welcome back!",
                        token,
                        firstName,
                        lastName,
                        id,
                    });
                } else {
                    return next({
                        messageName: "Oops!",
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

//Get User Orders Route---------------------------------Works!
usersRouter.get("/orders", async function (req, res, next) {
    const { id } = req.params;
    try {
        const userOrders = await getUserOrdersByUserId(id);

        if (!userOrders) {
            next({
                name: "NoOrdersForUserError",
                message: "No orders found for that specified user",
            });
        }

        res.send({
            name: "userOrdersFound",
            message: "Orders for this user have been found. See attached",
            userOrders,
        });
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

//Get Products By UserID Route---------------------------------Works!
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

//Get Shop By UserID Route---------------------------------Works!
usersRouter.get("/shop/:userId", async function (req, res, next) {
    const userId = req.params.userId;
    try {
        const userShop = await getShopByUserId(userId);

        if (!userShop) {
            next({
                name: "NoShopForUserError",
                message: "No Shop found for that specified user",
            });
        }

        res.send({
            name: "userShopFound",
            message: "Shop for this user have been found. See attached",
            userShop,
        });
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

module.exports = usersRouter;
