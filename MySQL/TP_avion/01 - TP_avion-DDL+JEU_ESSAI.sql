/* SUPPRIMER la BDD */
DROP DATABASE IF EXISTS TP_AVION;

/* SUPPRIMER la BDD */
CREATE DATABASE TP_AVION;

USE TP_AVION;

CREATE TABLE avion
(
	av INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	avmarq VARCHAR(50) NOT NULL,
	avtype VARCHAR(50) NOT NULL,
	cap SMALLINT NOT NULL,
	loc VARCHAR(50)
);

ALTER TABLE avion AUTO_INCREMENT = 100;

CREATE TABLE pilote
(
	pil INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	pilnom VARCHAR(80) NOT NULL,
	adr VARCHAR(80)
);

CREATE TABLE vol
(
	vol CHAR(5) PRIMARY KEY,
	pil INT UNSIGNED NOT NULL,
	av INT UNSIGNED NOT NULL,
	vd VARCHAR(80) NOT NULL,
	va VARCHAR(80) NOT NULL,
	hd TINYINT NOT NULL,
	ha	TINYINT NOT NULL
);

ALTER TABLE vol ADD FOREIGN KEY fk_vol_avion (av) REFERENCES avion(av);
ALTER TABLE vol ADD FOREIGN KEY fk_vol_pilote (pil) REFERENCES pilote(pil);

INSERT INTO avion (avmarq, avtype, cap, loc) VALUES 
	('AIRBUS', 'A320', 300, 'Nice'),
	('BOEING', 'B707', 250, 'Paris'),
	('AIRBUS', 'A320', 300, 'Toulouse'),
	('CARAVELLE', 'Caravelle', 200, 'Toulouse'),
	('BOEING', 'B747', 400, 'Paris'),
	('AIRBUS', 'A320', 300, 'Grenoble'),
	('ATR', 'ATR42', 50, 'Paris'),
	('BOEING', 'B727', 300, 'Lyon'),
	('BOEING', 'B727', 300, 'Nantes'),
	('AIRBUS', 'A340', 350, 'Bastia');
	
INSERT INTO pilote (pilnom, adr) VALUES
	('SERGE', 'Nice'),
	('JEAN', 'Paris'),
	('CLAUDE', 'Grenoble'),
	('ROBERT', 'Nantes'),
	('SIMON', 'Paris'),
	('LUCIEN', 'Toulouse'),
	('BERTRAND', 'Lyon'),
	('HERVE', 'Bastia'),
	('LUC', 'Paris');
	
INSERT INTO vol (vol, av, pil, vd, va, hd, ha) VALUES
	('IT100', 100, 1, 'NICE', 'PARIS', 7, 9),
	('IT101', 100, 2, 'PARIS', 'TOULOUSE', 11, 12),
	('IT102', 101, 1, 'PARIS', 'NICE', 12, 14),
	('IT103', 105, 3, 'GRENOBLE', 'TOULOUSE', 9, 11),
	('IT104', 105, 3, 'TOULOUSE', 'GRENOBLE', 17, 19),
	('IT105', 107, 7, 'LYON', 'PARIS', 6, 7),
	('IT106', 109, 8, 'BASTIA', 'PARIS', 10, 13),
	('IT107', 106, 9, 'PARIS', 'BRIVE', 7, 8),
	('IT108', 106, 9, 'BRIVE', 'PARIS', 19, 20),
	('IT109', 107, 7, 'PARIS', 'LYON', 18, 19),
	('IT110', 102, 2, 'TOULOUSE', 'PARIS', 15, 16),
	('IT111', 101, 4, 'NICE', 'NANTES', 17, 19),
	('IT112', 103, 5, 'PARIS', 'NICE', 11, 13),
	('IT113', 104, 6, 'NICE', 'PARIS', 13, 15);
	


	
