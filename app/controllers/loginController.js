const express = require('express');
const async = require('async');
const User = require('../models/login');
const passport = require('passport');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('login', {});
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) =>{
        if (err) { return next(err); }
        if(info) {
            return res.send(info);
        }

        req.logIn(user, (loginError) => {
            if(loginError) {return next(loginError);}

            let redirect = {
                redirect: true,
                url: '/popularGames'
            };
            return res.send(redirect);
        });
    })(req, res, next);
});

router.post('/create-account', (req, res) => {
    let user = req.body;

    User.createAccount({username: user.username, password: user.password},
        (results) => {
            res.send(results);
        },
        () => {
            let error = {
                error: true,
                message: 'Username already exists'
            }
            res.send(error);
    });
});

module.exports = router;