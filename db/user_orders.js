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


/*---------------------------------- Exports ---------------------------------------*/

module.exports = {
    addOrderToUser,
    deleteOrderFromUser
}