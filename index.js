require('dotenv').config();
const {PORT = 3000, WEATHER_KEY} = process.env

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

server.get('/weather', async (req, res) => {
    try {
        const {lat, lon} = req.query
        const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}`
        const {data} = await axios.get(URL)
        res.send({results:data})
    } catch (error) {
        res.send({error})
    }

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

server.listen(PORT, () => {
    console.log(chalk.cyan('I AM WORKING!!!'))
});