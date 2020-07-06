const express = require('express');
const reviewsRouter = express.Router();
const { createReview } = require('../db/reviews.js')

reviewsRouter.post('/', async function( req, res, next ){
    const { productId, userId, title, rating, comment } = req.body

    const reviewData = {}

    reviewData.productId = productId
    reviewData.userId = userId
    reviewData.title = title
    reviewData.rating = rating
    reviewData.comment = comment 

    try {
        const newReview = await createReview(reviewData)
        res.send({ message:'Thanks for submitting a review!', review:newReview} )
        
    } catch (error) {
        console.error(error)
        const{ name, message } = error
        next({ name, message })
    }
});

module.exports = reviewsRouter
