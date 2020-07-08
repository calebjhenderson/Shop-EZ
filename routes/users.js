//  ./routes/users.js

const express = require('express');
const usersRouter = express.Router();
const { getAllUsers, createUser, getUserByUserName } = require('../db/users.js');
const { getUserProductsByUserId } = require('../db/user_products');
const { getUserOrdersByUserId } = require('../db/user_orders');
const { getProductById } = require('../db/products');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cart_products = require('../db/cart_products.js');
const SALT_COUNT = 10;


usersRouter.use(async function(req, res, next){
    console.log('A request is being made to the /api/users endpoint.');
    next()
});


//Get All Users Route
usersRouter.get('/', async function(req, res, next){
    try{
    const users = await getAllUsers();
    res.send({ users })
    }catch(error){
        console.error(error)
        const{ name, message } = error
        next({ name, message })
    }
});


//Create New User Route
usersRouter.post('/register', async function (req, res, next){
    const {username, password, firstName, lastName, role, active, email, public, addresses, paymentInfo, shopName} = req.body
    try{
        bcrypt.hash(password, SALT_COUNT, function(error, hashedPassword){
            if (error){
              throw error;
            }
            else {
                
              createUser({
                username,
                password:hashedPassword,
                firstName,
                lastName,
                role,
                active,
                email,
                public,
                addresses,
                paymentInfo,
                shopName

              }).then((newUser) => {
    //would we need to sign all the user properties in the token or are these enough?
                const token = jwt.sign({ 
                  username,
                  firstName,
                  lastName,
                  id: newUser.id
                }, process.env.JWT_SECRET, {
                  expiresIn: '1w'
                });
                  
                res.send({ 
                  messageName: 'User created!',
                  message: "Thanks for choosing Shop-Ez!",
                  token,
                  username,
                  id: newUser.id
                });
              })
            }
          });
    
          
        } catch(error){
          console.error(error)
          const { name, message } = error
          next({ name, message })
        } 
});


//Login User Route
usersRouter.post('/login', async function (req, res, next){
  
    const { username, password } = req.body; 

    try{
        const user = await getUserByUserName(username);
        const hashedPassword = user.password;
        const { id } = user;
        const firstName = user.firstName;
        const lastName = user.lastName;
    
        bcrypt.compare(password, hashedPassword, function(err, passwordsMatch) {
        
        if (err){
          throw err;
        }
           else {
          if (passwordsMatch) {
              //again, do we need to sign more properties for the token?
          const token = jwt.sign({ id, username, firstName, lastName }, process.env.JWT_SECRET, { expiresIn: '1w' });
    
          res.send({ messageName: "Success!", message: "Welcome back!", token, firstName, lastName, id });
    
          } else {
              return next({ 
              messageName: 'Oops!', 
              message: 'Wrong username or password. Please try again.'
            });
          }
        }
      });

    } catch(error){
        console.error(error)
        const{ name, message } = error
        next({ name, message})
    }
});

usersRouter.get('/orders', async function (req,res,next){
    const { id } = req.params
    try {
      const userOrders = await getUserOrdersByUserId(id)

      if(!userOrders){
        next({
          name: "NoOrdersForUserError",
          message: "No orders found for that specified user"
        })
      }
      
      res.send({
         name: "userOrdersFound",
         message: "Orders for this user have been found. See attached",
         userOrders
      })

    } catch(error){
      console.error(error);
      const{ name, message } = error;
      next({ name, message });
    }
});

usersRouter.get('/products/:userId', async function (req, res, next){

  const userId = req.params.userId;

  try{
    const userProductIdsArr = await getUserProductsByUserId(userId);

    if(userProductIdsArr && userProductIdsArr.length){
      
        const userProducts = await Promise.all(userProductIdsArr.map(async (userProductIdObj) => await getProductById(userProductIdObj.productId) ))
          
        res.send({
          name: "userProductsFound",
          message: "Products for this user have been found. See attached.",
          userProducts
        })
      }
      else{
        next({
          name: "NoUserProductsFound",
          message: "No products have been found for the specified user"
        })
      }
    
  } catch(error){
    console.error(error)
    const{ name, message } = error
    next({ name, message })
  }
});


module.exports = usersRouter