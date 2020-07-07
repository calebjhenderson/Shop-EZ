
const express = require('express');
const categoriesRouter = express.Router();
const { createCategory, updateCategory, getCategoryById, getAllCategories, deleteCategory, getCategoryByProductId } = require('../db/categories.js');
const { addCategoryToProduct, removeCategoryFromProduct } = require('../db/category_products.js')

const { requireUser } = require('../db/users.js')

categoriesRouter.use(function( req, res, next){
    console.log("A request has been made to the /api/categories endpoint.");
    next();
})

// Get All Categories Route
categoriesRouter.get('/', async function( req, res, next ){
    const categories = await getAllCategories()
    if(categories){
        res.send({ message:'Here are all of the categories', allCategories:categories  })
        next()
    }
})

// Create Category Route
categoriesRouter.post('/newcategory', async function( req, res, next ){
    const { name } = req.body 
    const categoryData = {}
    categoryData.name = name
    try {
        const newCategory = await createCategory(categoryData)
        res.send({ message:'New Category Created', category: newCategory})
        
    } catch(error) {
        console.error(error)
        next()
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
        
    } catch (error) {
        console.error(error)
        next()   
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
    } catch (error) {
        console.error(error)
        next()   
    }
});

// Add Category to Product Route
categoriesRouter.patch('/:productId', async function( req, res, next){
    const { productId } = req.params
    const category = getCategoryByProductId(productId)
    const { categoryId } = category
    const updatedProduct = addCategoryToProduct( categoryId, productId )
    try{
        if(updatedProduct){
            res.send({message:'Category added to product', product:updatedProduct })
        }
    } catch ( error ){
        console.error(error)
        next()

    }
})

// Delete Category from Product Route
categoriesRouter.delete('/:productId', async function ( req, res, next ){
    const { productId } = req.params
    const productWithDeletedCategory = await removeCategoryFromProduct(productId)
    try{
        if(productWithDeletedCategory){
            res.send({message:'Category removed from product', product:productWithDeletedCategory})
        }
    } catch(error){
        console.error(error)
        next()
    }
});


module.exports = categoriesRouter