//DB postgresql

const Pool = require('pg').Pool
const pool = new Pool({
    user: "uxzeurnzypayhy",
    host: "ec2-54-228-97-176.eu-west-1.compute.amazonaws.com",
    database: "ddj908o61q0v9g",
    password: "d6b1db639e1f499f6934bdcab92894bda1109fd964254f2597f03fb7a0d32391",
    port: 5432,
    ssl: true

});

//Server Node JS

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    const json = require('./sample.json');
    res.json(json);
});

app.get('/user', function (req, res) {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    pool.query('select * from utilisateur', (error, results) => {
        if (error) {
            return console.error(error);
        }
        res.status(200).json(results.rows);
    });
})

app.get('/login/:username/:password', function (req, res) {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    const username = req.params.username;
    const password = req.params.password;

    pool.query('select * from utilisateur where nom_utilisateur = $1 and mdp_utilisateur = $2', [username, password] ,(error, results) => {
        if (error) {
            return console.error(error);
        }
        res.status(200).json(results.rows);
    });
})

app.get('/personnage', (req, res) => {
    const json = require('./sample2.json');
    res.json(json);
});

app.listen(port, () => {
    console.log('Server app listening on port ' + port);
});