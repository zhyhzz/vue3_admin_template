//进行axios二次封装：使用请求与响应拦截器
import axios from "axios";
import {ElMessage} from "element-plus"

//引入用户相关的仓库
import userUsersStore from "@/store/modules/user";
//第一步 利用Axios对象的create方法，去创建axios实例
let request = axios.create({
    //基础路径
    baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径上会携带/api
    timeout: 5000 // 超时设置
})

//第二步 request实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
    //获取用户相关的小仓库：获取仓库内部token，登录成功过后携带给服务器
    let userStore = userUsersStore();
    console.log(userStore)
    if(userStore.token) {
      config.headers.token = userStore.token;
    }
    //config配置对象，headers属性请求头，经常给服务器端携带公共参数
    //返回配置对象
    return config;
});

//第三步 响应拦截器
request.interceptors.response.use((response) => {
    return response.data;
},
    (error) => {
        let message = "";
        let status = error.response.status;
        switch (status) {
            // 401: 未登录
            // 未登录则跳转登录页面，并携带当前页面的路径
            // 在登录成功后返回当前页面，这一步需要在登录页操作。
            case 401:
              message = '未登录'
              break
            // 403 token过期
            // 登录过期对用户进行提示
            // 清除本地token和清空vuex中token对象
            // 跳转登录页面
            case 403:
              message = '登录过期，请重新登录'
              break
            case 404:
              message = '网络请求不存在'
              break
            case 500:
              message = '服务器出现问题'
              break
            default:
              message = error.response.data.message
              break
          }
          ElMessage({
            type: 'error',
            message,
          })

          return Promise.reject(error);
    });

export default request;