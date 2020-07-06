
//  ./routes/orders.js

const express = require('express');
const ordersRouter = express.Router();
const { createOrder } = require('../db/orders.js');
const { requireUser } = require('../db/users.js')

ordersRouter.use(function( req, res, next){
    console.log("A request has been made to the /api/orders endpoint.");
    next();
})


ordersRouter.post('/', requireUser, async function( req, res, next ){
    const { userId, products, orderDate, orderTotal, shippingAddress } = req.body
    const orderData = {}
    orderData.userId = userId
    orderData.products = products
    orderData.orderDate = orderDate
    orderData.orderTotal = orderTotal
    orderData.shippingAddress = shippingAddress

    try {
        const newOrder = await createOrder(orderData)
        if(newOrder){
            res.send({ message:'Order created!', order:orderData} )
        }
    } catch(error) {
        console.error(error)
        const{ name, message } = error
        next({ name, message })    
    }
});

module.exports = ordersRouter