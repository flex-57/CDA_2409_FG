<?php

require 'templates/haut.php';

if (isset($_GET['page']) && $_GET['page'] !== "" && file_exists('templates/' . $_GET['page'] . '.php')) {
    require 'templates/' . $_GET['page'] . '.php';
}

else {
    require 'templates/accueil.php';
}

require 'templates/bas.php';
