
const express = require('express');
const categoriesRouter = express.Router();
const { createCategory, updateCategory, getCategoryById, getAllCategories, deleteCategory } = require('../db/categories.js');
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
categoriesRouter.post('/', async function( req, res, next ){
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
categoriesRouter.patch('/:id', async function ( req, res, next ){
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
categoriesRouter.delete('/:id', async function ( req, res, next ){
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



module.exports = categoriesRouter