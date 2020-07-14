//  ./routes/carts.js

const express = require('express');
const cartsRouter = express.Router();
const { createCart, updateCart, deleteCart, getCartById, getCartByUserId } = require('../db/carts.js')
const { getProductById } = require('../db/products.js')
const { addProductToCart, removeProductFromCart, getCartProductById } = require('../db/cart_products.js')
const { requireUser } = require('../db/users.js');
const products = require('../db/products.js');


cartsRouter.use(async function( req, res, next ){
    console.log("A request has been made to the /api/carts endpoint.");
    next()
});

// Create Cart Route------------------------------WORKS!
cartsRouter.post('/create', async function (req, res, next){
    const { userId, products } = req.body
    const cartData = {}

    cartData.userId = userId 
    cartData.products = products 
    
    try {
        const newCart = await createCart(cartData)
       if(newCart){
        res.send({ message:'Here is your cart...', cart: newCart})
       }
    } catch(error) {
        console.error(error)
        const { name, message } = error
        next({ name, message }) 
    }
});

//------------------------------"Syntax error at or near \"[\" "
cartsRouter.patch('/update/:cartId', async function (req, res, next){
    const { cartId } = req.params
    const { products } = req.body
    const cartData = {}
    cartData.products = products

    try{ 
        const cart = await getCartById(cartId)
        const updatedCart = await updateCart( cart, cartData )
        console.log("update",updatedCart)
    if(updatedCart){
        res.send({ message:'Your cart has been updated...', cart:updatedCart })
        }
    }catch(error){
        console.error(error)
        const { name, message } = error
        next({ name, message })
    }
});


// -----Invalid input syntax for type integer"{"id":1,"userId":1,"products":[1,4]}"
cartsRouter.delete('/delete/:cartId', async function (req, res, next){
    const { cartId } = req.params
 
    try{
        const cart = await getCartById(cartId)
        const deletedCart = await deleteCart(cart)
        if(deletedCart){
            res.send({ message:'Cart deleted.', cart:deletedCart })
        }
    } catch(error){
        console.error(error)
        const { name, message } = error
        next({ name, message })
    }
});


// Add Product to Cart Route------------------------------WORKS!
cartsRouter.put('/add/:productId', async function (req, res, next){
    const { productId } = req.params
    const { cartId } = req.body
   
    try {
        const newCartProduct = await addProductToCart(productId, cartId)
        res.send( { message:'Product added to cart', product:newCartProduct })
    } catch(error){
        console.error(error)
        const { name, message } = error
        next({ name, message })
    }
});

// -invalid input syntax for type integer: "{"id":4,"userId":4,"products":[1,4,2]}"
cartsRouter.delete('/delete/:productId', async function ( req, res, next){
    const { productId} = req.params
 
    try{
        const cartProduct = await getCartProductById(productId)
        const deletedCartProduct = await removeProductFromCart(cartProduct.id)
      res.send({ message:'Product removed from cart.', product:deletedCartProduct })
    } catch(error){
        console.error(error)
        const { name, message } = error
        next({ name, message })
    }
});

module.exports = cartsRouter