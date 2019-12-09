const express = require('express');

const app = express();

app.set('view engine', 'pug');

app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
});

app.get('/hello', (req, res) => {
    res.render('hello');
});

//need to setup a post request for our /hello form
app.post('/hello', (req, res) => {
    console.dir(req);
    res.render('hello');
});