const db = require("../models");
const passport = require("../config/passport");
const router = require('express').Router();

/**
 * check if user is logged in unless they are visiting the login page or the sign up page.
 */
router.use('/', (req, res, next) => {
    if(req.user ||
        req.url.toLowerCase() === "/login" ||
        req.url.toLowerCase() === "/signup" ||
        req.url.toLowerCase() === "/api/login" ||
        req.url.toLowerCase() === "/api/signup") {
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

router.post('/api/login', passport.authenticate("local"), (req, res) => {
    // noinspection JSUnresolvedVariable
    res.json(req.user);
});

router.post('/api/signup', (req, res) => {
    // noinspection JSUnresolvedVariable
    db.User.create({
        username: req.body.username,
        password: req.body.password
    }).then(() => {
        res.redirect(307, "/api/login");
    }).catch(err => {
        res.status(401).json(err);
    });
});

module.exports = router;