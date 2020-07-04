const { Client } = require('pg'); 
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/shop-ez';

const db = new Client(DATABASE_URL);

module.exports = { db };