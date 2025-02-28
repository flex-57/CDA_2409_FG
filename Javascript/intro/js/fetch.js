const fetchVal = async () => {
    const response = await fetch('json/cars.json')
    const values = await response.json()
    return values
}