const express = require('express');
const shopsRouter = express.Router();

shopsRouter.use(function( req, res, next){
    console.log("A request has been made to the /api/shops endpoint.");
    next();
})


shopsRouter.post(function( req, res ){})
shopsRouter.patch(function( req, res ){})
shopsRouter.delete(function( req, res ){})

module.exports = shopsRouter