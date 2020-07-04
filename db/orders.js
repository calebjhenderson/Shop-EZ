// ./db/orders.js

const { client } = require("./users")

const createOrder = async ({
    userId,
    products,
    orderDate,
    orderTotal,
    shippingAddress
}) => {
    try {
        const { rows: [ order ] } = await client.query(`
        INSERT INTO orders("userId", products, "orderDate", "orderTotal", "shippingAddress")
        VALUES($1,$2, $3, $4, $5)
        RETURNING *;`, [userId,products,orderDate,orderTotal,shippingAddress] );

        return order;
    } catch(error){
        throw error;
    }
}

module.exports = {
    createOrder
}