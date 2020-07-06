
//  ./routes/orders.js

const express = require('express');
const ordersRouter = express.Router();
const { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } = require('../db/orders.js');
const { requireUser } = require('../db/users.js');


ordersRouter.use(function( req, res, next){
    console.log("A request has been made to the /api/orders endpoint.");
    next();
})

// Get All Orders Route
ordersRouter.get('/', async function( req, res, next ){
    try{
        const allOrders = await getAllOrders()
        if(allOrders){
        res.send({ allOrders })
        }
    }catch(error){
    console.error(error)
    next()
    }
});

// Create Order Route
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

// Edit Order Route
ordersRouter.patch('/:orderId', async function( req, res, next){
    const { orderId } = req.params
    const order = getOrderById(orderId)
    const { fields } = order
    try {
        const updatedOrder = await updateOrder( orderId, fields )
        if(updatedOrder){
            res.send({ message:'Order updated.', order:updatedOrder} )
        }
    } catch (error) {
        console.error(error)
        next()
    }
});


//Delete Order Route
ordersRouter.delete('/:orderId', async function( req, res, next){
    const { orderId } = req.params
    try {
        const deletedOrder = await deleteOrder(orderId)
        if(deletedOrder){
            res.send({ message:'Order deleted.', order:deletedOrder})
        }
    } catch (error) {
        console.error(error)
        next() 
    }
});

module.exports = ordersRouter