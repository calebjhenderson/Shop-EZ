//  ./index.js

// /index.js

const path = require('path');
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const { sync } = require("./db/index");

const PUBLIC_PATH = path.join(__dirname, './public');
const PORT = process.env.PORT;
const server = express();
const client = require('./db/client.js');
const apiRouter = require('./routes');
const FORCE = process.env.FORCE || false;


server.use(morgan('dev'));
server.use(express.static(PUBLIC_PATH));
server.use(express.json());
server.use('/api', apiRouter);


const startServer = new Promise( (res) =>{
    server.listen(PORT, () => {
        console.log('The server is up on port', PORT);
        res();
    });
});




sync(FORCE).then(startServer).catch(console.error);