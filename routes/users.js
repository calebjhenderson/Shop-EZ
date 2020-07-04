const express = require('express');
const usersRouter = express.Router();

usersRouter.use(function(){
    console.log('A request is being made to the /api/users endpoint.');
    next();

})


usersRouter.post(function( req, res ){})
usersRouter.patch(function( req, res ){})
usersRouter.delete(function( req, res ){})

module.exports = usersRouter