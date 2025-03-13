import { createRouter, createWebHashHistory } from 'vue-router'

const routes =[
    {
        path: '',
        name: "Layout",
        redirect: '',
        component: () => import("@/components/Layout"),
        children: [
        {
            path: '/home',
            name: "HomePage",
            component: () => import("@/pages/Home")
        },
        
        ]
    }
]












const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
  })
export default router