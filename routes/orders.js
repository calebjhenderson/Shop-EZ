//  ./routes/orders.js

const express = require('express');
const ordersRouter = express.Router();

ordersRouter.use(function( req, res, next){
    console.log("A request has been made to the /api/orders endpoint.");
    next();
})

ordersRouter.post(function( req, res ){})
ordersRouter.patch(function( req, res ){})
ordersRouter.delete(function( req, res ){})

module.exports = ordersRouter