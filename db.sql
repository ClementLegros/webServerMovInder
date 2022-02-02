CREATE TABLE utilisateur(
  id_utilisateur SERIAL,
  nom_utilisateur VARCHAR(100),
  e_mail VARCHAR(150),
  num_utilisateur VARCHAR(10),
  mdp_utilisateur VARCHAR(250),
  sexe VARCHAR(10),
  orientation VARCHAR(50),
  PRIMARY KEY(id_utilisateur)
);
CREATE TABLE message(
  id_message SERIAL,
  date_envoie_msg DATETIME,
  message VARCHAR(350),
  id_utilisateur INT NOT NULL,
  PRIMARY KEY(id_message),
  FOREIGN KEY(id_utilisateur) REFERENCES utilisateur(id_utilisateur)
);
CREATE TABLE films(
  id_film SERIAL,
  titre_film VARCHAR(250),
  sypnosis VARCHAR(300),
  directeur VARCHAR(300),
  affiche VARCHAR(250),
  note INT,
  PRIMARY KEY(id_film)
);
CREATE TABLE genre(
  id_genre SERIAL,
  genre VARCHAR(300),
  PRIMARY KEY(id_genre)
);
CREATE TABLE conversation(
  id_conversation SERIAL,
  date_deb_conversation DATETIME,
  rendez_vous INT,
  PRIMARY KEY(id_conversation)
);
CREATE TABLE poss Ã ¨ de(
  id_film INT,
  id_genre INT,
  PRIMARY KEY(id_film, id_genre),
  FOREIGN KEY(id_film) REFERENCES films(id_film),
  FOREIGN KEY(id_genre) REFERENCES genre(id_genre)
);
CREATE TABLE est_dans(
  id_utilisateur INT,
  id_conversation INT,
  PRIMARY KEY(id_utilisateur, id_conversation),
  FOREIGN KEY(id_utilisateur) REFERENCES utilisateur(id_utilisateur),
  FOREIGN KEY(id_conversation) REFERENCES conversation(id_conversation)
);
CREATE TABLE contient(
  id_message INT,
  id_conversation INT,
  PRIMARY KEY(id_message, id_conversation),
  FOREIGN KEY(id_message) REFERENCES message(id_message),
  FOREIGN KEY(id_conversation) REFERENCES conversation(id_conversation)
);
CREATE TABLE aime(
  id_utilisateur INT,
  id_film INT,
  PRIMARY KEY(id_utilisateur, id_film),
  FOREIGN KEY(id_utilisateur) REFERENCES utilisateur(id_utilisateur),
  FOREIGN KEY(id_film) REFERENCES films(id_film)
);

/* CREATE USER */

INSERT into
  utilisateur
VALUES
  (
    1,
    'Albert',
    'albert-mail@mail.fr',
    '0650789962',
    '123456',
    'homme',
    'hétéro'
  )

  INSERT into
  utilisateur(
    nom_utilisateur,
    e_mail,
    num_utilisateur,
    mdp_utilisateur,
    sexe,
    orientation
  )
VALUES
  (
    'Robloblo',
    'robloblo-mail@mail.fr',
    '0650789962',
    '123456',
    'homme',
    'hétéro'
  )

  INSERT into
  utilisateur
VALUES
  (
    DEFAULT,
    'Robloblo',
    'robloblo-mail@mail.fr',
    '0650789962',
    '123456',
    'homme',
    'hétéro'
  )