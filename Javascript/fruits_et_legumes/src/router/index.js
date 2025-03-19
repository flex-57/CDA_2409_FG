import { createRouter, createWebHistory } from 'vue-router'
import VegatablesView from '@/views/VegetablesView.vue'
import SalesView from '@/views/SalesView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/legumes',
            name: 'vegetables',
            component: VegatablesView,
        },
        {
            path: '/ventes',
            name: 'sales',
            component: SalesView,
        },
    ],
})

export default router
