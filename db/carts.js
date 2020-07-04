// ./db/carts.js

const { client } = require("./users")

const createCart = async ({
    userId,
    products = [],
}) => {
    try {
        const { rows: [ cart ] } = await client.query(
            `INSERT INTO carts ("userId",products)
            VALUES($1,$2)
            RETURNING *;
            `, [userId,products]
        )
    } catch(error){
        throw error;
    }
}

module.exports {
    createCart
}