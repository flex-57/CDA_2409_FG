export const fetchVegetables = async () => {
    try {
        const response = await fetch(
            'https://arfp.github.io/tp/web/javascript2/11-grocery/legumos.json',
        )
        if (!response.ok) {
            throw new Error('Erreur de chargement des données')
        }
        return await response.json()
    } catch (error) {
        console.error('Erreur', error)
        return []
    }
}
