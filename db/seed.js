// ./db/seed.js


/*---------------------------------- Imports ---------------------------------------*/


const bcrypt = require('bcrypt');
const {
    createUser,
    getAllUsers,
    getUsersByUserName,
    getUserByUserId
} = require('./index');

const { Client } = require('pg'); 
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/shop-ez';

const client = new Client(DATABASE_URL);

module.exports = { client };



/*---------------------------------- Functions ---------------------------------------*/


//Tests functionality of database functions
async function testDB() {

    try {
        console.log("Start db testing...")

        console.log("Finished db testing")
    }catch(error) {
        console.error("Error testing db functions @ ./db/seed.js testDB()! Error: ")
        throw error;
    }
}


//Create all tables if they do not already exist
async function createTables() {
    try {

        //Users table
        await client.query(
            `CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(25) UNIQUE NOT NULL,
                password VARCHAR(25) NOT NULL,
                "firstName" VARCHAR(25) NOT NULL,
                "lastName" VARCHAR(25) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                role varchar NOT NULL,
                addresses TEXT [],
                "paymentInfo" TEXT [],
                "shopName" VARCHAR (50),
                public BOOLEAN DEFAULT false,
                active BOOLEAN DEFAULT true
            );`

            //TODO: Add image array
        );


        //Products table
        await client.query(`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                price FLOAT(2) NOT NULL,
                quantity INTEGER NOT NULL,
                delivery TEXT [],
                rating FLOAT(1),
                "userId" INTEGER REFERENCES users(id) NOT NULL,
                "categoryId" INTEGER []
            );`

            //TODO: Add image array
        );


        //User_products join table
        await client.query(`
            CREATE TABLE IF NOT EXISTS user_products (
                id SERIAL PRIMARY KEY,
                "userID" INTEGER REFERENCES user(id) NOT NULL,
                "productId" INTEGER REFERENCES products(id) NOT NULL
            );`
        );

        
        //Categories table
        await client.query(`
            CREATE TABLE IF NOT EXISTS categories (
                id SERIAL PRIMARY KEY,
                name VARCHAR(25) UNIQUE NOT NULL
            );`
        );


        //Category_products join table
        await client.query(`
            CREATE TABLE IF NOT EXISTS category_products(
                id SERIAL PRIMARY KEY,
                "categoryId" INTEGER REFERENCES categories(id) NOT NULL,
                "productId" INTEGER REFERENCES products(id) NOT NULL
            );`
        );


        //Carts table (userId not required for non-users to be able to purchase)
        await client.query(`
            CREATE TABLE IF NOT EXISTS carts(
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES user(id),
                products INTEGER []
            );`
        );
        

        //Cart_products join table
        await client.query(`
            CREATE TABLE IF NOT EXISTS cart_products(
                id SERIAL PRIMARY KEY,
                "cartId" INTEGER REFERENCES carts(id) NOT NULL,
                "productId" INTEGER REFERENCES products(id) NOT NULL
            );`
        );


        //Orders table
        await client.query(`
            CREATE TABLE IF NOT EXISTS orders(
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id) NOT NULL,
                products INTEGER [] NOT NULL,
                "orderDate" DATE NOT NULL,
                "orderTotal" FLOAT(2) NOT NULL,
                shippingAddress VARCHAR(255) NOT NULL,
                fulfilled BOOLEAN DEFAULT false
            );`

            //TODO: Add support for receipt_id to table
        );


        //User_orders join table
        await client.query(`
            CREATE TABLE IF NOT EXISTS order_products(
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id) NOT NULL,
                "orderId" INTEGER REFERENCES orders(id) NOT NULL
            );`
        );


        //Order_products join table
        await client.query(`
            CREATE TABLE IF NOT EXISTS order_products(
                id SERIAL PRIMARY KEY,
                "orderId" INTEGER REFERENCES orders(id) NOT NULL,
                "productId" INTEGER REFERENCES products(id) NOT NULL
            );`
        );


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
            );`
        );


        //Reviews table
        await client.query(`
            CREATE TABLE IF NOT EXISTS reviews(
                id SERIAL PRIMARY KEY,
                "productId" INTEGER REFERENCES products(id) NOT NULL,
                "userId" INTEGER REFERENCES users(id) NOT NULL,
                title VARCHAR(255),
                rating INTEGER NOT NULL,
                comment TEXT NOT NULL
            );`

            //TODO: Add media array
        );


        //Product_reviews join table
        await client.query(`
            CREATE TABLE IF NOT EXISTS product_reviews(
                id SERIAL PRIMARY KEY,
                "productId" INTEGER REFERENCES products(id) NOT NULL,
                "reviewId" INTEGER REFERENCES reviews(id) NOT NULL
            );`
        );


        //Shops table
        await client.query(`
            CREATE TABLE IF NOT EXISTS shops(
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id) NOT NULL,
                name VARCHAR(255) UNIQUE NOT NULL,
                products INTEGER [],
                description TEXT
            );`
            //TODO: Add media array
        );


        //Support_messages table
        await client.query(`
            CREATE TABLE IF NOT EXISTS support_messages(
                id SERIAL PRIMARY KEY,
                "customerUserId" INTEGER REFERENCES users(id) NOT NULL,
                "merchantUserId" INTEGER REFERENCES users(id) NOT NULL,
                "orderId" INTEGER REFERENCES orders(id),
                "productId" INTEGER REFERENCES product(id),
                "storeId" INTEGER REFERENCES stores(id),
                messages TEXT [] NOT NULL
            );`
        );


        //User_support_messages join table
        await client.query(`
            CREATE TABLE IF NOT EXISTS user_support_messages(
                id SERIAL PRIMARY KEY,
                "customerUserId" INTEGER REFERENCES users(id) NOT NULL,
                "merchantUserId" INTEGER REFERENCES users(id) NOT NULL,
                "interactionId" INTEGER REFERENCES support_messages(id) NOT NULL
            );`
        );


        //Posts table
        await client.query(`
            CREATE TABLE IF NOT EXISTS posts(
                id SERIAL PRIMARY KEY,
                title VARCHAR(50),
                "postBody" TEXT,
                comments INTEGER []
            );`

            //TODO: Add media array and figure out if there's a way to make one of three fields required
        );


        //User_posts join table
        await client.query(`
            CREATE TABLE IF NOT EXISTS user_posts(
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id) NOT NULL,
                "postId" INTEGER REFERENCES posts(id) NOT NULL
            );`
        );


        //Comments table
        await client.query(`
            CREATE TABLE IF NOT EXISTS comments(
                id SERIAL PRIMARY KEY,
                "postsId" INTEGER REFERENCES posts(id) NOT NULL,
                comment TEXT NOT NULL
            );`
        );


     console.log("Finished creating tables!")
    } catch(error) {
        console.error("Error creating tables @ db/seed.js createTables()! Error: ", error);
        throw error;
    }
}


//Drops all tables if they exist
async function dropTables() {
    
    try {

        console.log("Starting to drop tables...")

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

       console.log("Finished dropping tables!")

    }
    catch(error) {
        console.error("Error dropping tables @ db/seed.js! Error: ", error);
        throw error;
    }

}


//Creates seed data of initial users
async function createInitialUsers() {
   
    // Reference
    //     id SERIAL PRIMARY KEY,
    //     username VARCHAR(25) UNIQUE NOT NULL,
    //     password VARCHAR(25) NOT NULL,
    //     "firstName" VARCHAR(25) NOT NULL,
    //     "lastName" VARCHAR(25) NOT NULL,
    //     email VARCHAR(255) UNIQUE NOT NULL,
    //     role varchar NOT NULL,
    //     addresses TEXT [],
    //     "paymentInfo" TEXT [],
    //     "shopName" VARCHAR (50),
    //     public BOOLEAN DEFAULT false,
    //     active BOOLEAN DEFAULT true

    console.log("Creating initial users...");

    const SALT_COUNT = 10;
    
    try {
    
        const tony = await createUser({
            username: 'tdyleuth', 
            password: await bcrypt.hash('password123', SALT_COUNT),
            "firstName": 'Tony',
            "lastName": 'Dyleuth',
            email: 'tony.dyleuth@example.com',
            role: 'admin',
            address: [],
            "paymentInfo": [],
            "shopName": '',
            public: true,
            active: true
        });
    
        const nahid = await createUser({
            username: 'nahid_alami', 
            password: await bcrypt.hash('password234', SALT_COUNT),
            "firstName": 'Nahid',
            "lastName": 'Alami',
            email: 'nahidalami@example.com',
            role: 'merchant',
            address: [],
            "paymentInfo": [],
            "shopName": '',
            public: true,
            active: true
        });

        const caleb = await createUser({
            username: 'caleb_rocks', 
            password: await bcrypt.hash('password345', SALT_COUNT),
            "firstName": 'Caleb',
            "lastName": 'Henderson',
            email: 'caleb_rocks@example.com',
            role: 'user',
            address: [],
            "paymentInfo": [],
            "shopName": "Caleb's Rocks",
            public: true,
            active: true
        });

        const yahya = await createUser({
            username: 'yhafez', 
            password: await bcrypt.hash('password212', SALT_COUNT),
            "firstName": 'Yahya',
            "lastName": 'Hafez',
            email: 'yhafez3@example.com',
            role: 'user',
            address: [],
            "paymentInfo": [],
            "shopName": '',
            public: false,
            active: true
        });
        
        console.log("Finished creating initial users!");
    }
    catch(error) {
        console.error("Error creating initial users @ db/seed.js createInitialUsers()! Error: ", error);
        throw error;
    }
    
}


//Creates seed data of initial categories
async function createInitialCategories() {
    
    // Reference
    // id SERIAL PRIMARY KEY,
    // name VARCHAR(25) UNIQUE NOT NULL

    const clothing = createCategory('clothing');

    const recreation = createCategory('recreation');

    const electronics = createCategory('electronics');

    const music = createCategory('music');

    const education = createCategory('education');

    console.log("Creating initial categories...");

    try {


        console.log("Finished creating initial categories!");
    }
    catch(error) {
        console.error("Error creating initial categories @ db/seed.js createInitialCategories()! Error: ", error);
        throw error;
    }

}


//Creates seed data of initial users
async function createInitialProducts() {
        
    // Reference
    //     id SERIAL PRIMARY KEY,
    //     name VARCHAR(255) NOT NULL,
    //     description TEXT NOT NULL,
    //     price FLOAT(2) NOT NULL,
    //     quantity INTEGER NOT NULL,
    //     delivery TEXT [],
    //     rating FLOAT(1),
    //     "userId" INTEGER REFERENCES users(id) NOT NULL,
    //     "categoryId" INTEGER []

    console.log("Creating initial products...");

    try {
        
        const rock = createProduct({
            name: 'Pet Rock',
            description: 'A friendly rock found in Joshua Tree looking for a home',
            price: 300.99,
            quantity: 1,
            delivery: ['pickup'],
            rating: 5.0,
            "userId": 3,
            "categoryId": 2 
        });

        const turnTable = createProduct({
            name: 'Turntables',
            description: "A pair of used Pioneer CDJ's in decent condition, perfect for getting your scratch on!",
            price: 450.99,
            quantity: 2,
            delivery: ['standard', 'express', 'next-day'],
            rating: 3.5,
            "userId": 4,
            "categoryId": 4 
        });

        const dress = createProduct({
            name: 'Embroidered Dress',
            description: 'One of a kind, hand-made embroidered dress from Egypt, perfect for weddings, parties, and other special occassions!',
            price: 60.00,
            quantity: 50,
            delivery: ['standard'],
            rating: 5.0,
            "userId": 2,
            "categoryId": 1
        });
        
        const course = createProduct({
            name: 'Fullstack Software Development Course',
            description: 'A part-time course offered by the incredible Fullstack Academy of Code to get you coding in your dream job in 6-months',
            price: '11000.00',
            quantity: 999,
            delivery: ['electronic'],
            rating: 5.0,
            "userId": 1,
            "categoryId": 5
        });

        console.log("Finished creating initial products!");
    }
    catch(error) {
        console.error("Error creating initial products @ db/seed.js createInitialProducts()! Error: ", error);
        throw error;
    }
    
}


//Creates seed data of initial shops
async function createInitialShops() {
    
    // Reference
    // id SERIAL PRIMARY KEY,
    // "userId" INTEGER REFERENCES users(id) NOT NULL,
    // name VARCHAR(255) UNIQUE NOT NULL,
    // products INTEGER [],
    // description TEXT

    console.log("Creating initial shops...");

    try {

        const calebsRocks = createShop({
            "userId": 3,
            name: "Caleb's Rocks",
            products: [1],
            description: 'The finest rocks in the industry, but also the finest rocking tunes in that industry too'
        });

        const lamasatyFashion = createShop({
            "userId": 2,
            name: 'Lamasaty Fashion',
            products: [3],
            description: 'An Arabic and Islamic clothing and accessory store'
        });

        const djHub = createShop({
            "userId": 4,
            name: 'DJ Hub',
            products: [2],
            description: "The one-stop shop for all your DJ'ing needs. And when I say all, I really mean ALL!"
        });

        const fullStack = createShop({
            "userId": 1,
            name: 'Fullstack Academy of Code',
            products: [4, 1],
            description: 'A coding bootcamp dedicated to helping you excel in the tech industry'
        });


        console.log("Finished creating initial shops!");
    }
    catch(error) {
        console.error("Error creating initial shops @ db/seed.js createInitialShops()! Error: ", error);
        throw error;
    }

}


//Create seed data of initial reviews
async function createInitialReviews() {

    //Reference
    // id SERIAL PRIMARY KEY,
    // "productId" INTEGER REFERENCES products(id) NOT NULL,
    // "userId" INTEGER REFERENCES users(id) NOT NULL,
    // title VARCHAR(255),
    // rating INTEGER NOT NULL,
    // comment TEXT NOT NULL

    console.log("Creating initial reviews...");

    try {

        const satisfied = createReview({
            "productId": 1,
            "userId": 4,
            title: 'This rock ROCKS',
            rating: 5,
            comment: "I purchased this rock a week ago and was completely blown away. Not only does it actually rock, this rock also totally ROCKS!!!"
        });

        const angry = createReview({
            "productId": 2,
            "userId": 2,
            title: "Janky turntables, 10/10 don't reccomend",
            rating: 1,
            comment: "I purchased these turtables expecting them to at the very least work. Imagine my fury when I instead received a cardboard cut out of a turntable. Absolutely ridiculous, I demand my money back"
        });

        const confused = createReview({
            "productId": 4,
            "userId": 1,
            title: 'Am I too good of a coder?',
            rating: 3,
            comment: "I had really high expectations of Fullstack, but this was just a whole nother level. I'm almost in disbelief at how hirable I am."
        });

        const ecstatic = createReview({
            "productId": 3,
            "userId": 3,
            title: 'Incredible',
            rating: 5,
            comment: "I'm in absolute love with this dress, it's exactly what my wife and I were looking for! Thanks Lamasaty fashion!!!"
        });

        console.log("Finished creating initial reviews!");
    }
    catch(error) {
        console.error("Error creating initial reviews @ db/seed.js createInitialReviews()! Error: ", error);
        throw error;
    }

}


//Creates seed data of initial carts
async function createInitialCarts() {

    // Reference
    // id SERIAL PRIMARY KEY,
    // "userId" INTEGER REFERENCES user(id),
    // products INTEGER []

    console.log("Creating initial carts...");

    try {

        const tonysCart = createCart({
            "userId": 1,
            products: [1, 4]
        });

        const nahidsCart = createCart({
            "userId": 2,
            products: [2]
        });

        const calebsCart = createCart({
            "userId": 3,
            products: [3, 2]
        });

        const yahyasCart = createCart({
            "userId": 4,
            products: [1, 4, 2]
        });

        const anonsCart = createCart({
            products: [1, 2, 4]
        });

        console.log("Finished creating initial carts!");
    }
    catch(error) {
        console.error("Error creating initial carts @ db/seed.js at createInitialCarts()! Error: ", error);
        throw error;
    }

}


//Creates seed data of initial orders
async function createInitialOrders() {

    // Reference
    // id SERIAL PRIMARY KEY,
    // "userId" INTEGER REFERENCES users(id) NOT NULL,
    // "orderId" INTEGER REFERENCES orders(id) NOT NULL

    console.log("Creating initial orders...");

    try {

        const rocks = createOrder({
            "userId": 1,
            "orderId": 1 
        });

        const clothes = createOrder({
            "userId": 2,
            "orderId": 2
        });

        const music = createOrder({
            "userId": 3,
            "orderId": 3
        });

        const curriculum = createOrder({
            "userId": 4,
            "orderId": 4
        });

        console.log("Finished creating initial orders!");
    }
    catch(error) {
        console.error("Error creating initial orders @ db/seed.js createInitialOrders()! Error: ", error);
        throw error;
    }

}


async function bootstrap() {

    try {
        client.connect();
        console.log("Connected to DB!")

        await dropTables();
        await createTables();
        await createInitialUsers();
        await createInitialCategories();
        await createInitialProducts();
        await createInitialShops();
        await createInitialReviews();
        await createInitialCarts();
        await createInitialOrders();
        

    } catch(error) {
        console.error("Error bootstrapping in ./db/seed.js at bootstrap(). Error: ", error);
        throw error;
    }
}


/*---------------------------------- Run-Time ---------------------------------------*/

bootstrap()
.then(testDB)
.catch(console.error)
.finally(() => 
    client.end()
);
