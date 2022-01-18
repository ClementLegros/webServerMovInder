//Server Node JS

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    const json = require('./sample.json');
    res.json(json);
});

app.get('/personnage', (req, res) => {
    const json = require('./sample2.json');
    res.json(json);
});

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});