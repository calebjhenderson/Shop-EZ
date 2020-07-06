// ./db/shops.js

const { client } = require("./users");

const createShop = async ({
    userId,
    name,
    products = '{}',
    description,
}) => {
    try {
        const { rows: [ shop ] }  = await client.query(`
        INSERT INTO shops ("userId", name, products, description)
        VALUES($1,$2,$3,$4)
        RETURNING *;
        `, [userId,name,products,description]);

        return shop;
        
    } catch(error){
        throw error;
    }
}

const updateShop = async (id, fields = {} ) => {

    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
      ).join(', ');

      console.log('setstring', setString)
    
      if (setString.length === 0) {
          
        return;
      }
    
      try {
        const { rows: [ updatedShop ] }= await client.query(`
          UPDATE shops
          SET ${ setString }
          WHERE id=${ id }
          RETURNING *;
        `, Object.values(fields));
    
        return updatedShop;
      } catch (error) {
        throw error;
      }
}

const deleteShop = async (shopId) => {
    try{
        const { rows: [ deletedShop ]} = await client.query(`
            DELETE FROM shops
            WHERE id=$1
        `,[shopId]);

        return deletedShop;
    }catch(error){
        throw error;
    }
}

const getAllShops = async () => {
    try {
        const { rows } = await client.query(
            `SELECT * FROM shops;`
        );

        return rows;
    }catch(error){
        throw error;
    }
}

const getShopById = async (shopId) => {
    try {
        const { rows: [ shop ] } = await client.query(
            `SELECT * FROM shops
            WHERE id=$1;`
        , [shopId]);
        
        if(!shop){
            throw {name:"NoShopFoundError",
            message: "Cannot find shop by that shop Id"
             }

        }

        return shop;
    }catch(error){
        throw error;
    }
}

const getShopByUserId = async (userId) => {
    try {
        const { rows: [ shop ] } = await client.query(
            `SELECT * FROM shops
            WHERE "userID"=$1;`
        , [userId]);
        
        if(!shop){
            throw {name:"NoShopFoundError",
            message: "Cannot find shop with that userId"
             }

        }

        return shop;
    }catch(error){
        throw error;
    }
}

module.exports = {
    createShop,
    updateShop,
    deleteShop,
    getAllShops,
    getShopById,
    getShopByUserId,
}