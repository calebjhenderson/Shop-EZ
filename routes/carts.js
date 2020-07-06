const express = require('express');
const cartsRouter = express.Router();
const { createCart } = require('../db/carts.js')


cartsRouter.post('/', requireUser, async function( req, res, next){
    const { userId, products } = req.body
    const cartData = {}

    cartData.userId = userId 
    cartData.products = products 
    
    try {
        const newCart = await createCart(cartData)
        res.send({ message:'Here is your cart...', cart: newCart })
        
    } catch(error) {
        console.error(error)
        const { name, message } = error
        next({ name, message })        
    }
});

module.exports = cartsRouter

