// ./db/reviews.js

const { client } = require("../db/users")

const createReview = async ({
    productId,
    userId,
    title,
    rating,
    comment
}) => {
    try{
        const { rows: [ review ]} = await client.query(`
        INSERT INTO reviews ("productId", "userId", title, rating, comment)
        VALUES ($1,$2,$3,$4,$5)
        RETURNING *;
        `, [productId,userId,title,rating,comment]);

        return review

    } catch(error){
        throw error;
    }
}

const deleteReview = async (reviewId) => {
    try{
        const { rows: [ deletedReview ] } = await client.query(`
            DELETE FROOM reviews 
            WHERE id=$1
        `, [reviewId]);
    } catch(error){
        throw error;
    }
}

const getReviewsByProductId = async(productId) => {
    try {
        const { rows: [reviews] } = await client.query(
            `SELECT * FROM reviews
            WHERE "productId"=$1`
        , [productId]);

        return reviews;
    }catch(error){
        throw error;
    }
}

const getReviewsByUserId = async(userId) => {
    try {
        const { rows: [reviews] } = await client.query(
            `SELECT * FROM reviews
            WHERE "userId"=$1`
        , [userId]);

        return reviews;
    }catch(error){
        throw error;
    }
}


module.exports = {
    createReview,
    deleteReview,
    getReviewsByProductId,
    getReviewsByUserId,
}