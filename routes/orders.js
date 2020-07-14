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
  removeProductFromOrder,
  deleteOrderProducts,
  getOrderProductsByOrderId,
  getAllOrderProducts,
} = require("../db/order_products.js");
const { deleteUserOrder } = require("../db/user_orders");
const {
  getOrderProductById,
  removeOrderProductByOrderId,
} = require("../db/order_products");

const { requireUser } = require("../db/users.js");

ordersRouter.use(function (req, res, next) {
  console.log("A request has been made to the /api/orders endpoint.");
  next();
});

// Get All Orders Route------------------------------Works!
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

//Get All Order Products Route------------------------------Works!
ordersRouter.get("/getorderproducts", async function (req, res, next) {
  try {
    const orderProducts = await getAllOrderProducts();
    if (orderProducts) {
      res.send({ message: "order products", orderProducts });
    }
  } catch (error) {
    console.error(error);
    const { name, message } = error;
    next({ name, message });
  }
});

// Create Order Route------------------------------Works!
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

// Edit Order Route------------------------------Works!
ordersRouter.patch("/update/:orderId", async function (req, res, next) {
  const { orderId } = req.params;
  try {
    const order = await getOrderById(orderId);
    const updatedOrder = await updateOrder(orderId, order);
    if (updatedOrder) {
      res.send({ message: "Order updated.", order: updatedOrder });
    }
  } catch (error) {
    console.error(error);
    const { name, message } = error;
    next({ name, message });
  }
});

//Delete Order Route------------------------------Works!
ordersRouter.delete("/delete/:orderId", requireUser, async function (
  req,
  res,
  next
) {
  const { orderId } = req.params;

  try {
    const deleteOrderProduct = await deleteOrderProducts(orderId);

    const deleteUserOrders = await deleteUserOrder(orderId);

    const deletedOrders = await deleteOrder(orderId);

    if (deletedOrders) {
      res.send({ message: "Order deleted.", order: deletedOrders });
    }
  } catch (error) {
    console.error(error);
    const { name, message } = error;
    next({ name, message });
  }
});

// Add Product To Order Route---------------"invalid input syntax for type integer: \"{\"{\\\"id\\\":6,\\\"orderId\\\":4,\\\"productId\\\":1}\",\"{\\\"id\\\":9,\\\"orderId\\\":6,\\\"productId\\\":1}\"}\""
ordersRouter.patch("/addorderproduct/:orderproductId", async function (
  req,
  res,
  next
) {
  const { orderproductId } = req.params;

  try {
    const order = await getOrderById(orderproductId);
    const orderProducts = await getOrderProductsByProductId(orderproductId);

    if (order) order.order_products = orderProducts;
    const { orderId } = order;
    const newOrderProduct = await addProductToOrder(orderId, orderProducts);
    res.send({ message: "Product added to order.", product: newOrderProduct });
  } catch (error) {
    console.error(error);
    const { name, message } = error;
    next({ name, message });
  }
});

// Remove Product from Order Route-----------getOrderProductByOrderId not written
ordersRouter.delete("/deleteorderproduct/:orderproductId", async function (
  req,
  res,
  next
) {
  const { orderproductId } = req.params;

  try {
    const orderProduct = await getOrderProductById(orderproductId);
    const removed = await removeOrderProductByOrderId(orderProduct);
    if (removed) {
      res.send({
        message: "Product has been removed from order",
        order: removed,
      });
    }
  } catch (error) {
    console.error(error);
    const { name, message } = error;
    next({ name, message });
  }
});

module.exports = ordersRouter;
