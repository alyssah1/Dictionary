const db = require("../models");
const router = require('express').Router();
const axios = require('axios');

const API_KEY = process.env["API-KEY"];


router.get('/api/search/:word', async (req, res) => {
    const wordName = req.params.word;

    //check if word has already been searched before
    let word = await db.Word.findOne({where: {name: wordName}, include:db.Definition});

    //if word is found, return it as json
    if(word) {
        return res.json(word);
    }

    const options = {
        method: 'GET',
        url: 'https://wordsapiv1.p.rapidapi.com/words/' + wordName,
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
        }
    };

    axios.request(options).then(async function (response) {
        //stringify all definitions for this word.
        word = await db.Word.create({name: wordName, Definitions: response.data.results.map(el => {return {data: el};})}, {include: db.Definition});
        return res.json(word);
    }).catch(function (error) {
        console.error(error);
        return res.status(500).json(error);
    });
});

router.get('/api/add/:word', (req, res) => {

});

router.get('/api/remove/:word', (req, res) => {

});

module.exports = router;