const express = require('express');
const shopsRouter = express.Router();
const { createShop } = require('../db/shops.js')
const { requireUser } = require('../db/users.js')
//NEED TO WRITE REQUIRE USER

shopsRouter.use( async function (req, res, next){
    console.log("A request has been made to the /api/shops endpoint.");
    next()
});

//Get All Shops Route
shopsRouter.get('/', async function (req, res, next){})


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
})


//Edit Shop Route
shopsRouter.patch(function( req, res ){})

//Delete Shop Route 
shopsRouter.delete(function( req, res ){})



module.exports = shopsRouter