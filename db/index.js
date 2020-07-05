// ./db/index.js

module.exports = {
    ...require('./users'),
    ...require('./carts'),
    ...require('./categories'),
    ...require('./orders'),
    ...require('./products'),
    ...require('./reviews'),
    ...require('./shops')
}