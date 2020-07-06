const express = require('express');
const categoriesRouter = express.Router();
const { createCategory } = require('../db/categories.js');
const { requireUser } = require('../db/users.js')


categoriesRouter.post('/', requireUser, async function( req, res, next ){
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