/* CREER UN UTILISATEUR */
CREATE USER 'toto'@'localhost' IDENTIFIED BY 'password';

/* Accorder tous les privilèges à Toto sur la BDD rezo_social */
GRANT ALL PRIVILEGES ON rezo_social.* TO 'toto'@'localhost';

/* RECHARGER LES PRIVILEGES au niveau du serveur */
FLUSH PRIVILEGES;