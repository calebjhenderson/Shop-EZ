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

const updateOrder = async (id, fields = {} ) => {

    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
      ).join(', ');

      console.log('setstring', setString)
    
      if (setString.length === 0) {
        return;
      }
    
      try {
        const { rows: [ updatedOrder ] }= await client.query(`
          UPDATE orders
          SET ${ setString }
          WHERE id=${ id }
          RETURNING *;
        `, Object.values(fields));
    
        return updatedOrder;
      } catch (error) {
        throw error;
      }
}

const deleteOrder = async (orderId) => {
    try{
        const { rows: [deletedOrder] } = await client.query(`
            DELETE FROM orders
            WHERE id=$1
        `, [orderId] )

        return deletedOrder;
    }catch(error){
        throw error;
    }
}

const getAllOrders = async () => {
    try{
        const { rows } = await client.query(
            `SELECT * FROM orders;
        `);

        return rows;

    }catch(error){
        throw error;
    }
}



const getOrderById = async (orderId) => {
    try{
        const { rows: [ order ] } = await client.query(
            `SELECT * FROM orders 
            WHERE id=${orderId}`
        );

        return order;
    }catch(error){
        throw error;
    }
}

const getOrderByUserId = async (userId) => {
    try{
        const { rows: [ order ] } = await client.query(
            `SELECT * FROM orders 
            WHERE "userId"=${userId}`
        );

        return order;
    }catch(error){
        throw error;
    }
}

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getAllOrders,
    getOrderById,
    getOrderByUserId,
}