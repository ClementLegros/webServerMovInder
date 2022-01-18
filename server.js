//Server Node JS

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send('Dylan et calvin sont trop beau');
});

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});