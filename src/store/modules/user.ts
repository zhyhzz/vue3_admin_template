//创建用户相关的小仓库
import {defineStore} from "pinia";

import {reqLogin, reqUserInfo} from "@/api/user"

//引入数据类型
import type {loginForm, LoginResponseData} from "@/api/user/type"
import type {UserState} from "./types/type"

//引入操作本地存储的工具方法
import  {SET_TOKEN, GET_TOKEN, REMOVE_TOKEN} from "@/utils/token"

//引入路由（常量路由）
import {constantRoute} from "@/router/routes"
//创建用户小仓库
let userUsersStore = defineStore('User', {
    //小仓库存储数据地方
    state: ():UserState => {
        return {
            // token: localStorage.getItem("TOKEN") //用户唯一标识token
            token: GET_TOKEN(), //用户唯一标识token
            menuRoutes: constantRoute, //仓库存储生成菜单需要数组（路由）
            username: "",
            avatar: ""
        }
    },
    //异步|逻辑的地方放
    actions: {
        //用户登录的方法
        async userLogin(data: loginForm) {
            let result:LoginResponseData = await reqLogin(data);
            console.log(result);
            //登录请求：成功200->token
            //登录请求：失败201->登录失败错误的信息
            if(result.code == 200) {
                //pinia仓库存储一个token
                //由于pinia|vuex存储数据其实利用js对象
                this.token = (result.data.token as string);
                //本地存储持久化存储一份
                // localStorage.setItem("TOKEN", (result.data.token as string));
                SET_TOKEN((result.data.token as string));
                //能保证当前async函数返回一个成功的promise
                return "ok";
            } else {
                return Promise.reject(new Error(result.data.message));
            }
        },
        //获取用户的信息
        async userInfo() {
            let result = await reqUserInfo();
            if(result.code == 200) {
                this.username = result.data.checkUser.username;
            } else {

            }
        },
        userLogout() {
            this.token = "";
            this.username = "";
            this.avatar = "";
            REMOVE_TOKEN();
        }
    },
    getters: {}
})

//对外暴露获取小仓库方法
export default userUsersStore;