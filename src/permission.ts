import router from "@/router";
import nprogress from 'nprogress';

import setting from './setting';

//引入进度条样式
import "nprogress/nprogress.css";
//获取用户相关的小仓库内部token数据，去判断用户是否登录成功
import userUsersStore from "./store/modules/user";
import pinia from "./store";

let userStore = userUsersStore(pinia);

//全局守卫：项目当中任意路由切换都会触发的钩子
//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any)=> {

    document.title = to.meta.title + ` | ${setting.title}`;

    //to:将要访问的路由
    //from : 从哪个路由来
    //next : 路由的放行函数
    nprogress.start();
    //获取token, 去判断用户登录， 还是未登录
    let token = userStore.token;
    //获取用户名字
    let username = userStore.username;
    if(token) {

    } else {
        //用户未登录判断
        if(to.path == '/login') {
            next();
        } else {
            // next({path: '/login', query: {redirect: to.path}});
            //登录成功访问其余六个路由（登录排除）
            if(username) {
                //放行
                next();
            } else {
                //如果没有用户信息，在守卫这里发请求获取到了用户信息再放行
                try {
                    await userStore.userInfo();
                } catch(error) {
                    //token过期
                    //用户手动修改本地存储token
                    //退出登录->用户相关的数据清空
                    await userStore.userLogout();
                    next({path: '/login', query: {redirect: to.path}});
                }
            }
        }
    }
    next();
}) 
//全局后置守卫
router.afterEach((to: any, from: any) => {
    nprogress.done();
})

//全部路由组件：登录|404|任意路由|首页|数据大屏|权限管理|商品管理