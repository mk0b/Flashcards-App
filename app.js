const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

//telling my app to use pug nd set the settings.
app.set('view engine', 'pug');

//telling my app to use bodyparser url encoded and setting extended setting to false
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
});

//writing some middleware to see how it works
app.use( (req, res, next)=>{
    console.log('One');
    next();
});




app.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.render('index', { name });
    } else {
        res.redirect('/hello');
    }
});

app.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.redirect('/');
    } else {
        res.render('hello');
    }
});

//need to setup a post request for our /hello form
app.post('/hello', (req, res) => {
    //setting the cookie up
    res.cookie('username', req.body.username);
    res.redirect('/');
});

app.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
});