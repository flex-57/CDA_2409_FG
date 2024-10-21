<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="dark light">

    <link rel="stylesheet" href="style/reset.css">
    <link rel="stylesheet" href="style/style.css">

    <title>Mon blog technique</title>

</head>
<body>
    <header id="header">
        <h1>Mon blog technique</h1>
        <div class="dark-or-light">
            <label for="dark-or-light" class="label-dark-or-light">Mode sombre</label>
            <input type="checkbox" id="dark-or-light" checked />
        </div>
    </header>
    <div class="container">
        <nav>
            <label for="hamburger" class="label-hamburger" aria-label="Ouvrir le menu">&#9776;</label>
            <input type="checkbox" id="hamburger" />
            <h2>Menu</h2>
            <ul>
                <li><a href="/">Accueil</a></li>
                <li><a href="/?page=articles">Articles</a></li>
                <li><a href="">Tutoriaux</a></li>
                <li><a href="/?page=about">&Agrave; Propos</a></li>
                <li><a href="">Contact</a></li>
            </ul>
        </nav>
        <main>
        