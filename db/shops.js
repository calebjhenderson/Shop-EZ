// ./db/shops.js


const createShop = async ({
    userId,
    name,
    products = [],
    description,
}) => {
    try {
        const { rows: [ shop ] }  = await client.query(`
        INSERT INTO shops ("userId",name,products, description)
        VALUES($1,$2,$3,$4)
        RETURNING *;
        `, [userId,name,products,description]);

        return shop;
        
    } catch(error){
        throw error;
    }
}

module.exports = {
    createShop
}