// ./db/carts.js

const { client } = require("./users");
const { query } = require("express");

const createCart = async ({
    userId=NaN,
    products = '{}',
}) => {
    try {

        //NaN is the only value not equal to istelf, so this will return true only if userId is NaN
        const isNotNum = userId !== userId;

        if(!isNotNum){
            const { rows: [ cart ] } = await client.query(
                `INSERT INTO carts ("userId",products)
                VALUES($1,$2)
                RETURNING *;
                `, [userId,products]
            )
            return cart;
        }
        else{
            const { rows: [ cart ] } = await client.query(
                `INSERT INTO carts (products)
                VALUES($1)
                RETURNING *;
                `, [products]
            )
            return cart;
        }
    } catch(error){
        throw error;
    }
}

const updateCart = async (id, fields ) => {

const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');

  if (setString.length === 0) {
      console.log("test")
    return;
  }

  try {
    const { rows: [ cart ] }= await client.query(`
      UPDATE carts
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
    `, Object.values(fields));

    return cart;
  } catch (error) {
    throw error;
  }
}

const deleteCart = async(cartId) => {
    try{
        const { rows: [ deletedCart ]} = await client.query(`
        DELETE FROM carts
        WHERE id=$1
        `, [cartId]);

        console.log('deletedCart is ', deletedCart);

        return deletedCart;
    } catch(error){
        throw error;
    }
}

const getCartByUserId = async (userId) => {
    try { 
        const { rows: [ cart ]} = await client.query(
            `SELECT * FROM carts
            WHERE "userId"=$1
        `, [userId]);

        return cart;
    }catch(error){
        throw error;
    }
}

module.exports = {
    createCart,
    updateCart,
    deleteCart,
    getCartByUserId,
}