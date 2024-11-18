<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/main.css">
    <title>TRENDERS</title>
</head>
<body>
    <header>
        <nav>
            <div class="brand"><a href="">TRENDERS</a></div>
            <label for="hamburger" class="label-hamburger" aria-label="Ouvrir le menu">&#9776;</label>
            <input type="checkbox" name="hamburger" id="hamburger">
            <ul>
                <li><a href="">V&Ecirc;TEMENT</a></li>
                <li><a href="">CHAUSSURES</a></li>
                <li><a href="">ACCESSOIRES</a></li>
                <li class="promo">
                    <a href="">
                        <img src="images/flocon-de-neige 1.png" alt="">
                        PROMO HIVER
                    </a>
                </li>
            </ul>
            <div class="profilCart">
                <a href="" alt=""><img src="images/icon.png" alt=""></a> 
                <a href="" alt=""><img src="images/icon2.png" alt=""></a>
            </div>
        </nav>
    </header>
    <main>
        <section>
            <img class="like" src="images/Icon Button.png" alt="">
            <img src="images/Chaussure.jpg" alt="" class="img-article">
        </section>
        <section>
            <h1>Nike sneakers</h1>
            <div class="badge">Tag</div>
            <div class="price"><sup>€</sup>127</div>
            <p class="description">Text</p>
            <form action="">
                <div class="form-container">
                    <div>
                        <label for="taille">Taille</label>
                        <select name="taille" id="taille">
                            <option value="">42</option>
                        </select>
                    </div>
                    <div>
                        <label for="couleur">Couleur</label>
                        <select name="couleur" id="couleur">
                            <option value="">Bleu</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button>Ajouter au panier</button>
                </div>
            </form>
            <div class="carac">
                <div class="carac-title">
                    <h4>Caratéristique</h4>
                    <img src="images/Chevron up.png" alt="">
                </div>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Molestias nulla iusto pariatur harum ab natus, eligendi 
                    laborum, quae officia voluptatem libero delectus, 
                    in sint beatae. Id totam explicabo voluptatibus ducimus 
                    quibusdam commodi suscipit cum? Voluptas.
                </p>
            </div>
        </section>
    </main>
</body>
</html>