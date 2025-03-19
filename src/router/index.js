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
        {
            path: 'search',
            name: "SearchMovie",
            component: () => import("@/pages/SearchMovie.vue"),
            props: true
        },

        {
            path: '/phim-bo',
            name: "PhimBo",
            component: () => import("@/pages/PhimBo/PhimBo.vue")
        },
        {
            path: '/phim-le',
            name: "PhimLe",
            component: () => import("@/pages/PhimLe/PhimLe.vue")
        },
        {
            path: '/phim-sap-chieu',
            name: "PhimSapChieu",
            component: () => import("@/pages/PhimSapChieu/SapChieu.vue")
        },
        {
            path: '/the-loai/:path',
            name: "TheLoai",
            component: () => import("@/pages/TheLoai/TheLoai.vue"),
            props: true
        },
        {
            path: '/quoc-gia/:path',
            name: "QuocGia",
            component: () => import("@/pages/QuocGia/QuocGia.vue"),
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