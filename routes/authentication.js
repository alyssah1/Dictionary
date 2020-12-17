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

router.post("/api/login", function(req, res, next) {
    passport.authenticate("local", (err, user, info) => {
        if(err) return res.status(500).json(err);
        if(info) return res.status(401).json(info);
        // noinspection JSUnresolvedFunction
        req.logIn(user, err => {
            if(err) return res.status(500).json(err);
            return next();
        });
    })(req, res, next);
});

router.post('/api/login', (req, res) => {
    res.end();
});

router.post('/api/signup', (req, res) => {
    // noinspection JSUnresolvedVariable
    db.User.create({
        username: req.body.username,
        password: req.body.password
    }).then(() => {
        //login the user if user is inserted
        res.redirect(307, "/api/login");
    }).catch(err => {
        let message = err.errors[0].message;
        res.status(401).json({message: message});
    });
});

module.exports = router;