//Server
const PORT  = process.env.PORT || 3000;
const express = require ('express');
const server = express();
const chalk = require('chalk')
const path = require('path')
const { db  } = require('./db/seed.js');


//This uses the subrouters
const apiRouter = require('./routes/routers.js')
server.use('/api',apiRouter)


server.listen(PORT, ()=>{
    console.log(chalk.cyan('Server is up on port', PORT))
    try{
        db.connect();
        console.log('Connected to the database!')
        db.exit();
    }catch(e){throw e}
});




