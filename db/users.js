// ./db/users.js

const { Client } = require('pg'); 
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/shop-ez';
const client = new Client(DATABASE_URL);

// to-do add profile-image to column
const createUser = async ({
    username,
    firstName,
    lastName,
    email,
    password,
    role,
    addresses = [],
    paymentInfo = [],
    shopName = '',
    public,
    active
}) => {
  
    try {
        const { rows: [ users ] } = await client.query(
            `INSERT INTO users(username, "firstName", "lastName", email, password, role, addresses, "paymentInfo", "shopName", public, active)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10, $11)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
            `, [username,firstName,lastName,email,password,role,addresses,paymentInfo,shopName, public, active]
        );

        return users;

    } catch(error){
        throw error; 
    }
}

const getAllUsers = async () => {

    try {
        const { rows } = await client.query(`
           SELECT *
           FROM users;
        `);
    
        return rows;
    
      } catch (error){
        throw error;
      }
 }


const getUserById = async (userId) => {
    try {
        const { rows: [ user ] } = await client.query(`
        SElECT * 
        FROM users
        WHERE id= $1
        `, [userId]);
        
        if(!user) {
            throw { 
                name: "UserNotFoundError",
                message: "Cannot find user with that userId"
            };   
        }

        return user

    } catch(error){
        throw error;
    }
}

const getUserByUserName = async (username) => {
    try{
        const { rows: [ user ] } = await client.query(`
        SELECT * FROM users
        WHERE username = $1
        `, [username]);

        return user;

    } catch(error){
        throw error;
    }
}



module.exports = {
    client,
    createUser,
    getUserById,
    getUserByUserName,
    getAllUsers,
}
