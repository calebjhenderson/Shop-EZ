// ./db/index.js

module.exports = {
    ...require('./users'),
    ...require('./carts'),
    ...require('./categories'),
    ...require('./orders'),
    ...require('./products'),
    ...require('./reviews'),
    ...require('./shops'),
    ...require('./cart_products'),
    ...require('./category_products'),
    ...require('./order_products'),
    ...require('./product_reviews'),
    ...require('./user_orders'),
    ...require('./user_products'),
}