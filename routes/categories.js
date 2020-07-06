//  ./routes/categories.js

const express = require('express');
const categoriesRouter = express.Router();

categoriesRouter.use(function( req, res, next){
    console.log("A request has been made to the /api/categories endpoint.");
    next();
})

categoriesRouter.post(function( req, res ){})
categoriesRouter.patch(function( req, res ){})
categoriesRouter.delete(function( req, res ){})

module.exports = categoriesRouter