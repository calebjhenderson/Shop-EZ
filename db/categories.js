// ./db/categories.js

const { client } = require("./users")

const createCategory = async ({
    name
}) => {
    try {
        const { rows: [ category ] } = await client.query(
            `INSERT INTO categories (name)
             VALUES($1)
             RETURNING *;
            `,[name]
        );

        return category;

    } catch(error){
        throw error;
    }
}

module.exports = {
    createCategory
}