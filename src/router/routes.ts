export const constantRoute = [
    {
        path: '/login',
        component: () => import("@/views/login/index.vue"),
        name: "login",
        meta: {
            title: "登录",
            hidden: true,
            icon: "Avatar"
        }
    },
    {
        //登录成功以后展示数据的路由
        path: "/",
        // component: ()=> import("@/views/home/index.vue"),
        component: () => import("@/layout/index.vue"),
        name: 'layout',
        meta: {
            title: "layout",
            hidden: false
        },
        children: [
            {
                path: "/home",
                component: () => import("@/views/home/index.vue"),
                meta: {
                    title: "首页",
                    icon: "HomeFilled",
                    hidden: false
                }
            }
        ]
    },
    {
        path: '/screen',
        component: () => import('@/views/screen/index.vue'),
        name: 'Screen',
        meta: {
            title: 'Screen',
            hidden: false,
            icon: 'Platform',
        },
    },
    {
        path: "/acl",
        component: () => import("@/layout/index.vue"),
        meta: {
            hidden: false,
            title: "权限管理",
            icon: "Lock"
        },
        redirect: "/acl/user",
        children: [
            {
                path: "/acl/user",
                component: () => import("@/views/acl/user/index.vue"),
                name: "User",
                meta: {
                    title: "用户管理",
                    hidden: false,
                    icon: "User"
                }
            }, {
                path: "/acl/role",
                name: "Role",
                component: () => import("@/views/acl/role/index.vue"),
                meta: {
                    title: "角色管理",
                    hidden: false,
                    icon: "UserFilled"
                }
            },
            {
                path: "/acl/permission",
                name: "Permission",
                component: () => import("@/views/acl/permission/index.vue"),
                meta: {
                    title: "权限管理",
                    hidden: false,
                    icon: "Monitor"
                }
            }
        ]
    },
    {
        path: '/product',
        component: () => import('@/layout/index.vue'),
        name: 'Product',
        meta: {
            title: '商品管理',
            hidden: false,
            icon: 'Goods',
        },
        redirect: '/product/trademark',
        children: [
            {
                path: '/product/trademark',
                component: () => import('@/views/product/trademark/index.vue'),
                name: 'Trademark',
                meta: {
                    title: '品牌管理',
                    icon: 'ShoppingCart',
                    hidden: false,
                },
            },
            {
                path: '/product/attr',
                component: () => import('@/views/product/attr/index.vue'),
                name: 'Attr',
                meta: {
                    title: '属性管理',
                    icon: 'Management',
                    hidden: false,
                },
            },
            {
                path: '/product/spu',
                component: () => import('@/views/product/spu/index.vue'),
                name: 'Spu',
                meta: {
                    title: 'Spu',
                    icon: 'SetUp',
                    hidden: false,
                },
            },
            {
                path: '/product/sku',
                component: () => import('@/views/product/sku/index.vue'),
                name: 'Sku',
                meta: {
                    title: 'Sku',
                    icon: 'ScaleToOriginal',
                    hidden: false,
                },
            },
        ],
    },
    {
        path: '/404',
        component: () => import("@/views/404/index.vue"),
        name: "404",
        meta: {
            title: "404",
            hidden: true
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: "Any",
        meta: {
            title: "任意路由",
            hidden: true
        }

    }
]
