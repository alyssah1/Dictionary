const db = require("../models");
const router = require('express').Router();
const axios = require('axios');

const API_KEY = process.env["API-KEY"];

router.get('/api/search/:word', (req, res) => {
    // noinspection JSUnresolvedVariable
    const options = {
        method: 'GET',
        url: 'https://wordsapiv1.p.rapidapi.com/words/' + req.params.word,
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        res.json(response.data);
    }).catch(function (error) {
        console.error(error);
        res.status(500).json(error);
    });
});

router.get('/api/add/:word', (req, res) => {

});

router.get('/api/remove/:word', (req, res) => {

});

module.exports = router;