
const express = require('express');
const categoriesRouter = express.Router();
const { createCategory } = require('../db/categories.js');
const { requireUser } = require('../db/users.js')

categoriesRouter.use(function( req, res, next){
    console.log("A request has been made to the /api/categories endpoint.");
    next();
})


categoriesRouter.post('/', async function( req, res, next ){
    const { name } = req.body 
    const categoryData = {}
    categoryData.name = name
    try {
        const newCategory = await createCategory(categoryData)
        res.send({ message:'New Category Created', category: newCategory})
        
    } catch(error) {
        console.error(error)
        const { name, message } = error
        next({ name, message })   
    }
});

module.exports = categoriesRouter