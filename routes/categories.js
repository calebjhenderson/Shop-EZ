const express = require("express");
const categoriesRouter = express.Router();
const {
    createCategory,
    updateCategory,
    getCategoryById,
    getAllCategories,
    deleteCategory,
    getCategoryByName,
} = require("../db/categories.js");
const {
    addCategoryToProduct,
    removeCategoryFromProduct,
} = require("../db/category_products.js");

const { requireUser } = require("../db/users.js");
const { getProductById } = require("../db/index.js");

categoriesRouter.use(async function (req, res, next) {
    console.log("A request has been made to the /api/categories endpoint.");
    next();
});

// Get All Categories Route------------------------------WORKS!
categoriesRouter.get("/", async function (req, res, next) {
    try {
        const categories = await getAllCategories();
        if (categories) {
            res.send({
                message: "Here are all of the categories",
                allCategories: categories,
            });
        } else {
            res.send({ message: "Error getting All Categories" });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

// Create Category Route------------------------------WORKS!
categoriesRouter.post("/create", async function (req, res, next) {
    const { name } = req.body;
    const categoryData = {};
    categoryData.name = name;
    try {
        const newCategory = await createCategory(categoryData);
        if (newCategory) {
            res.send({
                message: "New Category Created",
                category: newCategory,
            });
        } else {
            res.send({ message: "Error Creating Category." });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

// Update Category Route------------------------------WORKS!
categoriesRouter.patch("/update/:categoryId", requireUser, async function (
    req,
    res,
    next
) {
    const { categoryId } = req.params;
    const { name } = req.body;
    const categoryData = {};
    categoryData.name = name;
    try {
        const category = await getCategoryById(categoryId);
        if (category) {
            const updatedCategory = await updateCategory(
                categoryId,
                categoryData
            );
            res.send({
                message: "Category updated.",
                category: updatedCategory,
            });
        } else {
            res.send({ message: "Error Updating Category." });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

// Delete Category Route------------------------------WORKS!
categoriesRouter.delete("/delete/:id", async function (req, res, next) {
    const { id } = req.params;

    try {
        const deletedCategory = await deleteCategory(id);
        if (deletedCategory) {
            res.send({
                message: "Category deleted.",
                category: deletedCategory,
            });
        } else {
            res.send({ message: "Error Deleting Category." });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

// Add Category to Product Route------------------------------WORKS!
categoriesRouter.patch("/addcategory/:productId", async function (
    req,
    res,
    next
) {
    const { categoryName } = req.body;
    const { productId } = req.params;

    try {
        const category = await getCategoryByName(categoryName);
        const { id } = category;
        const product = await getProductById(productId);
        const updatedProduct = await addCategoryToProduct(id, product.id);
        if (updatedProduct) {
            res.send({
                message: "Category added to product",
                product: updatedProduct,
            });
        } else {
            res.send({ message: "Error Adding Category to Product." });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

// Delete Category from Product Route------------------------------WORKS!
categoriesRouter.delete("/deletecategory/:productId", async function (
    req,
    res,
    next
) {
    const { productId } = req.params;

    try {
        const productWithDeletedCategory = await removeCategoryFromProduct(
            productId
        );
        if (productWithDeletedCategory) {
            res.send({
                message: "Category removed from product",
                product: productWithDeletedCategory,
            });
        } else {
            res.send({ message: "Error removing Category from Product." });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

module.exports = categoriesRouter;
