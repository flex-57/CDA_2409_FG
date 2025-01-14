/* SUPPRIMER la BDD "mini_faq" */
DROP DATABASE IF EXISTS mini_faq;

/* SUPPRIMER la BDD "mini_faq" */
CREATE DATABASE IF NOT EXISTS mini_faq;

USE mini_faq;

CREATE TABLE users
(
	user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_email VARCHAR(128) NOT NULL UNIQUE CONSTRAINT EMAIL_CHECK CHECK (REGEXP_LIKE(user_email, '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$')),
    user_lastname VARCHAR(50) NOT NULL,
    user_firstname VARCHAR(50) NOT NULL
);

CREATE TABLE questions
(
	question_id INT PRIMARY KEY AUTO_INCREMENT,
    question_date DATETIME DEFAULT (CURRENT_DATE),
    question_label VARCHAR(255) NOT NULL,
    question_response TEXT NOT NULL,
    user_id INT
);

CREATE TABLE categories
(
	category_name VARCHAR(30) PRIMARY KEY,
    category_description VARCHAR(255) NOT NULL,
    category_order TINYINT NOT NULL UNIQUE
);

CREATE TABLE categories_questions
(
	question_id INT,
    category_name VARCHAR(30)
);

ALTER TABLE categories_questions 
	ADD FOREIGN KEY fk_categories_questions_question (question_id) REFERENCES questions(question_id),
	ADD FOREIGN KEY fk_categories_questions_categories (category_name) REFERENCES categories(category_name);

ALTER TABLE questions ADD FOREIGN KEY fk_questions_users (user_id) REFERENCES users(user_id);



