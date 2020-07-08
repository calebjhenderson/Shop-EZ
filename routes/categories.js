
const express = require('express');
const categoriesRouter = express.Router();
const { createCategory, updateCategory, getCategoryById, getAllCategories, deleteCategory, getCategoryByProductId } = require('../db/categories.js');
const { addCategoryToProduct, removeCategoryFromProduct } = require('../db/category_products.js')

const { requireUser } = require('../db/users.js')

categoriesRouter.use(async function( req, res, next){
    console.log("A request has been made to the /api/categories endpoint.");
    next();
});

// Get All Categories Route
categoriesRouter.get('/', async function( req, res, next ){
    const categories = await getAllCategories()
        try{
            res.send({ message:'Here are all of the categories', allCategories:categories  })
            } catch(error){
                console.error(error)
                const { name, message } = error
                next({ name, message })
            }
});

// Create Category Route
categoriesRouter.post('/create', async function( req, res, next ){
    const { name } = req.body 
    const categoryData = {}
    categoryData.name = name
    try {
        const newCategory = await createCategory(categoryData)
        res.send({ message:'New Category Created', category: newCategory})
    } catch(error){
        console.error(error)
            const { name, message } = error
            next({ name, message })
    }
});


// Update Category Route
categoriesRouter.patch('/update/:id', async function ( req, res, next ){
    const { id } = req.params
    const category = await getCategoryById(id)
    const { fields } = category
    try {
        if(category){
            const updatedCategory = await updateCategory(id, fields)
            res.send({ message:'Category updated.', category:updatedCategory})
        }  
    } catch(error){
        console.error(error)
            const { name, message } = error
            next({ name, message })   
    }
});

// Delete Category Route
categoriesRouter.delete('/delete/:id', async function ( req, res, next ){
    const { id } = req.params
    const deletedCategory = await deleteCategory(id)
    try {
        if(deleteCategory){
            res.send({ message:'Category deleted.', category:deletedCategory})
        }
    } catch(error){
        console.error(error)
        const { name, message } = error
        next({ name, message }) 
    }
});

// Add Category to Product Route
categoriesRouter.patch('/addcategory/:productId', async function( req, res, next){
    const { productId } = req.params
    const category = getCategoryByProductId(productId)
    const { categoryId } = category
    const updatedProduct = addCategoryToProduct( categoryId, productId )
    try{
        if(updatedProduct){
            res.send({message:'Category added to product', product:updatedProduct })
        }
    } catch( error ){
        console.error(error)
            const { name, message } = error
            next({ name, message })
    }
});

// Delete Category from Product Route
categoriesRouter.delete('/deletecategory/:productId', async function ( req, res, next ){
    const { productId } = req.params
    const productWithDeletedCategory = await removeCategoryFromProduct(productId)
    try{
        if(productWithDeletedCategory){
            res.send({message:'Category removed from product', product:productWithDeletedCategory})
        }
    } catch(error){
        console.error(error)
            const { name, message } = error
            next({ name, message })
    }
});


module.exports = categoriesRouter