//  ./routes/reviews.js

const express = require('express');
const reviewsRouter = express.Router();

reviewsRouter.use(function( req, res, next){
    console.log("A request has been made to the /api/reviews endpoint.");
    next();
})

reviewsRouter.post(function( req, res ){})
reviewsRouter.patch(function( req, res ){})
reviewsRouter.delete(function( req, res ){})

module.exports = reviewsRouter