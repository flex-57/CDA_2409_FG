import { createRouter, createWebHistory } from 'vue-router'
import VegatablesView from '@/views/VegetablesView.vue'
import NewVegetableView from '@/views/NewVegetableView.vue'
import SalesView from '@/views/SalesView.vue'
import NewSaleView from '@/views/NewSaleView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/legumes',
            name: 'vegetables',
            component: VegatablesView,
        },
        {
            path: '/ajouter_un_legume',
            name: 'newVegetable',
            component: NewVegetableView,
        },
        {
            path: '/ventes',
            name: 'sales',
            component: SalesView,
        },
        {
            path: '/ajouter_une_vente',
            name: 'newSale',
            component: NewSaleView,
        },
    ],
})

export default router
