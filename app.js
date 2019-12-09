const express = require('express');

const app = express();

app.set('view engine', 'pug');

app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
});