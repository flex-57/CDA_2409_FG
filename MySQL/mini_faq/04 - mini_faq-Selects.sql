/* Sélectionner tous les utilisateurs (identifiant, nom, prénom, email). */
SELECT user_id, user_email, user_lastname, user_firstname FROM users;

/* Sélectionner toutes les questions (date, intitulé, réponse, identifiant utilisateur) triées par date de la plus ancienne à la plus récente. */
SELECT question_date, question_label, question_response, user_id FROM questions ORDER BY question_date ASC;

/* Sélectionner les questions (identifiant, date, intitulé, réponse) de l’utilisateur n°2. */
SELECT question_id, question_date, question_label, question_response FROM questions WHERE user_id = 2;

/* Sélectionner les questions (date, intitulé, réponse, identifiant utilisateur) de l’utilisateur Eva Satiti. */
/*SELECT question_date, question_label, question_response, user_id FROM questions WHERE user_id = (SELECT user_id FROM users WHERE user_lastname = 'Satiti' AND user_firstname = 'Eva');*/
SELECT q.question_date, q.question_label, q.question_response, q.user_id FROM questions q
	JOIN users u ON q.user_id = u.user_id
    WHERE u.user_lastname = 'Satiti' AND u.user_firstname = 'Eva';
    
/* Sélectionner les questions (identifiant, date, intitulé, réponse, identifiant utilisateur) dont l’intitulé contient “SQL”. Le résultat est trié par le titre et par ordre décroissant. */
SELECT question_id, question_date, question_label, question_response, user_id FROM questions
	WHERE question_label LIKE '%SQL%' 
    ORDER BY question_label DESC;

/* Sélectionner les catégories (nom, description) sans question associée. */
/*
SELECT category_name, category_description FROM categories
    WHERE category_name NOT IN (
		SELECT category_name FROM categories_questions
    );
*/
SELECT c.category_name, c.category_description FROM categories c
	LEFT JOIN categories_questions cq ON c.category_name = cq.category_name
    WHERE cq.category_name IS NULL;

/* Sélectionner les questions triées par titre (ordre alphabétique) avec le nom et prénom de l’auteur (nécessite une jointure). */
SELECT q.question_label, u.user_lastname, u.user_firstname FROM questions q
	JOIN users u
    ORDER BY q.question_label ASC;

/* Sélectionner les catégories (nom) avec, pour chaque catégorie le nombre de questions associées (nécessite une jointure). */
SELECT c.category_name, COUNT(cq.question_id) 'Nb questions associées' FROM categories c
	JOIN categories_questions cq ON c.category_name = cq.category_name
    GROUP BY c.category_name;

