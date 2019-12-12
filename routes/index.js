const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.render('index', { name });
    } else {
        res.redirect('/hello');
    }
});

router.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.redirect('/');
    } else {
        res.render('hello');
    }
});

//need to setup a post request for our /hello form
router.post('/hello', (req, res) => {
    //setting the cookie up
    res.cookie('username', req.body.username);
    res.redirect('/');
});

router.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
});



module.exports = router;