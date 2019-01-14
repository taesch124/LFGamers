const express = require('express');
const igdb = require('./../api/igdb');

const {ensureAuthenticated} = require("../config/auth");

const router = express.Router();

router.get('/popularGames', ensureAuthenticated, (req, res) => {
    igdb.searchPopularGames(games => {
        console.log(games[0]);
        res.render('games', {games: games});
    })
});

router.get('/:game', ensureAuthenticated, (req, res) => {
    let name = req.params.game;

    igdb.searchGame(name, games => {
        console.log(games[0]);
        res.render('games',{games: games});
    });

});

router.get('/games/:id', ensureAuthenticated, (req, res) => {
    let id = req.params.id;

    igdb.searchGameById(id, game => {
        //console.log(game);
        res.render('game', game);
    })
});



module.exports = router;