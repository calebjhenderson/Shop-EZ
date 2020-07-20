//  ./routes/shops.js

const express = require("express");
const shopsRouter = express.Router();
const {
    createShop,
    getAllShops,
    getShopById,
    updateShop,
    deleteShop,
} = require("../db/shops.js");
const { requireUser } = require("../db/users.js");
const shops = require("../db/shops.js");

shopsRouter.use(async function (req, res, next) {
    console.log("A request has been made to the /api/shops endpoint.");
    next();
});

//Get All Shops Route------------------------------WORKS!
shopsRouter.get("/", async function (req, res, next) {
    try {
        const allShops = await getAllShops();
        if (allShops) {
            res.send({
                message: "Here are all of the available shops.",
                shops: shops,
            });
        } else {
            res.send({ message: "Error Getting All Shops." });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

//Create New Shop Route------------------------------WORKS!
shopsRouter.post("/newshop", requireUser, async function (req, res, next) {
    const { userId, name, products, description } = req.body;

    const shopData = {};

    shopData.userId = userId;
    shopData.name = name;
    shopData.products = products;
    shopData.description = description;
    const newShop = createShop(shopData);
    try {
        if (newShop) {
            res.send({ message: "Shop Created!", shop: newShop });
        } else {
            res.send({ message: "Error Creating Shop." });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

//Update Shop Route------------------------------WORKS!
shopsRouter.patch("/update/:shopId", requireUser, async function (
    req,
    res,
    next
) {
    const { shopId } = req.params;
    try {
        const shop = await getShopById(shopId);
        const updatedShop = await updateShop(shopId, shop);

        if (updatedShop) {
            res.send({ message: "Shop has been updated", shop: updatedShop });
        } else {
            res.send({ message: "Error Updating Shop." });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

//Delete Shop Route------------------------------WORKS!
shopsRouter.delete("/delete/:shopId", requireUser, async function (
    req,
    res,
    next
) {
    const { shopId } = req.params;
    try {
        const shop = await getShopById(shopId);
        const deletedShop = await deleteShop(shop.id);
        if (deletedShop) {
            res.send({
                message: "Shop successfully deleted.",
                shop: deletedShop,
            });
        } else {
            res.send({ message: "Error Deleting Shop." });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

module.exports = shopsRouter;
