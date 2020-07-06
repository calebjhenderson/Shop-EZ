const express = require('express');
const usersRouter = express.Router();
const { getAllUsers, createUser, getUserByUserName } = require('../db/users.js')
//NEED TO WRITE REQUIRE USER


const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SALT_COUNT = 10;

usersRouter.use( async function(){
    console.log('A request is being made to the /api/users endpoint.');
    next()
});


//Get All Users Route
usersRouter.get('/', async function  (req, res, next){
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
    
          
        } catch (error) {
          console.error(error)
          const { name, message } = error
          next({ name, message })
        } 
      });


//Login As Existing User Route
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


module.exports = usersRouter