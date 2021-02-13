const express = require('express');
const server = express();

const chalk = require('chalk');

const morgan = require('morgan');
server.use(morgan('dev'));

const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

server.get('/', (req, res) => {
    res.send({message: 'heck'})
});

server.use(express.static('public'));

server.listen(3000, () => {
    console.log(chalk.cyan('I AM WORKING!!!'))
});