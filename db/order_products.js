// ./db/order_products.js

/* ------------ Reference ------------*/

// id SERIAL PRIMARY KEY,
// "orderId" INTEGER REFERENCES orders(id) NOT NULL,
// "productId" INTEGER REFERENCES products(id) NOT NULL

/*------------------------------- Imports and Globals -----------------------------------*/

const client = require("./client");

/*---------------------------------- Functions ---------------------------------------*/

// Add productId to associated orderId in order_products table
const addProductToOrder = async (orderId, productId) => {
    try {
        const {
            rows: [newOrderproduct],
        } = await client.query(
            `
            INSERT INTO order_products ("orderId", "productId")
            VALUES($1, $2)
            RETURNING *;
        `,
            [orderId, productId]
        );

        return newOrderproduct;
    } catch (error) {
        console.error(
            `There's been an error adding a product to an order @ addProductToOrder(productId, orderId) in ./db/order_products.js. ${error}`
        );
        throw error;
    }
};

// Remove productId from associated orderId in order_products table
const removeProductFromOrder = async (orderId) => {
    try {
        const product = getProductsByOrderId(orderId);
        //isOrderProduct here is undefined
        if (product) {
            const {
                rows: [removedOrderProduct],
            } = await client.query(
                `
                DELETE FROM order_products
                WHERE id=$1
                RETURNING *;
            `,
                [product.id]
            );

            return removedOrderProduct;
        } else {
            throw {
                name: "OrderProductNotFoundError",
                message: "Cannot find order product with that orderProductId",
            };
        }
    } catch (error) {
        console.error(
            `There's been an error removing a product from an order @ removeProductFromOrder(orderProductId) in ./db/order_products.js. ${error}`
        );
        throw error;
    }
};

//Remove product from order by orderId
const removeOrderProductByOrderId = async (orderId) => {
    try {
        const isOrderProduct = await getOrderProductsByOrderId(orderId);
        console.log("OrderProduct", isOrderProduct);
        if (isOrderProduct) {
            const {
                rows: [removedOrderProduct],
            } = await client.query(
                `
                DELETE FROM order_products
                WHERE "orderId"=$1
                RETURNING *;
            `,
                [orderId]
            );

            return removedOrderProduct;
        } else {
            throw {
                name: "OrderProductNotFoundError",
                message: "Cannot find order product with that orderId",
            };
        }
    } catch (error) {
        console.error(
            `There's been an error removing a product from an order @ addProductToOrder(orderProductId) in ./db/order_products.js. ${error}`
        );
        throw error;
    }
};

// Return order product object associated with the specified orderProductId
const getOrderProductById = async (orderProductId) => {
    try {
        const {
            rows: [orderProduct],
        } = await client.query(
            `
            SELECT * FROM order_products
            WHERE id=$1;
        `,
            [orderProductId]
        );

        return orderProduct;
    } catch (error) {
        console.error(
            `There's been an error getting an order product by id @ getOrderProductById(orderProductId) in ./db/order_products.js. ${error}`
        );
        throw error;
    }
};
//Returns order products with the order id passed
const getOrderProductsByOrderId = async (orderId) => {
    console.log("OrderId", orderId);
    try {
        const {
            rows: [orderProduct],
        } = await client.query(
            `
            SELECT * FROM order_products
            WHERE "orderId"=$1;
        `,
            [orderId]
        );
        console.log("The orderproduct we need", orderProduct);
        return orderProduct;
    } catch (error) {
        console.error(
            `There's been an error getting an order product by id @ getOrderProductByOrderId(orderProductId) in ./db/order_products.js. ${error}`
        );
        throw error;
    }
};

// Return an array of order product objects associated with the specified productId
const getOrderProductsByProductId = async (productId) => {
    try {
        const { rows: orderProductsArr } = await client.query(
            `
            SELECT * FROM order_products
            WHERE "productId"=$1;
        `,
            [productId]
        );

        return orderProductsArr;
    } catch (error) {
        console.error(
            `There's been an error getting order products by product id @ getOrderProductsByProductId(productId) in ./db/order_products.js. ${error}`
        );
        throw error;
    }
};

//Returns all of the order products
const getAllOrderProducts = async () => {
    try {
        const { rows: orderProductsArr } = await client.query(`
            SELECT * FROM order_products;
            `);
        console.log("orderProducts", orderProductsArr);
        return orderProductsArr;
    } catch (error) {
        console.error(
            `There's been an error getting order products by product id @ getOrderProductsByProductId(productId) in ./db/order_products.js. ${error}`
        );
        throw error;
    }
};

//Removes order products by Id
const deleteOrderProducts = async (orderId) => {
    try {
        const {
            rows: [deletedOrderProduct],
        } = await client.query(
            `
            DELETE FROM order_products
            WHERE "orderId"=$1
            RETURNING *
        `,
            [orderId]
        );

        return deletedOrderProduct;
    } catch (error) {
        console.error(
            `There's been an error deleting an order @ deleteOrder(orderId) in ./db/order_products.js. ${error}`
        );
        throw error;
    }
};

const removeOrderProductById = async (orderProductId) => {
    try {
        const {
            rows: [deletedOrderProduct],
        } = await client.query(
            `
            DELETE FROM order_products
            WHERE "id"=$1
            RETURNING *
        `,
            [orderProductId]
        );

        return deletedOrderProduct;
    } catch (error) {
        console.error(
            `There's been an error deleting an order product @ deleteOrderProductById(orderProductId) in ./db/order_products.js. ${error}`
        );
        throw error;
    }
};

const getProductsByOrderId = async (orderId) => {
    try {
        const {
            rows: [products],
        } = await client.query(
            `
        SELECT * FROM products
        WHERE "id"=$1
        RETURNING *
        `,
            [orderId]
        );
    } catch (error) {
        ("Theres been an error getting products by order id @ getProductsByOrderId(orderId) in ./db/order_products.js");
    }
};

/*---------------------------------- Exports ---------------------------------------*/

module.exports = {
    addProductToOrder,
    removeProductFromOrder,
    getOrderProductsByProductId,
    removeOrderProductByOrderId,
    getOrderProductsByOrderId,
    getAllOrderProducts,
    deleteOrderProducts,
    getOrderProductById,
    removeOrderProductById,
};
