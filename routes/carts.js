//  ./routes/carts.js

const express = require('express');
const cartsRouter = express.Router();
const { createCart, updateCart, deleteCart, getCartById, getCartByUserId } = require('../db/carts.js')
const { getProductById } = require('../db/products.js')
const { addProductToCart, removeProductFromCart } = require('../db/cart_products.js')
const { requireUser } = require('../db/users.js')


cartsRouter.use(async function( req, res, next ){
    console.log("A request has been made to the /api/carts endpoint.");
    next()
});

// Create Cart Route
cartsRouter.post('/createcart', requireUser, async function (req, res, next){
    const { userId, products } = req.body
    const cartData = {}

    cartData.userId = userId 
    cartData.products = products 
    const newCart = await createCart(cartData)
    
    try {
       if(newCart){
        res.send({ message:'Here is your cart...', cart: newCart})
       }
    } catch(error) {
        console.error(error)
        const { name, message } = error
        next({ name, message }) 
    }
});

// Update Cart Route
cartsRouter.patch('/update/:id', async function (req, res, next){
    const { id } = req.params
    const cart = await getCartById(id)
    const { fields } = cart
    const cartData = {}
    cartData.id = id
    cartData.fields = fields
    const updatedCart = await updateCart( cartData.id, cartData.fields )
    
    try{ 
    if(updatedCart){
        res.send({ message:'Here is the updatedCart...', cart:updatedCart })
        }
    }catch(error){
        console.error(error)
        const { name, message } = error
        next({ name, message })
    }
});


// Delete Cart Route
cartsRouter.delete('/deletecart/:id', async function ( req, res, next ){
    const { id } = req.params
    const cart = await getCartById(id)
    const deletedCart = await deleteCart(cart)

    try{
        if(deletedCart){
            res.send({ message:'Cart deleted.', cart:deletedCart })
        }
    } catch(error){
        console.error(error)
        const { name, message } = error
        next({ name, message })
    }
});


// Add Product to Cart Route
cartsRouter.put('/add/:productId', async function ( req, res, next ){
    const { productId } = req.params
    const product = await getProductById(productId)
    const userId = req.body
    const cart = await getCartByUserId(userId)
    const newCartProduct = await addProductToCart(productId, cart)
   
    try {
        res.send( { message:'Product added to cart', product:newCartProduct })
    } catch(error){
        console.error(error)
        const { name, message } = error
        next({ name, message })
    }
});

// Delete Product From Cart Route
cartsRouter.delete('/deletecartproduct/:productId', async function ( req, res, next){
    const { productId} = req.params
    const product = await getProductById(productId)
    const userId = req.body
    const cart = await getCartByUserId(userId)
    const deletedCartProduct = await removeProductFromCart(productId)
    try{
      res.send({ message:'Product removed from cart.', product:deletedCartProduct })
    } catch(error){
        console.error(error)
        const { name, message } = error
        next({ name, message })
    }
});

module.exports = cartsRouter