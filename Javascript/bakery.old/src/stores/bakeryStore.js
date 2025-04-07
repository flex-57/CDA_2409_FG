import { reactive } from 'vue'

export const useBakeryStore = () => {
    const maintenanceCost = () => 0.05 * state.bakeryLvl * state.mills
    const flourCost = () => state.bakeryLvl + 1

    const state = reactive({
        bakeryLvl: 1,
        mills: 1,
        goldProd: 0,
        goldSpent: 0,
        goldStock: 50000,
        flourProd: 0,
        flourStock: 200,
        baguettesProd: 0,
        baguettesStock: 100,
        bakeryImprovementPrice: 100,
        millsImprovementPrice: 80,
    })

    const bakeryLvlUp = (addLogs) => {
        if (state.goldStock >= state.bakeryImprovementPrice) {
            state.goldStock -= state.bakeryImprovementPrice
            state.goldSpent += state.bakeryImprovementPrice
            state.bakeryLvl++
            state.bakeryImprovementPrice *= 1.5
            addLogs(`Boulangerie améliorée au niveau ${state.bakeryLvl}`)
        } else {
            addLogs(`Pas assez d'or 💰 pour améliorer la boulangerie`)
        }
    }

    const millsLvlUp = (addLogs) => {
        if (state.goldStock >= state.millsImprovementPrice) {
            state.goldStock -= state.millsImprovementPrice
            state.goldSpent += state.millsImprovementPrice
            state.mills++
            state.millsImprovementPrice *= 1.5
            addLogs(`Moulins améliorés au niveau ${state.mills}`)
        } else {
            addLogs(`Pas assez d'or 💰 pour améliorer les moulins`)
        }
    }

    const start = () => {
        if (state.goldStock >= maintenanceCost()) {
            state.goldStock -= maintenanceCost()
            state.goldSpent += maintenanceCost()
        } else {
            state.goldStock = 0
        }

        let netFlour = state.mills - flourCost()
        if (netFlour > 0) {
            state.flourProd += netFlour
            state.flourStock += netFlour
        }

        if (state.flourStock >= state.bakeryLvl) {
            state.flourStock -= state.bakeryLvl
            state.baguettesStock += state.bakeryLvl
            state.baguettesProd += state.bakeryLvl
        }
    }

    return { state, bakeryLvlUp, millsLvlUp, start }
}
