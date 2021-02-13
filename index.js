const express = require('express');
const server = express();

const chalk = require('chalk');

const morgan = require('morgan');
server.use(morgan('dev'));

const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

const axios = require('axios');

server.use(express.static('public'));

const Quote = require('inspirational-quotes');
const cowsay = require('cowsay');

server.get('/', (req, res) => {
    res.send({message: 'heck'})
});

server.get('/cowspiration', (req, res) => {
    const {text, author} = Quote.getQuote();
    const cow = cowsay.say({
        text: `${text}/n/n- ${author}`,
        W: 80
    });
    res.send({cow});
});

server.listen(3000, () => {
    console.log(chalk.cyan('I AM WORKING!!!'))
});