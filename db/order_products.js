// ./db/order_products.js


/* ------------ Reference ------------*/


// id SERIAL PRIMARY KEY,
// "orderId" INTEGER REFERENCES orders(id) NOT NULL,
// "productId" INTEGER REFERENCES products(id) NOT NULL


/*------------------------------- Imports and Globals -----------------------------------*/


const client = require("./client");
const { getProductById } = require("./products");


/*---------------------------------- Functions ---------------------------------------*/


// Add productId to associated orderId in order_products table
const addProductToOrder = async (orderId, productId) => {

    try{
        
        const isProduct = await getProductById(productId);

        if(isProduct){

            const { rows: [ newOrderproduct ] } = await client.query(`
                INSERT INTO order_products ("orderId", "productId")
                VALUES($1, $2)
                RETURNING *;
            `, [orderId, productId]);

            console.log()
            return newOrderproduct;
        
        }
        else{
            throw{
                name: "ProductNotFoundError",
                message: "Cannot find product with that productId"
            }
        }

    }
    catch(error){
        console.error(`There's been an error adding a product to an order @ addProductToOrder(productId, orderId) in ./db/order_products.js. ${ error }`)
        throw error;
    }

}


// Remove productId from associated orderId in order_products table
const removeProductFromOrder = async (orderProductId) => {

    try{
        
        const isOrderProduct = await getOrderProductById(orderProductId);

        if(isOrderProduct){
            const { rows: [ removedOrderProduct ] } = await client.query(`
                DELETE FROM order_products
                WHERE id=$1
                RETURNING *;
            `, [orderProductId])

            return removedOrderProduct;
        }
        else{
            throw{
                name: "OrderProductNotFoundError",
                message: "Cannot find order product with that orderProductId"
            }
        }

    }
    catch(error){
        console.error(`There's been an error removing a product from an order @ addProductToOrder(orderProductId) in ./db/order_products.js. ${ error }`)
        throw error;
    }

}


// Returun order product object associated with the specified orderProductId
const getOrderProductById = async (orderProductId) => {

    try{

        const { rows: [ orderProduct ] } = await client.query(`
            SELECT * FROM order_products
            WHERE id=$1;
        `, [orderProductId])

        return orderProduct;
    }
    catch(error){
        console.error(`There's been an error getting an order product by id @ getOrderProductById(orderProductId) in ./db/order_products.js. ${ error }`)
        throw error;
    }

}


/*---------------------------------- Exports ---------------------------------------*/

module.exports = {
    addProductToOrder,
    removeProductFromOrder
}