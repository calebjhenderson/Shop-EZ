// ./db/orders.js

/* ------------ Reference ------------*/

// id SERIAL PRIMARY KEY,
// products INTEGER [] NOT NULL,
// "orderDate" DATE NOT NULL,
// "orderTotal" FLOAT(2) NOT NULL,
// "shippingAddress" VARCHAR(255) NOT NULL,
// fulfilled BOOLEAN DEFAULT false

/*------------------------------- Imports and Globals -----------------------------------*/

const client = require("./client");
const { addProductToOrder } = require("./order_products");
const { addOrderToUser } = require("./user_orders");

/*---------------------------------- Functions ---------------------------------------*/

// Creates a new order in the orders table and returns the new order object
const createOrder = async ({
    userId,
    products = "{}",
    orderDate,
    orderTotal,
    shippingAddress,
}) => {
    try {
        const {
            rows: [order],
        } = await client.query(
            `
        INSERT INTO orders(products, "orderDate", "orderTotal", "shippingAddress")
        VALUES($1,$2, $3, $4)
        RETURNING *;`,
            [products, orderDate, orderTotal, shippingAddress]
        );

        // Add newly created order to user_orders table
        const orderToUserResult = await addOrderToUser(userId, order.id);

        //For each product the order is being associated with, create an entry in the order_products table for it
        const targetProductArr = products
            .slice(1, products.length - 1)
            .split("");
        const finalProductArr = targetProductArr.filter(
            (char) => char !== " " && char !== ","
        );
        const productOrder = await Promise.all(
            finalProductArr.map(async (product) => {
                return await addProductToOrder(order.id, product);
            })
        );

        return order;
    } catch (error) {
        console.error(
            `There's been an error creating a new order @ createOrder({products, orderDate, orderTotal, shippingAddress}) in ./db/orders.js. ${error}`
        );
        throw error;
    }
};

// Updates an order in the orders table and returns the updated order object
const updateOrder = async (id, fields = {}) => {
    const setString = Object.keys(fields)
        .map((key, index) => `"${key}"=$${index + 1}`)
        .join(", ");

    if (setString.length === 0) {
        return;
    }

    try {
        const {
            rows: [updatedOrder],
        } = await client.query(
            `
            UPDATE orders
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `,
            Object.values(fields)
        );

        return updatedOrder;
    } catch (error) {
        console.error(
            `There's been an error updating an order @ updateOrder(id, fields={}) in ./db/orders.js. ${error}`
        );
        throw error;
    }
};

// Deletes an order from the orders table and returns the deleted order object
const deleteOrder = async (orderId) => {
    //user_orders has a record of this orderId
    try {
        const {
            rows: [deletedOrder],
        } = await client.query(
            `
            DELETE FROM orders
            WHERE id=$1
            RETURNING *
        `,
            [orderId]
        );

        return deletedOrder;
    } catch (error) {
        console.error(
            `There's been an error deleting an order @ deleteOrder(orderId) in ./db/orders.js. ${error}`
        );
        throw error;
    }
};

// Returns an array of all the order objects in the orders table
const getAllOrders = async () => {
    try {
        const { rows } = await client.query(
            `SELECT * FROM orders;
        `
        );

        return rows;
    } catch (error) {
        console.error(
            `There's been an error getting all orders @ getAllOrders() in ./db/orders.js. ${error}`
        );
        throw error;
    }
};

// Returns the order object of the order associated with the specified orderId, it it exists
const getOrderById = async (orderId) => {
    try {
        const {
            rows: [order],
        } = await client.query(
            `SELECT * FROM orders 
            WHERE id=${orderId}`
        );

        return order;
    } catch (error) {
        console.error(
            `There's been an error getting an order by ID @ getOrderById(orderId) in ./db/orders.js. ${error}`
        );
        throw error;
    }
};

const getOrderByUserId = async (userId) => {
    try {
        const {
            rows: [orders],
        } = await client.query(
            `SELECT * FROM orders
            WHERE id = ${userId}
            `
        );
        return orders;
    } catch (error) {
        console.error;
        const { name, message } = error;
        next({ name, message });
    }
};

/*---------------------------------- Exports ---------------------------------------*/

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getAllOrders,
    getOrderById,
    getOrderByUserId,
};
