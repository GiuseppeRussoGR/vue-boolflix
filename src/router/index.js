import Vue from 'vue'
import VueRouter from 'vue-router'
import Profile from "@/views/Profile";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/browse',
        props: true,
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Browse.vue'),
        children: [
            {
                path: '/',
                name: 'browse_list',
                component: () => import('../components/browser_list')
            },
            {
                path: '/browse/search',
                name: 'search',
                components: {
                    search: () => import('../components/Search')
                },
            }
        ]
    },
    {
        path: '#',
        name: '#',
        redirect: '/browse'
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
