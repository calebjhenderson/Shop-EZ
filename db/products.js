// ./db/products.js

const { client } = require("./users");

const createProduct = async ({
    name,
    description,
    price,
    quantity,
    delivery = '{}',
    rating,
    userId,
    categoryId = '{}',

}) => {
    
    try{
    const { rows: [ product ] } = await client.query(
        `INSERT INTO products (name, description, price, quantity, delivery, rating, "userId", "categoryId")
        VALUES($1,$2,$3,$4,$5,$6,$7,$8)
        RETURNING *;
        `, [name,description,price,quantity,delivery,rating,userId,categoryId]
    );

        return product;

    } catch (error) {
    throw error;
  }
}

const updateProduct = async (id, fields = {} ) => {

    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
      ).join(', ');

      console.log('setstring', setString)
    
      if (setString.length === 0) {
          console.log("test")
        return;
      }
    
      try {
        const { rows: [ product ] }= await client.query(`
          UPDATE products
          SET ${ setString }
          WHERE id=${ id }
          RETURNING *;
        `, Object.values(fields));
    
        return product;
      } catch (error) {
        throw error;
      }
}

const deleteProduct = async (productId) => {
    try {
        const { rows: [ deletedProduct ]} = await client.query(`
            DELETE FROM products
            WHERE id=$1
        `, [productId]);
        
        return deletedProduct;
    } catch(error) {
        throw error;
    }
}

const getAllProducts = async () => {

   try{
    const { rows } = await client.query(`
    SELECT * FROM products;
    `);
    
    return rows;

   } catch(error){
       throw error;
   }
    
}

const getProductById = async(productId) => {
    try{ 
        const { rows: [product] } = await client.query(`
        SELECT * FROM products 
        WHERE id=${ productId }
        `);

     if (!product) {
         throw { 
             name: "ProductNotFoundError",
             message: "Cannot find product with that productId"
         };
     }

     return product;
    } catch(error){
        throw error;
    }
}

const getProductByName = async(productName) => {
    try{ 
        const { rows: [product] } = await client.query(`
        SELECT * FROM products 
        WHERE name=${ productName }
        `);

     if (!product) {
         throw { 
             name: "ProductNotFoundError",
             message: "Cannot find product with that product Name"
         };
     }

     return product;
    } catch(error){
        throw error;
    }
}

const getProductsByUserId = async(userId) => {
    try{ 
        const { rows } = await client.query(`
        SELECT * FROM products 
        WHERE "userId"=${ userId }
        `);

     return rows;

    } catch(error){
        throw error;
    }
}


module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    getProductByName,
    getProductsByUserId,
    updateProduct,
    deleteProduct,
}