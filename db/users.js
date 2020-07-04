// ./db/users.js

// to-do add profile-image to column
const createUser = async ({
    username,
    firstName,
    lastName,
    email,
    password,
    role,
    address = [],
    paymentInfo = [],
    shopName = ''
    
    
}) => {
  
    try {
        const { rows: [ users ] } = await client.query(
            `INSERT INTO users(username, firstName, lastName, email, password,role, address, paymentInfo, shopName)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
            `, [username,firstName,lastName,email,password,role,address,paymentInfo,shopName]
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

module.export = {
    client,
    createUser,
    getUserById,
    getUserByUserName,
    getAllUsers,
}
