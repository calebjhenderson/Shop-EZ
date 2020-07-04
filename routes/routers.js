const express = require('express');
const apiRouter = express.Router();


const usersRouter = require('./users.js');
apiRouter.use('/users', usersRouter);

const productsRouter = require('./products.js');
apiRouter.use('/products', productsRouter);

const shopsRouter = require('./shops.js')
apiRouter.use('/shops', shopsRouter)



module.exports = apiRouter