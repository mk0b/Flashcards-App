const express = require('express');
const router = express.Router();
const {data} = require('../data/flashcardData.json');
//ES16 way of saying cards = data.cards;
const {cards} = data;

router.get('/', (req, res) => {
    const numberOfCards = cards.length;
    const flashcardId = Math.floor(Math.random() * numberOfCards);
    res.redirect(`/cards/${flashcardId}`);
});

router.get('/:id', (req, res) => {
    const {side} = req.query;
    const {id} = req.params;
    const text = cards[id][side];
    const {hint} = cards[id];

    if (!side) {
        return res.redirect(`/cards/${id}?side=question`);
    }
    const name = req.cookies.username;
    const templateData = {id, text, name};

    if (side === 'question') {
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
        templateData.sideToShowDisplay = 'Answer';
    } else if (side === 'answer') {
        templateData.sideToShow = 'question';
        templateData.sideToShowDisplay = 'Question';
    }

    res.render('card', templateData);
});

module.exports = router;