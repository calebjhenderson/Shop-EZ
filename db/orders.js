// ./db/orders.js


/* ------------ Reference ------------*/


// id SERIAL PRIMARY KEY,
// "userId" INTEGER REFERENCES users(id) NOT NULL,
// products INTEGER [] NOT NULL,
// "orderDate" DATE NOT NULL,
// "orderTotal" FLOAT(2) NOT NULL,
// "shippingAddress" VARCHAR(255) NOT NULL,
// fulfilled BOOLEAN DEFAULT false


/*------------------------------- Imports and Globals -----------------------------------*/


const client = require("./client");


/*---------------------------------- Functions ---------------------------------------*/


// Creates a new order in the orders table and returns the new order object
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
        console.error(`There's been an error creating a new order @ createOrder({userId, products, orderDate, orderTotal, shippingAddress}) in ./db/orders.js. ${ error }`)
        throw error;
    }
}


// Updates an order in the orders table and returns the updated order object
const updateOrder = async (id, fields = {} ) => {

    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

    if (setString.length === 0) {return}
    
    try {
        const { rows: [ updatedOrder ] }= await client.query(`
            UPDATE orders
            SET ${ setString }
            WHERE id=${ id }
            RETURNING *;
        `, Object.values(fields));
    
        return updatedOrder;

      }
      catch(error){
        console.error(`There's been an error updating an order @ updateOrder(id, fields={}) in ./db/orders.js. ${ error }`)
        throw error;
      }
}


// Deletes an order from the orders table and returns the deleted order object
const deleteOrder = async (orderId) => {

    try{

        const { rows: [deletedOrder] } = await client.query(`
            DELETE FROM orders
            WHERE id=$1
            RETURNING *
        `, [orderId] )

        return deletedOrder;

    }
    catch(error){
        console.error(`There's been an error deleting an order @ deleteOrder(orderId) in ./db/orders.js. ${ error }`)
        throw error;
    }

}


// Returns an array of all the order objects in the orders table
const getAllOrders = async () => {

    try{

        const { rows } = await client.query(
            `SELECT * FROM orders;
        `);

        return rows;

    }
    catch(error){
        console.error(`There's been an error getting all orders @ getAllOrders() in ./db/orders.js. ${ error }`)
        throw error;
    }

}


// Returns the order object of the order associated with the specified orderId, it it exists
const getOrderById = async (orderId) => {

    try{

        const { rows: [ order ] } = await client.query(
            `SELECT * FROM orders 
            WHERE id=${orderId}`
        );

        return order;

    }
    catch(error){
                console.error(`There's been an error getting an order by ID @ getOrderById(orderId) in ./db/orders.js. ${ error }`)
        throw error;
    }

}


// Returns an array of orders associated with the user with the specified userId, if any
const getOrderByUserId = async (userId) => {
    
    try{

        const { rows: [ order ] } = await client.query(
            `SELECT * FROM orders 
            WHERE "userId"=${userId}`
        );

        return order;

    }
    catch(error){
        console.error(`There's been an error getting an order by userId @ getOrderByUserId(UserId) in ./db/orders.js. ${ error }`)
        throw error;
    }

}


/*---------------------------------- Exports ---------------------------------------*/


module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getAllOrders,
    getOrderById,
    getOrderByUserId,
}