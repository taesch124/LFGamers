const Dotenv = require('dotenv').config();
const IGDB = require('igdb-api-node').default;
const Keys = require('./keys.js');
const igdbClient = IGDB(Keys.igdb);
const Game = require('./game.js');
const Prompts = require('./prompts.js');

async function searchGame(searchPhrase) {
    igdbClient.games({
        search: searchPhrase,
        fields: '*',
        limit: 5
    }).then(response => {
        let jsonArr = response.body;
        let games = [];

        for(let i = 0; i < jsonArr.length; i++) {
            let game = new Game(jsonArr[i]);
            game.consoleInfo();
            games.push(game);
        }

        Prompts.gameSelectPrompt(games);
        return games;
    }).catch(error => {
        console.log(error);
    });
}

function searchPopularGames() {
    igdbClient.games({
        filters: {
            'release_dates.date-gt': '2018-10-19',
            'release_dates.date-lt': '2018-11-19',
            'popularity-gt': '80'
        },
        limit: 5,
        fields: ['name', 
        'release_dates.date', 
        'rating',
        'popularity',
        'genres',
        'platforms']
    }).then(response => {
        let jsonArr = response.body;
        let games = [];
        for(let i = 0; i < jsonArr.length; i++) {
            let game = new Game(jsonArr[i]);
            game.consoleInfo();
            games.push(game);
        }

        return games;
    }).catch(error => {
        console.log(error);
    });
}

function getGenres() {
    igdbClient.genres({
        fields: ['id', 'name'],
        limit: 50
    }).then(response => {
        console.log(response.body);
    }).catch(error => {
        console.log(error);
    });
}

module.exports = {
    searchGame: searchGame,
    searchPopularGames: searchPopularGames,
    getGenres: getGenres
}