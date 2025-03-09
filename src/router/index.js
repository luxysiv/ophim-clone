import { createRouter, createWebHashHistory } from 'vue-router'

const routes =[
    {
        path: '',
        name: "Layout",
        redirect: '',
        component: () => import("@/components/Layout"),
        children: [{
            path: '/TestPage',
            name: "TestPage",
            component: () => import("@/components/TestPage")
        },
        {
            path: '/Profile',
            name:'ProfilePage',
            component: () => import("@/pages/Profile")
        },
        {
            path: '/Action',
            name:'ActionPage',
            component: () => import("@/pages/Action")
        },
        {
            path: '/Setting',
            name:'SettingPage',
            component: () => import("@/pages/Setting")
        }
        ]
    }
]












const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
  })
export default router