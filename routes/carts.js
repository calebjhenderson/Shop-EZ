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
    getCartProductsByProductId,
    updateCartProducts,
    getProductsByCartId,
} = require("../db/cart_products.js");

const products = require("../db/products.js");

cartsRouter.use(async function (req, res, next) {
    console.log("A request has been made to the /api/carts endpoint.");
    next();
});

// Create Cart Route------------------------------WORKS!
cartsRouter.post("/create", async function (req, res, next) {
    const { userId, productId, priceTotal } = req.body;

    const cartData = {};

    cartData.userId = userId;
    cartData.productId = productId;
    cartData.priceTotal = priceTotal;

    try {
        const userCart = await getCartByUserId(userId);

        if (userCart) {
            const cartByProductId = await getCartProductsByProductId(productId);
            if (cartByProductId) {
                console.log("FDFDF", cartByProductId);
                const productId = cartByProductId.id;
                const currentQuantity = cartByProductId.quantity;
                const currentTotalPrice = cartByProductId.pricetotal;
                console.log("totalpdfdf", currentTotalPrice);

                console.log("got in here", productId);

                const updatedQuantity = await updateCartProducts(productId, {
                    quantity: currentQuantity + 1,
                    pricetotal: currentTotalPrice + priceTotal,
                });

                res.send({
                    name: "UpdatedProductQuantity&priceTotal",
                    message:
                        "Product quantity and priceTotal has been updated Succesfully",
                    updatedQuantity: updatedQuantity,
                });
            } else {
                const cartId = userCart.id;
                const newCartProduct = await addProductToCart(
                    productId,
                    cartId,
                    priceTotal
                );

                res.send({
                    name: "CartProductAddedSuccess",
                    message: "Product added to cart",
                    newCartproduct: newCartProduct,
                });
            }
        } else {
            const newCart = await createCart({ userId });
            const userNewCart = await getCartByUserId(userId);

            const newCartId = userNewCart.id;
            const newCartProduct = await addProductToCart(
                productId,
                newCartId,
                priceTotal
            );

            if (newCart) {
                res.send({
                    name: "CartCreatedSuccess",
                    message: "Here is your cart...",
                    cart: newCart,
                    newCartproduct: newCartProduct,
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

//Remove Product From Cart Route-----WORKS!
cartsRouter.delete("/deleteCartProduct/:productId", async function (
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

// Get Cart Products associated with specified cartId
cartsRouter.get("/cartProducts/:cartId", requireUser, async function (
    req,
    res,
    next
) {
    const { cartId } = req.params;

    try {
        const cartProducts = await getProductsByCartId(cartId);

        if (cartProducts && cartProducts.length) {
            const cartProductsArr = [];

            async function getProducts() {
                await Promise.all(
                    cartProducts.map(async (cartProduct) => {
                        const product = await getProductById(
                            cartProduct.productId
                        );
                        cartProductsArr.push(product);
                    })
                );
            }

            await getProducts();

            if (cartProductsArr && cartProductsArr.length) {
                res.send({
                    name: "CartProductsRetrieved",
                    message:
                        "The products for the cart specified have been found. See attached.",
                    cartProductsArr,
                });
            } else if (!cartProductsArr.length) {
                next({
                    name: "NoProductsFound",
                    message: "No products were found in the cart specified.",
                });
            } else {
                next({
                    name: "ErrorRetrievingCartProducts",
                    message:
                        "There was an error getting the cart products for the specified cart",
                });
            }
        } else {
            next({
                name: "NoProductsFound",
                message: "No products were found in the cart specified.",
            });
        }
    } catch (error) {
        const { name, message } = error;
        next({ name, message });
    }
});

module.exports = cartsRouter;
