const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const app = express();

//telling my app to use pug nd set the settings.
app.set('view engine', 'pug');

//telling my app to use bodyparser url encoded and setting extended setting to false
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use('/static',express.static('public'));

const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes);

app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
});

//writing some middleware to see how it works
app.use( (req, res, next)=>{
    console.log('Hello');
    next();
});

//catching 404 code.
app.use( (req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

//custom error handlier
app.use( (err, req, res, next) => {
    res.locals.error = err;
    res.status(500);
    res.render('error');
});