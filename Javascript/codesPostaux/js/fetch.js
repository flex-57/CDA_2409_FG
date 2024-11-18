const fetchCities = async () => {
    const response = await fetch('https://arfp.github.io/tp/web/javascript/02-zipcodes/zipcodes.json')
    const cities = await response.json()
    return cities
}