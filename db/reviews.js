// ./db/reviews.js


const createReview = async ({
    productId,
    userId,
    title,
    rating,
    comment,
}) => {
    try{
        const { rows: [ review ]} = await client.query(`
        INSERT INTO reviews ("productId","userId", title, rating,comment)
        VALUES($1,$2,$3,$4,5)
        RETURNING *;
        `, [productId,userId,title,rating,comment]);

        return review

    } catch(error){
        throw error;
    }
}

module.exports = {
    createReview
}