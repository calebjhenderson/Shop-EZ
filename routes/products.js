//  ./routes/products.js

const express = require("express");
const productsRouter = express.Router();
const {
    getAllProducts,
    createProduct,
    getProductById,
    deleteProduct,
    updateProduct,
} = require("../db/products.js");
const { requireUser, getUserById } = require("../db/users.js");

productsRouter.use(async function (req, res, next) {
    console.log("A request has been made to the /api/products endpoint.");
    next();
});

//Get All Products Route------------------------------WORKS!
productsRouter.get("/", async function (req, res, next) {
    const products = await getAllProducts();
    try {
        if (products) {
            res.send({ products });
        } else {
            res.send({ message: "Error Getting All Products." });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

//Create Product Route------------------------------WORKS!
productsRouter.post("/newproduct", requireUser, async function (
    req,
    res,
    next
) {
    const {
        name,
        description,
        price,
        quantity,
        delivery,
        rating,
        userId,
        categoryId,
    } = req.body;

    const productData = {};

    productData.name = name;
    productData.description = description;
    productData.price = price;
    productData.quantity = quantity;
    productData.delivery = delivery;
    productData.rating = rating;
    productData.userId = userId;
    productData.categoryId = categoryId;
    try {
        const newProduct = await createProduct(productData);
        if (newProduct) {
            res.send({ message: "Product Created!", newProduct });
        } else {
            res.send({ message: "Error Creating Product. " });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

//Edit Product Route------------------------------WORKS!
productsRouter.patch("/update/:productId", requireUser, async function (
    req,
    res,
    next
) {
    const { productId } = req.params;
    const {
        id,
        name,
        description,
        price,
        quantity,
        delivery,
        rating,
    } = req.body;
    const updateFields = {};

    if (name) {
        updateFields.name = name;
    }
    if (description) {
        updateFields.description = description;
    }
    if (price) {
        updateFields.price = price;
    }
    if (quantity) {
        updateFields.quantity = quantity;
    }
    if (delivery) {
        updateFields.delivery = delivery;
    }
    if (rating) {
        updateFields.rating = rating;
    }

    try {
        const product = await getProductById(productId);
        const user = await getUserById(id);
        const creatorId = product.userId;
        if (user.id === creatorId) {
            const updatedProduct = await updateProduct(id, updateFields);
            res.send({
                message: "Product has been updated!",
                product: updatedProduct,
            });
        } else {
            next({
                name: "Not Allowed",
                message: "You may only edit your own products.",
            });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

//Delete Products Route------------------------------WORKS!
productsRouter.delete("/delete/:productId", requireUser, async function (
    req,
    res,
    next
) {
    const { productId } = req.params;
    const { id } = req.user;

    try {
        const product = await getProductById(productId);
        const creatorId = product.userId;
        if (id === creatorId) {
            const deletedProduct = await deleteProduct(product.id);
            res.send({
                message: "Producted has been deleted!",
                product: deletedProduct,
            });
        } else {
            next({
                name: "Not allowed",
                message: "You may only delete your own products!",
            });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

module.exports = productsRouter;
