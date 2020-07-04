// ./db/orders.js

const { client } = require("./users")

const createOrder = async ({
    userId,
    orderId
}) => {
    try {
        const { rows: [ order ] } = await client.query(`
        INSERT INTO orders("userId, "orderId")
        VALUES($1,$2)`, [userId,orderId] );

        return order;
        
    } catch(error){
        throw error;
    }
}

module.exports = {
    createOrder
}