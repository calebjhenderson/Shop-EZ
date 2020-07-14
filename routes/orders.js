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
  getOrderByProductId,
  getOrderProductsByProductId,
  removeProductFromOrder,
} = require("../db/order_products.js");
const { requireUser } = require("../db/users.js");

ordersRouter.use(function (req, res, next) {
  console.log("A request has been made to the /api/orders endpoint.");
  next();
});

// Get All Orders Route
ordersRouter.get("/", async function (req, res, next) {
  try {
    const allOrders = await getAllOrders();
    if (allOrders) {
      res.send({ allOrders });
    }
  } catch (error) {
    console.error(error);
    const { name, message } = error;
    next({ name, message });
  }
});

// Create Order Route
ordersRouter.post("/create", requireUser, async function (req, res, next) {
  const { userId, products, orderDate, orderTotal, shippingAddress } = req.body;
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
    }
  } catch (error) {
    console.error(error);
    const { name, message } = error;
    next({ name, message });
  }
});

// Edit Order Route
ordersRouter.patch("/update/:orderId", async function (req, res, next) {
  const { orderId } = req.params;
  const order = getOrderById(orderId);
  const { fields } = req.body;
  try {
    const updatedOrder = await updateOrder(orderId, fields);
    if (updatedOrder) {
      res.send({ message: "Order updated.", order: updatedOrder });
    }
  } catch (error) {
    console.error(error);
    const { name, message } = error;
    next({ name, message });
  }
});

//Delete Order Route
ordersRouter.delete("/delete/:orderId", async function (req, res, next) {
  const { orderId } = req.params;
  try {
    const deletedOrder = await deleteOrder(orderId);
    if (deletedOrder) {
      res.send({ message: "Order deleted.", order: deletedOrder });
    }
  } catch (error) {
    console.error(error);
    const { name, message } = error;
    next({ name, message });
  }
});

// Add Product To Order Route
ordersRouter.patch("/addorderproduct/:productId", async function (
  req,
  res,
  next
) {
  const { productId } = req.params;
  const order = await getOrderByProductId(productId);
  const orderProducts = await getOrderProductsByProductId(productId);

  if (order) order.order_products = orderProducts;
  const { orderId } = order.order_products;
  const newOrderProduct = await addProductToOrder(orderId, productId);

  try {
    res.send({ message: "Product added to order.", product: newOrderProduct });
  } catch (error) {
    console.error(error);
    const { name, message } = error;
    next({ name, message });
  }
});

// Remove Product from Order Route
ordersRouter.delete("/deleteorderproduct/:productId", async function (
  req,
  res,
  next
) {
  const { productId } = req.params;
  const updatedOrder = await removeProductFromOrder(productId);
  try {
    if (updatedOrder) {
      res.send({
        message: "Product has been removed from order",
        order: updatedOrder,
      });
    }
  } catch (error) {
    console.error(error);
    const { name, message } = error;
    next({ name, message });
  }
});

module.exports = ordersRouter;
