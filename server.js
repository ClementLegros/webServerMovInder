// #region config

//DB postgresql

const Pool = require("pg").Pool;
const pool = new Pool({
    user: "uxzeurnzypayhy",
    host: "ec2-54-228-97-176.eu-west-1.compute.amazonaws.com",
    database: "ddj908o61q0v9g",
    password: "d6b1db639e1f499f6934bdcab92894bda1109fd964254f2597f03fb7a0d32391",
    port: 5432,
    ssl: true,
});

//Server Node JS

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// #endregion 

// #region GET

app.get("/", (req, res) => {
    res.json(["Et salut à tous c'est Fanta"]);
});

app.get("/user", function (req, res) {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    pool.query("select * from utilisateur", (error, results) => {
        if (error) {
            return console.error(error);
        }
        res.status(200).json(results.rows);
    });
});

app.get("/films", function (req, res) {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    pool.query("select * from films", (error, results) => {
        if (error) {
            return console.error(error);
        }
        res.status(200).json(results.rows);
    });
})

app.get("/login/:username/:password", function (req, res) {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    const username = req.params.username;
    const password = req.params.password;

    pool.query(
        "select * from utilisateur where nom_utilisateur = $1 and mdp_utilisateur = $2",
        [username, password],
        (error, results) => {
            if (error) {
                return console.error(error);
            }
            res.status(200).json(results.rows);
        }
    );
});

app.get("/conversation/:idUser", function (req, res) {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    const idUser = req.params.idUser;
    pool.query(
        "select distinct * from conversation, est_dans where conversation.id_conversation = est_dans.id_conversation and est_dans.id_utilisateur = $1",
        [idUser],
        (error, results) => {
            if (error) {
                return console.error(error);
            }
            res.status(200).json(results.rows)
        }
    );

})

app.get("/conversation/:idUser/:idConversation", function (req, res) {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    const idUser = req.params.idUser;
    const idConversation = req.params.idConversation;
    pool.query(
        "select utilisateur.id_utilisateur, utilisateur.nom_utilisateur, utilisateur.e_mail, utilisateur.mdp_utilisateur, utilisateur.sexe, utilisateur.orientation from conversation, est_dans, utilisateur where conversation.id_conversation = est_dans.id_conversation and est_dans.id_utilisateur = utilisateur.id_utilisateur and conversation.id_conversation = $1 and utilisateur.id_utilisateur != $2",
        [idUser, idConversation],
        (error, results) => {
            if (error) {
                return console.error(error);
            }
            res.status(200).json(results.rows)
        }
    );

})

app.get("/message/conversation/:idConversation", function (req, res) {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    const idConversation = req.params.idConversation;
    pool.query(
        "select * from contient, message where contient.id_message = message.id_message and contient.id_conversation = $1",
        [idConversation],
        (error, results) => {
            if (error) {
                return console.error(error);
            }
            res.status(200).json(results.rows)
        }
    );

})



// #endregion

// #region post

app.post("/registerUser", (req, res) => {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

    const { nom, email, num, mdp, sexe, orientation } = req.body;
    pool.query(
        "INSERT into utilisateur VALUES(DEFAULT,$1,$2,$3,$4,$5,$6)",
        [nom, email, num, mdp, sexe, orientation],
        (error, results) => {
            if (error) {
                console.error(error);
            }
            res.status(201).send(`User added with ID: ${res.insertId}`);
        }
    );
});

app.post("/registerMovie", (req, res) => {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

    const { titre, synopsis, directeur, affiche, note } = req.body;
    pool.query(
        "INSERT into films VALUES(DEFAULT,$1,$2,$3,$4,$5)", [titre, synopsis, directeur, affiche, note],
        (error, results) => {
            if (error) {
                console.error(error);
            }
            res.status(201).send(`User added with ID: ${res.insertId}`)
        }
    );
});

app.post("/registerLike", (req, res) => {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

    const { idUser, idFilm, avis } = req.body;
    pool.query(
        "INSERT into aime VALUES($1,$2,$3)", [idUser, idFilm, avis],
        (error, results) => {
            if (error) {
                console.error(error);
            }
            res.status(201).send(`User added with ID: ${res.insertId}`)
        }
    );
});

app.post("/registerGenreMovie", (req, res) => {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    
    const { idFilm, idGenre } = req.body;
    pool.query(
        "INSERT into possede VALUES(DEFAULT,$1,$2)", [idFilm, idGenre],
        (error, results) => {
            if (error) {
                console.error(error);
            }
            res.status(201).send(`User added with ID: ${res.insertId}`);
        }
    );
});


// #endregion

app.listen(port, () => {
    console.log("Server app listening on port " + port);
});
