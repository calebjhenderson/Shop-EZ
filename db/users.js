// ./db/users.js

const { Client } = require('pg'); 
const e = require('express');
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/shop-ez';
const client = new Client(DATABASE_URL);

// to-do add profile-image to column table 
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

const updateUser = async (id, fields = {} ) => {

    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
      ).join(', ');

      console.log('setstring', setString)
    
      if (setString.length === 0) {
          console.log("test")
        return;
      }
    
      try {
        const { rows: [ users ] }= await client.query(`
          UPDATE users
          SET ${ setString }
          WHERE id=${ id }
          RETURNING *;
        `, Object.values(fields));
    
        return users;
      } catch (error) {
        throw error;
      }
}

const deleteUser= async(userId) => {
   try{
       const { rows: [ user ] } = await client.query(`
           DELETE FROM users
           WHERE id=$1
       `, [userId]);

     console.log("User Deleted!")

     return user;
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
        console.log("testing all users",rows)
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
    
        if(!user){
            throw {
                name: "UserNotFoundError",
                message: "Cannot find user with that userName"
            }
        }

        return user;

    } catch(error){
        throw error;
    }
}

function requireUser(req, res, next) {
    if(!req.user) {
        next({
            name: "MissingUserError",
            message: "You must be logged in to perform this action"
        });
    }
    next();
  }


const getUserByEmail = async (email) =>
{
    try { 
        const { rows: [ user ] } = await client.query(
            `SELECT * FROM users 
            WHERE email=$1`
        , [email])

        if(!user){
            throw {
                name: "UserNotFoundError",
                message: "Cannot find user with that email"
            }
        }

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
    getUserByEmail,
    getAllUsers,
    updateUser,
    deleteUser,
    requireUser
}
