export const fetchCereals = async () => {
    try {
        const response = await fetch(
            'https://arfp.github.io/tp/web/javascript2/10-cereals/cereals.json',
        )
        if (!response.ok) {
            throw new Error('Erreur de chargement des données')
        }
        return (await response.json()).data
    } catch (error) {
        console.error('Erreur', error)
        return []
    }
}
