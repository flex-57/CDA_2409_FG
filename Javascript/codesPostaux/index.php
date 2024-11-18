<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <title>Codes Postaux</title>
</head>
<body>
    <header>
        <h1>Codes Postaux</h1>
        <label for="cp"><i class="fa-solid fa-magnifying-glass"></i></label>
        <input type="text" list="cities" name="cp" id="cp">
        <datalist id="cities">

        </datalist>
    </header>

    <script>
        const input = document.querySelector('#cp')

        input.addEventListener('input', function() {
            
            console.log(this.value)
        })


        const fetchCities = async () => {
            const response = await fetch('https://arfp.github.io/tp/web/javascript/02-zipcodes/zipcodes.json')
            const cities = await response.data
            
        }
        fetchCities()
    </script>
</body>
</html>