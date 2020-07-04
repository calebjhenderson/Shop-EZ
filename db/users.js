const { Client } = require('pg');

const client = new Client(process.env.DATABASE_URL) || 'postgres://localhost:5432/shop-ez'

const createUser = async ({
    username,
    firstName,
    lastName,
    email,
    password,
    profileImage,
    role,
    userAddress: [],
    paymentInfo: [],
    shopname
    
    
}) => {
    try {
        const { rows: [ users ] } = await client.query(
            `INSERT INTO users(username, firstName, lastName, email, password, profileImage, role, userAddress, paymentInfo, shopname)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
            `, [username,firstName,lastName,email,password,profileImage,role,userAddress,paymentInfo,shopname]
        );

        return users;

    } catch(error){
        throw error; 
    }
}

const getAllUsers = as
const getUserById = async (userId) => {
    try {
        const { rows: [ user ] } = await client.query(`
        SElECT * 
        FROM users
        WHERE id= $1
        `, [userId]);
        
        if(!user) {
            return null;
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


