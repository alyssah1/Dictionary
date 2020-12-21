const db = require("../models");
const router = require('express').Router();
const axios = require('axios');

const API_KEY = process.env["API-KEY"];


router.get('/api/search/:word', async (req, res) => {
    
    const wordName = req.params.word;
    console.log("wordName", wordName);

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

router.post('/api/add/:word', async (req, res) => {
    const wordName = req.params.word;

    //find word in db
    const word = await db.Word.findOne({where: {name: wordName}});

    if(!word) {
        //when word doesn't exist, this should never happen, given that user should not be able to add a word unless they searched it.
        return res.status(404).send("Word wasn't searched and cached yet.");
    } else {
        const user = await db.User.findOne({where: {id: req.user.id}});
        await word.addUser(user);
        return res.status(200).send("word added.");
    }
});

router.post('/api/remove/:word', async (req, res) => {
    const wordName = req.params.word;

    //find word in db
    const word = await db.Word.findOne({where: {name: wordName}});

    if(!word) {
        //when word doesn't exist, this should never happen, given that user should not be able to add a word unless they searched it.
        return res.status(404).send("Word wasn't searched and cached yet.");
    } else {
        const user = await db.User.findOne({where: {id: req.user.id}});
        await word.removeUser(user);
        return res.status(200).send("word removed.");
    }
});

/**
 * responses with a list of words, with no definition attached.
 */
router.get('/api/wordList/', async (req, res) => {
    const user = await db.User.findOne({where: {id: req.user.id}});
    const words = await user.getWords();
    return res.json(words);
});

module.exports = router;