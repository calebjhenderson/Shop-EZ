//  ./routes/orders.js

const express = require("express");
const ordersRouter = express.Router();

const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
} = require("../db/orders.js");

const {
    addProductToOrder,
    getOrderProductsByProductId,
    deleteOrderProducts,
    getAllOrderProducts,
    removeOrderProductById,
} = require("../db/order_products.js");

const { deleteUserOrder } = require("../db/user_orders");

const { requireUser } = require("../db/users.js");

ordersRouter.use(function (req, res, next) {
    console.log("A request has been made to the /api/orders endpoint.");
    next();
});

// Get All Orders Route------------------------------WORKS!
ordersRouter.get("/", async function (req, res, next) {
    try {
        const allOrders = await getAllOrders();
        if (allOrders) {
            res.send({ allOrders });
        } else {
            res.send({ message: "Error Getting All Orders." });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

//Get All Order Products Route------------------------------WORKS!
ordersRouter.get("/getorderproducts", async function (req, res, next) {
    try {
        const orderProducts = await getAllOrderProducts();
        if (orderProducts) {
            res.send({ message: "order products", orderProducts });
        } else {
            res.send({ message: "Error Getting All Order Products." });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

// Create Order Route------------------------------WORKS!
ordersRouter.post("/create", requireUser, async function (req, res, next) {
    const {
        userId,
        products,
        orderDate,
        orderTotal,
        shippingAddress,
    } = req.body;
    const orderData = {};
    orderData.userId = userId;
    orderData.products = products;
    orderData.orderDate = orderDate;
    orderData.orderTotal = orderTotal;
    orderData.shippingAddress = shippingAddress;

    try {
        const newOrder = await createOrder(orderData);
        if (newOrder) {
            res.send({ message: "Order created!", order: orderData });
        } else {
            res.send({ message: "Error Creating Order." });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

// Update Order Route------------------------------WORKS!
ordersRouter.patch("/update/:orderId", async function (req, res, next) {
    const { orderId } = req.params;
    try {
        const order = await getOrderById(orderId);
        const updatedOrder = await updateOrder(orderId, order);
        if (updatedOrder) {
            res.send({ message: "Order updated.", order: updatedOrder });
        } else {
            res.send({ message: "Error Updating Order." });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

//Delete Order Route------------------------------WORKS!
ordersRouter.delete("/delete/:orderId", requireUser, async function (
    req,
    res,
    next
) {
    const { orderId } = req.params;

    try {
        const deletedOrders = await deleteOrder(orderId);

        if (deletedOrders) {
            res.send({ message: "Order deleted.", order: deletedOrders });
        } else {
            res.send({ message: "Error Deleting Order." });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

// Add Product To Order Route------------------------------WORKS!
ordersRouter.post("/addorderproduct/:orderId", async function (req, res, next) {
    const { orderId } = req.params;
    const { productId } = req.body;

    try {
        const orderProducts = await getOrderProductsByProductId(productId);

        if (orderProducts && orderProducts.length) {
            for (let orderProduct of orderProducts) {
                if (+orderProduct.orderId === +orderId) {
                    next({
                        name: "orderProductAlreadyExists",
                        message: "This product is already on this order",
                    });
                }
            }
            const newOrderProduct = await addProductToOrder(orderId, productId);
            res.send({
                message: "Product added to order.",
                product: newOrderProduct,
            });
        } else {
            const newOrderProduct = await addProductToOrder(orderId, productId);
            res.send({
                message: "Product added to order.",
                product: newOrderProduct,
            });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

// Remove Product from Order Route------------------------------WORKS!
ordersRouter.delete("/deleteorderproduct/:orderProductId", async function (
    req,
    res,
    next
) {
    const { orderProductId } = req.params;

    try {
        const removed = await removeOrderProductById(orderProductId);
        if (removed) {
            res.send({
                message: "Product has been removed from order",
                order: removed,
            });
        } else {
            res.send({ message: "Error Removing Product from Order." });
        }
    } catch (error) {
        console.error(error);
        const { name, message } = error;
        next({ name, message });
    }
});

module.exports = ordersRouter;
