//  ./routes/shops.js

const express = require('express');
const shopsRouter = express.Router();
const { createShop, getAllShops, getShopById, updateShop, deleteShop } = require('../db/shops.js')
const { requireUser } = require('../db/users.js');
const shops = require('../db/shops.js');


shopsRouter.use( async function (req, res, next){
    console.log("A request has been made to the /api/shops endpoint.");
    next()
});

//Get All Shops Route
shopsRouter.get('/', async function (req, res, next){
    const allShops = await getAllShops()
    if(allShops){
        res.send({ message:'Here are all of the available shops.', shops:shops})
    }
});


//Create New Shop Route 
shopsRouter.post('/', requireUser, async function( req, res, next ){
    const{ userId, name, products, description } = req.body

    const shopData = {}

    shopData.userId = userId
    shopData.name = name
    shopData.products = products
    shopData.description = description

    try{
        const newShop = createShop(shopData)
        if(newShop){
        res.send({ message:'Shop Created!', shop: newShop })
    }

    }catch(error){
        console.error(error)
        const { name, message } = error
        next({ name, message })
    }
});


//Edit Shop Route
shopsRouter.patch('/:shopId', requireUser, async function( req, res, next ){
    const { shopId } = req.params
    const shop = await getShopById(shopId)
    const { fields } = shop
    const updatedShop = await updateShop(shopId, fields)
    try {
        if(updatedShop){
            res.send({ message:'Shop has been updated', shop:updatedShop })
        }      
    } catch (error) {
        console.error(error)
        next()
    }
});


//Delete Shop Route 
shopsRouter.delete('/:shopId', requireUser, async function( req, res, next ){
    const { shopId } = req.params
    const shop = await getShopById(shopId)
    const deletedShop = await deleteShop(shop)
    try {
        if(deletedShop){
            res.send({ message:'Shop successfully deleted.', shop:deletedShop})
        }
    } catch (error) {
        console.error(error)
        next()
    }
});



module.exports = shopsRouter