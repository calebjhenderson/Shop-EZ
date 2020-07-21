// ./db/sync.js
const client = require("./client");
const chalk = require("chalk");

//Create all tables if they do not already exist
async function createTables() {
    console.log(chalk.yellow("Starting to create tables..."));
    try {
        //TODO: Add image array
        //Users table
        await client.query(
            `CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                "firstName" VARCHAR(255) NOT NULL,
                "lastName" VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                role varchar NOT NULL,
                addresses TEXT [],
                "paymentInfo" TEXT [],
                public BOOLEAN DEFAULT false,
                active BOOLEAN DEFAULT true
            );`
        );

        //TODO: Add image array
        //Products table

        //MAKE DELIVERY AN ENUM

        await client.query(`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                price FLOAT(2) NOT NULL,
                quantity INTEGER NOT NULL,
                delivery TEXT [],
                rating FLOAT(1),
                "shopId" INTEGER REFERENCES shops(id) NOT NULL,
                active BOOLEAN DEFAULT true
            );`);

        //User_products join table
        await client.query(`
            CREATE TABLE IF NOT EXISTS user_products (
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id) NOT NULL,
                "productId" INTEGER REFERENCES products(id) NOT NULL,
                quantity INTEGER NOT NULL
            );`);

        //Categories table
        await client.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id SERIAL PRIMARY KEY,
                name VARCHAR(25) UNIQUE NOT NULL
            );`);

        //Category_products join table
        await client.query(`
            CREATE TABLE IF NOT EXISTS category_products(
                id SERIAL PRIMARY KEY,
                "categoryId" INTEGER REFERENCES categories(id) NOT NULL,
                "productId" INTEGER REFERENCES products(id) NOT NULL
            );`);

        //TODO: Add media array
        //Reviews table

        //ADD UPPER-LOWER BOUND TO RATING

        await client.query(`
            CREATE TABLE IF NOT EXISTS reviews(
                id SERIAL PRIMARY KEY,
                "productId" INTEGER REFERENCES products(id) NOT NULL,
                "userId" INTEGER REFERENCES users(id) NOT NULL,
                title VARCHAR(255),
                rating INTEGER NOT NULL,
                comment TEXT NOT NULL
            );`);

        //Carts table (userId not required for non-users to be able to purchase)
        //NEED FOREIGN KEY IN PRODUCTS INT
        await client.query(`
            CREATE TABLE IF NOT EXISTS carts(
                id SERIAL PRIMARY KEY,
                products INTEGER REFERENCES products(id)[] ,
                userId INTEGER REFERENCES users(id),
                sessionId INTEGER NOT NULL,
                isActive BOOLEAN DEFAULT TRUE,
                "orderDate" DATE NOT NULL,
                "shippingAddress" VARCHAR(255) NOT NULL,
                fulfilled BOOLEAN DEFAULT false
            );`);

        //Cart_products join table
        await client.query(`
            CREATE TABLE IF NOT EXISTS cart_products(
                id SERIAL PRIMARY KEY,
                "cartId" INTEGER REFERENCES carts(id) NOT NULL,
                "productId" INTEGER REFERENCES products(id) NOT NULL,
                quantity INTEGER REFERENCES carts(products) NOT NULL
                pricePurchasedAt VARCHAR(255 NOT NULL)
            );`);

        //Order_products join table
        await client.query(`
            CREATE TABLE IF NOT EXISTS order_products(
                id SERIAL PRIMARY KEY,
                "orderId" INTEGER REFERENCES orders(id) NOT NULL,
                "productId" INTEGER REFERENCES products(id) NOT NULL
            );`);

        //TODO: Add media array
        //Shops table

        await client.query(`
            CREATE TABLE IF NOT EXISTS shops(
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id) NOT NULL,
                name VARCHAR(255) UNIQUE NOT NULL,
                products INTEGER [],
                description TEXT
            );`);

        //Receipts table
        await client.query(`
            CREATE TABLE IF NOT EXISTS receipts(
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id) NOT NULL,
                "orderId" INTEGER REFERENCES orders(id) NOT NULL,
                products INTEGER [] NOT NULL,
                "orderDate" DATE NOT NULL,
                "orderTotal" FLOAT(2) NOT NULL,
                shippingAddress VARCHAR(255) NOT NULL,
                payment text [] NOT NULL
            );`);

        //Support_messages table
        await client.query(`
            CREATE TABLE IF NOT EXISTS support_messages(
                id SERIAL PRIMARY KEY,
                "customerUserId" INTEGER REFERENCES users(id) NOT NULL,
                "merchantUserId" INTEGER REFERENCES users(id) NOT NULL,
                "orderId" INTEGER REFERENCES orders(id),
                "productId" INTEGER REFERENCES products(id),
                "storeId" INTEGER REFERENCES shops(id),
                messages TEXT [] NOT NULL
            );`);

        //User_support_messages join table
        await client.query(`
            CREATE TABLE IF NOT EXISTS user_support_messages(
                id SERIAL PRIMARY KEY,
                "customerUserId" INTEGER REFERENCES users(id) NOT NULL,
                "merchantUserId" INTEGER REFERENCES users(id) NOT NULL,
                "interactionId" INTEGER REFERENCES support_messages(id) NOT NULL
            );`);

        //TODO: Add media array and figure out if there's a way to make one of three fields required
        //Posts table
        await client.query(`
            CREATE TABLE IF NOT EXISTS posts(
                id SERIAL PRIMARY KEY,
                title VARCHAR(50),
                "postBody" TEXT,
                comments INTEGER []
            );`);

        //User_posts join table
        await client.query(`
            CREATE TABLE IF NOT EXISTS user_posts(
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id) NOT NULL,
                "postId" INTEGER REFERENCES posts(id) NOT NULL
            );`);

        //Comments table
        await client.query(`
            CREATE TABLE IF NOT EXISTS comments(
                id SERIAL PRIMARY KEY,
                "postsId" INTEGER REFERENCES posts(id) NOT NULL,
                comment TEXT NOT NULL
            );`);

        console.log(chalk.greenBright("Finished creating tables!"));
    } catch (error) {
        console.error(
            "Error creating tables @ db/seed.js createTables()! Error: ",
            error
        );
        throw error;
    }
}

//Drops all tables if they exist
async function dropTables() {
    try {
        console.log(chalk.yellow("Starting to drop tables..."));

        await client.query(`
        DROP TABLE IF EXISTS comments;
        DROP TABLE IF EXISTS user_posts;
        DROP TABLE IF EXISTS posts;
        DROP TABLE IF EXISTS user_support_messages;
        DROP TABLE IF EXISTS support_messages;
        DROP TABLE IF EXISTS receipts;
        DROP TABLE IF EXISTS shops;
        DROP TABLE IF EXISTS product_reviews;
        DROP TABLE IF EXISTS reviews;
        DROP TABLE IF EXISTS order_products;
        DROP TABLE IF EXISTS user_orders;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS cart_products;
        DROP TABLE IF EXISTS carts;
        DROP TABLE IF EXISTS category_products;
        DROP TABLE IF EXISTS categories;
        DROP TABLE IF EXISTS user_products;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS users;
        `);

        console.log(chalk.greenBright("Finished dropping tables!"));
    } catch (error) {
        console.error("Error dropping tables @ db/seed.js! Error: ", error);
        throw error;
    }
}

async function sync(force = false) {
    try {
        if (force) {
            await dropTables;
        }
        await createTables;
    } catch (error) {
        console.error("Error Syncing");
        throw error;
    }
}

module.exports = sync;
