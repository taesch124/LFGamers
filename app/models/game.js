class Game {
    constructor(jsonData) {
        this.json = jsonData;

        this.id = jsonData.id;
        this.name = jsonData.name;
        this.summary = jsonData.summary;
        this.rating = jsonData.rating;
        if(jsonData.popularity) this.popularity = jsonData.popularity.toFixed(1);
        if(jsonData.cover) this.poster = jsonData.cover.url;
        this.genres = parseEnumeratedField(jsonData.genres, genresData);
    }

    static getGamesFromIGDB(jsonArr) {
        let games =  jsonArr.map(e => new Game(e));
        return games;
    }

}

Game.prototype.getInfo = function() {
    let info = '';
    info += 'Name:       ' + this.name + '\n';
    info += 'Rating:     ' + this.rating + '\n';
    info += 'Popularity: ' + this.popularity + '\n';
    info += 'Genre(s):   ' + this.genres + '\n';
    return info;
}

Game.prototype.consoleInfo = function() {
    console.log(this.getInfo());
}

Game.prototype.serialize = function() {
    console.log(this.json);
    return this.json;
}

function parseEnumeratedField(json, data) {
    let fieldValues = [];
    if(!json) return fieldValues;
    for (i = 0; i < json.length; i++) {
        let value = data[json[i]];
        fieldValues.push(value);
    }
    return fieldValues;
}

const genresData = {
    9: 'Puzzle',
    16: 'Turn-based strategy',
    5: 'Shooter',
    30: 'Pinball',
    10: 'Racing',
    31: 'Adventure',
    14: 'Sport',
    26: 'Quiz/Trivia',
    12: 'Role-playing Game',
    24: 'Tactical',
    2: 'Point-and-click',
    13: 'Simulator',
    8: 'Platformer',
    32: 'Indie',
    11: 'Real Time Strategy',
    4: 'Fighting',
    7: 'Music',
    15: 'Strategy',
    25: 'Hack and slash/Beat \'em up',
    33: 'Arcade'
}

const platforms = {
    166: 'Pokemon mini',
    9: 'PlayStation 3',
    11: 'Xbox',
    25: 'Amstrad CPC',
    30: 'Sega 32X',
    47: 'Virtual'
}

module.exports = Game;