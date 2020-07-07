
//  ./routes/reviews.js

const express = require('express');
const reviewsRouter = express.Router();
const { createReview, getReviewById, updateReview, deleteReview } = require('../db/reviews.js')
const { addReviewToProduct, getReviewbyReviewId, removeReviewFromProduct, getProductByReviewId } = require('../db/product_reviews')
const { requireUser } = require('../db/users.js')

reviewsRouter.use(function( req, res, next){
    console.log("A request has been made to the /api/reviews endpoint.");
    next();
})

//Create Review Route
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

// Update Review Route
reviewsRouter.patch('/:reviewId', requireUser, async function( req, res, next){
    const { reviewId } = req.params
    const review = await getReviewById(reviewId)
    const { fields } = review
    try {
        const updatedReview = await updateReview(reviewId, fields)
        if(updatedReview){
            res.send({ message:'Your review has been updated.', review:updatedReview })
        }
    } catch (error) {
        console.error(error)
        next()
    }
});

// Delete Review Route
reviewsRouter.delete('/:reviewId', requireUser, async function( req, res, next ){
    const { reviewId } = req.params
    const review = await getReviewById(reviewId)
    try {
        const deletedReview = await deleteReview(review)
        if(deletedReview){
            res.send({ message:'Your review has deleted.', review:deletedReview })
        }
    } catch (error) {
        console.error(error)
        next()
    }
});

// // Add Review To Product Route
// reviewsRouter.put('/:reviewId', async function ( req, res, next){

//     const { reviewId } = req.params

//     //This SELECT helper is not written
//     const product = await getProductByReviewId(reviewId)
//     const { productId } = product;
//     try{
//         const reviewedProduct = await addReviewToProduct(productId, reviewId)
//         res.send({ message:'Product review submitted.', product:reviewedProduct})
//     }catch(error){
//         console.error(error)
//         next()
//     }
// });


// Remove Review From Product Routes
// reviewsRouter.delete('/:reviewId', async function ( req, res, next){
//     const { reviewId } = req.params
//     const removedProductReview = await removeReviewFromProduct(reviewId)
//     try{
//         if(removedProductReview){
//             res.send({ message:'Review removed from product', product:removedProductReview})
//         }
//     }catch(error){

//     } 
// });

module.exports = reviewsRouter
