const Inquirer = require('inquirer');

function gameSelectPrompt(games) {
    let choices = games.map(e => e.name);
    Inquirer.prompt([
        {
            type: 'list',
            message: 'Select a game:',
            name: 'gameChosen',
            choices: choices
        }
    ]).then(answers => {
        postPrompt(games, answers.gameChosen);
    });
}

function postPrompt(games, gameName) {
    let game = games.filter(e => e.name === gameName)[0];
    Inquirer.prompt([
        {
            type: 'confirm',
            message: 'Write a post for ' + game.name + '?',
            name: 'post'
        },
        {
            type: 'input',
            message: 'Write your post:',
            name: 'postMessage',
            when: answers => answers.post
        }
    ]).then(answers => {
        console.log('Message \"' + answers.postMessage + '\" posted!');
    });
}

module.exports = {
    gameSelectPrompt: gameSelectPrompt,
    postPrompt: postPrompt
}