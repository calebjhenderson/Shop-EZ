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
const { getProductById } = require("../db/products.js");
const {
    addProductToCart,
    removeProductFromCart,
    getCartProductById,
    getCartProductByCartAndProductId,
} = require("../db/cart_products.js");
const { requireUser } = require("../db/users.js");
const products = require("../db/products.js");

cartsRouter.use(async function (req, res, next) {
    console.log("A request has been made to the /api/carts endpoint.");
    next();
});

// Create Cart Route------------------------------WORKS!
cartsRouter.post("/create", async function (req, res, next) {
    const { userId, products, productId } = req.body;
    console.log("Router body", products);
    const cartData = {};

    cartData.userId = userId;
    cartData.products = products;
    cartData.productId = productId;

    const userCart = await getCartByUserId(userId);

    const cartId = userCart.id;

    if (userCart) {
        try {
            const addedProduct = await insertProductToCart({
                userId,
                products,
            });

            console.log("Product added to cart", addedProduct);

            const newCartProduct = await addProductToCart(productId, cartId);

            res.send({
                message: "Product added to cart_products",
                product: newCartProduct,
            });
        } catch (error) {
            console.error(error);
            const { name, message } = error;
            next({ name, message });
        }
    } else {
        try {
            const newCart = await createCart(cartData);
            if (newCart) {
                res.send({ message: "Here is your cart...", cart: newCart });
            } else {
                throw {
                    message: "Error creating cart",
                };
            }
        } catch (error) {
            console.error(error);
            const { name, message } = error;
            next({ name, message });
        }
    }
});

//------------------------------Works!
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

// Delete Cart Route-----Works!
cartsRouter.delete("/deletecart/:cartId", async function (req, res, next) {
    const { cartId } = req.params;

    try {
        const cart = await getCartById(cartId);
        const deletedCart = await deleteCart(cart.id);
        if (deletedCart) {
            res.send({ message: "Cart deleted.", cart: deletedCart });
        } else {
            res.send({ message: "Cart doesnt exist." });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

// Add Product to Cart Route------------------------------Works!
cartsRouter.put("/add/:productId", async function (req, res, next) {
    const { productId } = req.params;
    const { cartId } = req.body;

    try {
        const newCartProduct = await addProductToCart(productId, cartId);
        res.send({ message: "Product added to cart", product: newCartProduct });
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

//Remove Product From Cart Route-----WORKS!
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
        res.send({
            message: "Product removed from cart.",
            product: deletedCartProduct,
        });
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

module.exports = cartsRouter;
