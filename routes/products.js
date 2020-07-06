const express = require('express');
const productsRouter = express.Router();
const { getAllProducts, createProduct, getProductById } = require('../db/products.js')
//NEED TO WRITE REQUIRE USER

productsRouter.use( async function( req, res, next ){
    console.log("A request has been made to the /api/products endpoint.");
    next()
});


//Get All Products Route
productsRouter.get('/', async function( req, res, next ){
    const products = await getAllProducts()
        res.send({ products })
        next()
});


//Create Product Route
productsRouter.post('/', requireUser, async function( req, res, next ){
    const { name, description, price, quantity, delivery, rating, userId, categoryId } = req.body

    const productData = {}

    productData.name = name
    productData.description = description
    productData.price = price
    productData.quantity = quantity
    productData.delivery = delivery
    productData.rating = rating
    productData.userId = userId
    productData.categoryId = categoryId
    
    try{
        const newProduct = await createProduct(productData)
        if(newProduct){

            res.send({ message:'Product Created!', newProduct })}

    } catch ({ name, message }) {
        next({ name, message })
    }
});


//Edit Product Route
productsRouter.patch('/:productId', requireUser, async function( req, res, next ){
    const { productId } = req.params
    const { id } = req.user
    const { name, description, price, quantity, delivery, rating, userId} = req.body
    const updateFields = {}

    if( name ){ updateFields.name = name }
    if( description ){ updateFields.description = description} 
    if( price ){ updateFields.price = price }
    if ( quantity ){ updateFields.quantity = quantity } 
    if( delivery ){ updateFields.delivery = delivery }
    if( rating ){ updateFields.rating = rating }

    try{
        const originalProduct = getProductById( productId )
        const creatorId = originalProduct.userId
        if( id === creatorId ){
            //updateProduct has not been written yet
            await updateProduct( id, updateFields)
            const updatedProduct = await getProductById(id)
            
            res.send({ message:'Product has been updated!', product:updatedProduct })
        } else {
            next({
                name:'Not Allowed',
                message: 'You may only edit your own products.'
            })
        }
    } catch ({ name, message }){
        next({ name, message })
    }
});


//Delete Products Route
productsRouter.delete('/:productId', requireUser, async function( req, res, next ){
    const { productId } = req.params;
    const { id } = req.user;

    try{
        const product = await getProductById(productId)
        const creatorId = product.userId
        if(id === creatorId){
            //deleteProduct has not been written yet
        const deletedProduct = await deleteProduct(product)
     
        res.send({ message:'Producted has been deleted!', product:deletedProduct}) 
        } else {
            next({
                name:'Not allowed',
                message:'You may only delete your own products!'
                
            })
        }
    } catch ({ name, message }){
        next({ name, message })
    }
});

module.exports = productsRouter