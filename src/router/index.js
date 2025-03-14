import { createRouter, createWebHashHistory } from 'vue-router'

const routes =[
    {
        path: '',
        name: "Layout",
        redirect: '/home',
        component: () => import("@/components/Layout"),
        children: [
        {
            path: '/home',
            name: "HomePage",
            component: () => import("@/pages/Home")
        },
        {
            path: '/movie/:slug',
            name: "MovieDetail",
            component: () => import("@/pages/MoiveDetail.vue"),
            props: true
        },
        ]
    }
]












const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
  })
export default router