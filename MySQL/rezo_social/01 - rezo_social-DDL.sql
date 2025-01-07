/* SUPPRIMER la BDD "rezo_social" */
DROP DATABASE IF EXISTS rezo_social;

/* SUPPRIMER la BDD "rezo_social" */
CREATE DATABASE IF NOT EXISTS rezo_social;

USE rezo_social;

CREATE TABLE utilisateur
(
	id INT PRIMARY KEY,
    nom_utilisateur VARCHAR(32) UNIQUE NOT NULL,
    email VARCHAR(128) NOT NULL UNIQUE
);

CREATE TABLE aimer
(
	id INT,
    pub_id INT,
    PRIMARY KEY (id, pub_id)
);

CREATE TABLE publication
(
	pub_id INT PRIMARY KEY AUTO_INCREMENT,
    pub_date DATETIME NOT NULL,
    pub_titre VARCHAR(255),
    pub_contenu TEXT,
    id INT
);

/* Modifier publication et y ajouter les clé étrangères */
ALTER TABLE publication ADD FOREIGN KEY (id) REFERENCES utilisateur(id);

ALTER TABLE aimer 
	ADD CONSTRAINT fk_aimer_utilisateur FOREIGN KEY (id) REFERENCES utilisateur(id),
    ADD CONSTRAINT fk_aimer_publication FOREIGN KEY (pub_id) REFERENCES publication(pub_id);
/* ALTER TABLE aimer DROP CONSTRAINT fk_aimer_utilisateur; */





