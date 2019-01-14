const orm = require('./../config/orm');
const bcrypt = require('bcryptjs');

function getUser(userId, callback) {
    let where = {id: userId};
    orm.selectFromWhere('users', where, callback);
}

function checkUsernameExists(user, exists, notexists) {
    orm.selectFromWhereCol('users', 'username', user.username, results => {
        if (typeof exists !== 'function' || typeof notexists !== 'function') return;
        results.length > 0 ? exists(results) : notexists(results);
    });
}

function login(user, success, failure) {
    let where = {username: user.username};
    orm.selectFromWhere('users', where, results => {
        if(results.length === 1) {
            bcrypt.compare(user.password, results[0].password, (err, match) => {
                if(err) throw err;

                if(match) success(results);
                else {
                    let error = {
                        error: true,
                        message: 'Invalid password'
                    };
                    failure(error);
                }
            });
        } else {
            let error = {
                error: true,
                message: 'Username not found'
            };
            failure(error);
        }
    });
}

function createAccount(user, success, failure) {
    checkUsernameExists(user, failure , () => {
        //hash user provided password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) throw err;

                userHash = {username: user.username, password: hash};
                orm.insertObject('users', userHash, results => {
                    results.affectedRows > 0 ? success(results) : failure(results);
                });
            });
        });

        
    })
    
}

module.exports = {
    getUser: getUser,
    login: login,
    createAccount: createAccount
}