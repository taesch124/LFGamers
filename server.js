const express = require('express');
const handlebars = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const path = require('path');

const loginController = require('./app/controllers/loginController');
const gameController = require('./app/controllers/gameController');

const app = express();
const PORT = process.env.PORT || 8080;

require('./app/config/passport')(passport);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("app/public"));

app.engine("handlebars", handlebars({ 
    defaultLayout: "main",
    layoutsDir: path.join('app/views/layouts')
}));

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.redirect('/auth'));

app.set("view engine", "handlebars");
app.set('views', path.join(__dirname, 'app', 'views'));

app.use('/auth', loginController);
app.use('/', gameController);

app.listen(PORT, () => {
    console.log('Server listening on: http://localhost:' + PORT);
});