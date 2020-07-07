// ./db/products.js


/* ------------ Reference ------------*/

// id SERIAL PRIMARY KEY,
// name VARCHAR(255) NOT NULL,
// description TEXT NOT NULL,
// price FLOAT(2) NOT NULL,
// quantity INTEGER NOT NULL,
// delivery TEXT [],
// rating FLOAT(1),
// "userId" INTEGER REFERENCES users(id) NOT NULL,
// "categoryId" INTEGER []


/*------------------------------- Imports and Globals -----------------------------------*/


const client = require("./client");
const { getReviewsByProductId, deleteReview } = require("./reviews");
const { addProductToUser, deleteProductFromUser } = require("./user_products");
const { addCategoryToProduct } = require("./category_products");


/*---------------------------------- Functions ---------------------------------------*/


// Creates a new product in the products table and returns the new product object
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

        // Add newly created product to user_products table
        const userProductsResult = await addProductToUser(product.id, product.userId);

        //For each category the product is being associated with, create an entry in the category_products table for it
        const targetCategoryArr = categoryId.slice(1, categoryId.length - 1).split("");
        const finalCategoryArr = targetCategoryArr.filter((char) => char !== ' ' && char !== ',');
        const prodcutCategories = await Promise.all(finalCategoryArr.map(async (categoryId) => {return await addCategoryToProduct(categoryId, product.id)}));
        


        return product;

    }
    catch (error) {
        console.error(`There's been an error creating a product @ createProduct({ name, description, price, quantity, delivery={}, rating, userId, categoryId={} }) in ./db/products.js. ${ error }`)
        throw error;
    }
}


// Updates a product in the products table and returns the updated product object
const updateProduct = async (id, fields = {} ) => {

    console.log('here at updateProduct');
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
      }
      catch (error) {
        console.error(`There's been an error updating a product @ updateProduct(id, fields = {}) in ./db/products.js. ${ error }`)
        throw error;
      }
}


// Deletes a product from the products table and returns the deleted product object
const deleteProduct = async (productId) => {

    try {

        const isProductReviews = await getReviewsByProductId(productId);
        if(isProductReviews){const deletedReview = await deleteReview(productId)}

        const isUserProducts = await getUserProductsByProductId(productId);
        

        const { rows: [ deletedProduct ]} = await client.query(`
            DELETE FROM products
            WHERE id=$1
            RETURNING *;
        `, [productId]);
        
        return deletedProduct;
    } catch(error) {
        console.error(`There's been an error deleting a product @ deleteProduct(productId) in ./db/products.js. ${ error }`)
        throw error;
    }
}


// Returns an array of all product objects in the products table
const getAllProducts = async () => {

    try{

        const { rows } = await client.query(`
            SELECT * FROM products;
        `);

        return rows;

    }
    catch(error){
        console.error(`There's been an error getting all products @ getAllProducts() in ./db/products.js. ${ error }`)
        throw error;
    }
    
}


// Reutrns the product object of the product with the specified productId, if it exists
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

    }
    catch(error){
        console.error(`There's been an error getting a product by its ID @ getProductById(productId) in ./db/products.js. ${ error }`)
        throw error;
    }
}


// Returns the product object of the product with the specified name, if it exists
const getProductByName = async(productName) => {
    
    try{ 

        const { rows: [product] } = await client.query(`
        SELECT * FROM products 
        WHERE name=$1
        `, [productName]);

     if (!product) {
         throw { 
             name: "ProductNotFoundError",
             message: "Cannot find product with that product Name"
         };
     }

     return product;

    }
    catch(error){
        console.error(`There's been an error getting a product by name @ getProductByName(productName) in ./db/products.js. ${ error }`)
        throw error;
    }
}


// Returns an array of all products associated with the user with the specified userId, if any
const getProductsByUserId = async(userId) => {
    
    try{ 

        const { rows } = await client.query(`
        SELECT * FROM products 
        WHERE "userId"=$1
        `, [userId]);

     return rows;

    }
    catch(error){

        console.error(`There's been an error getting all products by userId @ getAllProductsByUserId(userId) in ./db/products.js. ${ error }`)
        throw error;

    }
}


/*---------------------------------- Exports ---------------------------------------*/


module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    getProductByName,
    getProductsByUserId,
    updateProduct,
    deleteProduct,
}