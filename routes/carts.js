//  ./routes/carts.js

const express = require('express');
const cartsRouter = express.Router();

cartsRouter.use(function( req, res, next){
    console.log("A request has been made to the /api/carts endpoint.");
    next();
})

cartsRouter.post(function( req, res ){})
cartsRouter.patch(function( req, res ){})
cartsRouter.delete(function( req, res ){})

module.exports = cartsRouter;