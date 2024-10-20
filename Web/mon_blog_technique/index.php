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
                <li><a href="">Accueil</a></li>
                <li><a href="">Articles</a></li>
                <li><a href="">Tutoriaux</a></li>
                <li><a href="">&Agrave; Propos</a></li>
                <li><a href="">Contact</a></li>
            </ul>
        </nav>
        <section id="content">
            <h2>Bienvenue sur notre site</h2>
            <article>
                <a href="">Article 1</a>
                <a href="">Article 2</a>
                <a href="">Article 3</a>
                <a href="">Article 4</a>
                <a href="">Article 5</a>
                <a href="">Article 6</a>
            </article>
        </section>
        <section id="pub">
            <h4>Publicité</h4>
            <div>
                <img src="public/basic-template-aside.jpg" alt="Super livre sur l'algo !" title="Super livre sur l'algo !">
                <p>
                    Ce livre sur l'algorithmique s'adresse à toute personne désireuse de maîtriser les bases essentielles de la programmation.
                    Pour apprendre à programmmer, il faut d'abord comprendre ce qu'est vraiment un ordinateur, comment il fonctionne et surtout 
                    comment il peut faire fonctionner des programmes, comment il manipule et stocke les données et les instructions, quelle est sa logique.
                    Alors, au fur et à mesure, le reste devient évidence : variables, conditions, boucles...
                </p>
            </div>
            <a href="#">J'achète !</a>
        </section>
    </div>

    <script src="js/theme.js"></script>

</body>
</html>