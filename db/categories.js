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


const updateCategory = async (id, fields ) => {

    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
      ).join(', ');
    
      console.log('setstring', setString)
    
      if (setString.length === 0) {
        return;
      }
    
      try {
        const { rows: [ category ] }= await client.query(`
          UPDATE categories
          SET ${ setString }
          WHERE id=${ id }
          RETURNING *;
        `, Object.values(fields));
    
        return category;
      } catch (error) {
        throw error;
      }
}

const deleteCategory = async (categoryId) => {
    try {
        const { rows: [ deletedCategory ]} = await client.query(`
            DELETE FROM categories
            WHERE id=$1
        `, [categoryId]);

        return deleteCategory;
    } catch(error){
        throw error;
    }
}

const getAllCategories = async () => {
    try{
        const { rows } = await client.query(`
            SELECT * FROM categories;
        `);

        return rows;
    }catch(error){
        throw error;
    }
}

const getCategoryById = async (categoryId) => {
    try {
        const { rows: [ category ] } = await client.query(`
            SELECT * FROM categories
            WHERE id=$1
        `, [categoryId]);

        return category;
    } catch(error){
        throw error;
    }
}

const getCategoryByName = async (categoryName) => {
    try {
        const { rows: [ category ] } = await client.query(`
            SELECT * FROM categories
            WHERE name=$1
        `, [categoryName]);

        return category;
    } catch(error){
        throw error;
    }
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
    getCategoryByName,
}