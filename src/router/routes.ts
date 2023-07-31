export const constantRoute = [
    {
        path: '/login',
        component: ()=> import("@/views/login/index.vue"),
        name: "login"
    },
    {
        //登录成功以后展示数据的路由
        path: "/",
        component: ()=> import("@/views/home/index.vue"),
        name: 'layout'
    }, 
    {
        path: '/404',
        component: ()=> import("@/views/404/index.vue"),
        name: "404"
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: "Any"
    }
]
