const db = require("../models");
const passport = require("../config/passport");
const router = require('express').Router();

/**
 * check if user is logged in unless they are visiting the login page or the sign up page.
 */
router.use('/', (req, res, next) => {
    if(req.user || req.url.toLowerCase() === "/login" || req.url.toLowerCase() === "/signup") {
        return next();
    } else {
        res.redirect('/login');
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});


module.exports = router;