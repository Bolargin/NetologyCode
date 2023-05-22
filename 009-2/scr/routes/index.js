const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Добро пожаловать в Библиотеку!',
    })
});

module.exports = router;