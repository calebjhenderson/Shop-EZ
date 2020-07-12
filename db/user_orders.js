// ./db/user_orders.js


/* ------------ Reference ------------*/


// id SERIAL PRIMARY KEY,
// "userId" INTEGER REFERENCES users(id) NOT NULL,
// "orderId" INTEGER REFERENCES orders(id) NOT NULL


/*------------------------------- Imports and Globals -----------------------------------*/


const client = require("./client");


/*---------------------------------- Functions ---------------------------------------*/


// Adds productId to associated userId in user_products table
const addOrderToUser = async(userId, orderId) => {
    
    try{
        
        const { rows: [ result ] } = await client.query(`
            INSERT INTO user_orders("userId","orderId")
            VALUES ($1,$2)
            RETURNING *;
            `, [userId,orderId]
        );

        return result;

    }
    catch(error){
        console.error(`There's been an error adding an order to a user @ addOrderToUser(productId, orderId) in ./db/user_orders.js. ${ error }`);
        throw error;
    }

}


// Removes productId from associated userId in user_products table
const deleteOrderFromUser = async (userOrderId) => {
    
    try{

        const isUserOrder = await getUserOrderById(userOrderId);
        
        if(isUserOrder){
            const { rows: [ deletedResult ] } = await client.query(`
                DELETE FROM user_orders
                WHERE id=$1
                RETURNING *;
            `, [userOrderId]);

            return deletedResult;
        }
        else{
            throw ({
                name: "UserProductNotFoundError",
                message: "Cannot find user product with that userProductId"
            })
        }
        
    }
    catch(error){
        console.error(`There's been an error deleting an order from a user @ deleteOrderFromUser(userOrderId) in ./db/user_orders.js. ${ error }`);
        throw error;
    }
}

//Delete order from user by orderId
const deleteOrderFromUserByOrderId = async (id) => {
    try{
        const isUserOrder = await getUserOrdersByOrderId(id);
        if(isUserOrder){
            const { rows: [ deletedResult ] } = await client.query(`
                DELETE FROM user_orders
                WHERE id=$1
                RETURNING *;
            `, [isUserOrder.id]);

            return deletedResult;
        }
        else{
            throw ({
                name: "UserProductNotFoundError",
                message: "Cannot find user product with that userProductId"
            })
        }
        
    }
    catch(error){
        console.error(`There's been an error deleting an order from a user @ deleteOrderFromUser(userOrderId) in ./db/user_orders.js. ${ error }`);
        throw error;
    }
}
// Returns user product object connected to provided userProductId
const getUserOrderById = async (userOrderId) => {

    try{

        const { rows: [ userOrder ] } = await client.query(`
            SELECT * FROM user_orders
            WHERE id=$1;
        `, [userOrderId]);

        return userOrder;

    }
    catch(error){
        console.error(`There's been an error getting a user order by id @ getUserOrderById(userProductId) in ./db/user_orders.js. ${ error }`)
        throw error;
    }

}


// Returns an array of all userOrder objects associated with the specified userId, if any 
const getUserOrdersByUserId = async(userId) => {

    try{
        
        const { rows: userOrdersArr } = await client.query(`
            SELECT * FROM user_orders
            WHERE "userId"=$1;
        `, [userId])

        return userOrdersArr;

    }
    catch(error){
        console.error(`There's been an error getting user orders by user id @ getUserOrdersByUserId(userId) in ./db/user_products.js. ${ error }`)
        throw error;
    }

}

//By orderId
const getUserOrdersByOrderId = async(orderId) => {

    try{
        
        const { rows: userOrdersArr } = await client.query(`
            SELECT * FROM user_orders
            WHERE "orderId"=$1;
        `, [orderId])

        return userOrdersArr;

    }
    catch(error){
        console.error(`There's been an error getting user orders by order id @ getUserOrdersByOrderId(orderId) in ./db/user_products.js. ${ error }`)
        throw error;
    }

}

//Deletes a user_order based off orderId
const deleteUserOrder = async (orderId) => {

    try{

        const { rows: [deletedOrder] } = await client.query(`
            DELETE FROM user_orders
            WHERE "orderId"=$1
            RETURNING *
        `, [orderId] )
        if(deletedOrder){
            return deletedOrder;
        }else {
            throw ({message:'User_order does not exist'})
        }
    }
    catch(error){
        console.error(`There's been an error deleting an order @ deleteOrder(orderId) in ./db/orders.js. ${ error }`)
        throw error;
    }
}


/*---------------------------------- Exports ---------------------------------------*/

module.exports = {
    addOrderToUser,
    deleteOrderFromUser,
    getUserOrdersByUserId,
    getUserOrdersByOrderId,
    deleteOrderFromUserByOrderId,
    deleteUserOrder
}