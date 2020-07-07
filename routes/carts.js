//  ./routes/carts.js

const express = require('express');
const cartsRouter = express.Router();
const { createCart, updateCart, deleteCart, getCartById, getCartByUserId } = require('../db/carts.js')
const { getProductById } = require('../db/products.js')
const { addProductToCart, removeProductFromCart } = require('../db/cart_products.js')
const { requireUser } = require('../db/users.js')


cartsRouter.use( async function( req, res, next ){
    console.log("A request has been made to the /api/carts endpoint.");
    next()
});

// Create Cart Route
cartsRouter.post('/', requireUser, async function (req, res, next){
    const { userId, products } = req.body
    const cartData = {}

    cartData.userId = userId 
    cartData.products = products 
    
    try {
        const newCart = await createCart(cartData)
        res.send({ message:'Here is your cart...', cart: newCart })
        
    } catch(error) {
        console.error(error)
        next()       
    }
});

// Update Cart Route
cartsRouter.patch('/:id', async function (req, res, next){
    const { id } = req.params
    const cart = await getCartById(id)
    const { fields } = cart

    const cartData = {}
    cartData.id = id
    cartData.fields = fields
    
    try{
    const updatedCart = await updateCart( cartData.id, cartData.fields )
    if(updatedCart){
        res.send({ message:'Here is the updatedCart...', cart:updatedCart })
        }
    }catch(error){
        console.error(error)
        next()
    }
});


// Delete Cart Route
cartsRouter.delete('/:id', async function ( req, res, next ){
    const { id } = req.params
    const cart = await getCartById(id)

    try{
        const deletedCart = await deleteCart(cart)
        if(deletedCart){
            res.send({ message:'Cart deleted.', cart:deletedCart })
        }
    } catch(error){
        console.error(error)
        next()
    }
});


// Add Product to Cart Route
cartsRouter.put('/:productId', async function ( req, res, next ){
    const { productId } = req.params
    const product = await getProductById(productId)
    const userId = req.body
    const cart = await getCartByUserId(userId)
   
    try {
        const newCartProduct = await addProductToCart(productId, cart)
        res.send( { message:'Product added to cart', product:newCartProduct })
    } catch (error) {
        console.error(error)
        next()  
    }
});

// Delete Product From Cart Route
cartsRouter.delete('/:productId', async function ( req, res, next){
    const { productId} = req.params
    const product = await getProductById(productId)
    const userId = req.body
    const cart = await getCartByUserId(userId)

    try{
      const deletedCartProduct = await removeProductFromCart(productId)
      res.send({ message:'Product removed from cart.', product:deletedCartProduct })
    }catch(error){
        console.error(error)
        next()
    }
});

module.exports = cartsRouter