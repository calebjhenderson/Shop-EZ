// ./db/carts.js

const { client } = require("./users")

const createCart = async ({
    userId=NaN,
    products = '{}',
}) => {
    try {

        //NaN is the only value not equal to istelf, so this will return true only if userId is NaN
        const isNotNum = userId !== userId;

        if(!isNotNum){
            const { rows: [ cart ] } = await client.query(
                `INSERT INTO carts ("userId",products)
                VALUES($1,$2)
                RETURNING *;
                `, [userId,products]
            )
            return cart;
        }
        else{
            const { rows: [ cart ] } = await client.query(
                `INSERT INTO carts (products)
                VALUES($1)
                RETURNING *;
                `, [products]
            )
            return cart;
        }
    } catch(error){
        throw error;
    }
}

module.exports = {
    createCart
}