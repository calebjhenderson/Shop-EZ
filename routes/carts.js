//  ./routes/carts.js

const express = require("express");
const cartsRouter = express.Router();
const {
    createCart,
    updateCart,
    deleteCart,
    getCartById,
    getCartByUserId,
    insertProductToCart,
} = require("../db/carts.js");

const {
    addProductToCart,
    removeProductFromCart,
    getCartProductByCartAndProductId,
} = require("../db/cart_products.js");

const products = require("../db/products.js");

cartsRouter.use(async function (req, res, next) {
    console.log("A request has been made to the /api/carts endpoint.");
    next();
});

// Create Cart Route------------------------------WORKS!
cartsRouter.post("/create", async function (req, res, next) {
    const { userId, products, productId } = req.body;

    const cartData = {};

    cartData.userId = userId;
    cartData.products = products;
    cartData.productId = productId;

    let dbArr = "{";
    products.map((productArrId) => {
        dbArr = dbArr + productArrId + ", ";
    });

    dbArr = dbArr.slice(0, dbArr.length - 2) + "}";

    try {
        const userCart = await getCartByUserId(userId);

        const cartId = userCart.id;

        if (userCart) {
            const addedProduct = await insertProductToCart({
                userId,
                products: dbArr,
            });

            const newCartProduct = await addProductToCart(productId, cartId);

            res.send({
                name: "CartProductAddedSuccess",
                message: "Product added to cart.",
                product: newCartProduct,
                userCart,
            });
        } else {
            const newCart = await createCart(cartData);
            if (newCart) {
                res.send({
                    name: "CartCreatedSuccess",
                    message: "Here is your cart...",
                    cart: newCart,
                });
            } else {
                throw {
                    message: "Error creating cart",
                };
            }
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

// Update Cart Route------------------------------WORKS!
cartsRouter.patch("/update/:cartId", async function (req, res, next) {
    const { cartId } = req.params;
    const { products } = req.body;

    const cartData = {};
    cartData.products = products;

    try {
        const cart = await getCartById(cartId);

        const updatedCart = await updateCart(cart.id, cartData);

        if (updatedCart) {
            res.send({
                message: "Your cart has been updated...",
                cart: updatedCart,
            });
        } else {
            res.send({ message: "Cart update failed." });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

// Delete Cart Route------------------------------WORKS!
cartsRouter.delete("/deletecart/:cartId", async function (req, res, next) {
    const { cartId } = req.params;

    try {
        const deletedCart = await deleteCart(cartId);
        if (deletedCart) {
            res.send({ message: "Cart deleted.", cart: deletedCart });
        } else {
            res.send({ message: "Cart doesn't exist." });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

// Add Product to Cart Route
cartsRouter.put("/add/:productId", async function (req, res, next) {
    const { productId } = req.params;
    const { cartId } = req.body;

    try {
        //MAKE SURE STOCK IS AVAILABLE...
        const newCartProduct = await addProductToCart(productId, cartId);
        //ADJUST STOCK AFTER PURCHASING
        if (newCartProduct) {
            res.send({
                message: "Product added to cart.",
                product: newCartProduct,
            });
        } else {
            res.send({ message: "Error adding product to cart." });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

//Remove Product From Cart Route------------------------------WORKS!
cartsRouter.delete("/deletecartproduct/:productId", async function (
    req,
    res,
    next
) {
    const { productId } = req.params;
    const { cartId } = req.body;

    try {
        const cartProduct = await getCartProductByCartAndProductId(
            cartId,
            productId
        );
        const deletedCartProduct = await removeProductFromCart(cartProduct.id);
        if (deletedCartProduct) {
            res.send({
                message: "Product removed from cart.",
                product: deletedCartProduct,
            });
        } else {
            res.send({ message: "Error removing product from cart." });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

module.exports = cartsRouter;
