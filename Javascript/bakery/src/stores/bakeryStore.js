import { computed, onMounted, reactive, watch } from 'vue'

export const useBakeryStore = (addLogs) => {

    const stateBakery = reactive({
        bakeryLvl: 1,
        millsLvl: 1,
        goldCollected: 0,
        goldSpent: 0,
        flourCollected: 0,
        baguettesCollected: 0,
        goldStock: 50000,
        flourStock: 25,
        baguettesStock: 100,
        bakeryImprovementPrice: 100,
        millsImprovementPrice: 80,
        isOpen: false,
    })

    const maintenanceCost = computed(() => 0.05 * stateBakery.bakeryLvl * stateBakery.millsLvl)
    const flourCost = computed(() => stateBakery.bakeryLvl + 1)
    const flourNet = computed (() => stateBakery.millsLvl - flourCost.value)

    const bakeryLvlUp = () => {
        if (stateBakery.goldStock >= stateBakery.bakeryImprovementPrice) {
            stateBakery.goldStock -= stateBakery.bakeryImprovementPrice
            stateBakery.goldSpent += stateBakery.bakeryImprovementPrice
            stateBakery.bakeryLvl++
            stateBakery.bakeryImprovementPrice *= 1.5
            addLogs(`Boulangerie améliorée au niveau ${stateBakery.bakeryLvl}`)
        } else {
            addLogs(`Pas assez d'or 💰 pour améliorer la boulangerie`)
        }
    }

    const millsLvlUp = () => {
        if (stateBakery.goldStock >= stateBakery.millsImprovementPrice) {
            stateBakery.goldStock -= stateBakery.millsImprovementPrice
            stateBakery.goldSpent += stateBakery.millsImprovementPrice
            stateBakery.millsLvl++
            stateBakery.millsImprovementPrice *= 1.5
            addLogs(`Moulins améliorés au niveau ${stateBakery.millsLvl}`)
        } else {
            addLogs(`Pas assez d'or 💰 pour améliorer les moulins`)
        }
    }

    const openCloseBakery = () => {
        stateBakery.isOpen = !stateBakery.isOpen
        addLogs(
            stateBakery.isOpen
                ? `La boulangerie est ouverte 🚪✔`
                : `La boulangerie est fermée 🚪✘`,
        )
    }

    const startProduction = () => {
        if (stateBakery.isOpen) {
            if (stateBakery.goldStock > maintenanceCost.value) {
                stateBakery.goldStock -= maintenanceCost.value
                stateBakery.goldSpent += maintenanceCost.value
            } else stateBakery.goldStock = 0

            stateBakery.flourStock += flourNet.value
            if (stateBakery.flourStock > 0 ) {
                stateBakery.flourCollected += flourNet.value
            }

            if(stateBakery.flourStock > stateBakery.bakeryLvl ) {
                stateBakery.baguettesCollected += stateBakery.bakeryLvl
                stateBakery.baguettesStock += stateBakery.bakeryLvl
            }
        }
        console.log(flourNet.value);

    }

    watch(
        () => stateBakery,
        (val) => {
            localStorage.setItem('bakery', JSON.stringify(val))
        },
        { deep: true },
    )

    onMounted(() => {
        const saveBakery = JSON.parse(localStorage.getItem('bakery'))
        if (saveBakery) Object.assign(stateBakery, saveBakery)
    })

    return { stateBakery, bakeryLvlUp, millsLvlUp, openCloseBakery, startProduction }
}
