//  ./routes/products.js

const express = require('express');
const productsRouter = express.Router();

productsRouter.use(function( req, res, next){
    console.log("A request has been made to the /api/products endpoint.");
    next();
})

productsRouter.post(function( req, res ){})
productsRouter.patch(function( req, res ){})
productsRouter.delete(function( req, res ){})

module.exports = productsRouter