<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import {useRouter, useRoute} from "vue-router";
import {ElNotification} from "element-plus";
//引入获取时当前间的函数
import {getTime} from "@/utils/time";

//引入用户相关的小仓库
import userUsersStore from "@/store/modules/user"
let userStore = userUsersStore();
//获取路由器
let $router = useRouter();
//路由对象
let $route = useRoute();
//定义变量控制按钮加载效果
let loading = ref(false);
let loginForm = reactive({ username: "admin", password: "atguigu123" });
//获取el-form组件
let loginForms = ref();

const login = async ()=> {
    //保证全部表单检验通过后再发请求
    // await loginForms.value.validate();
    loading.value = true;
    try {
        await userStore.userLogin(loginForm);
        //编程式导航数据跳转到展示数据首页
        let redirect: any = $route.query.redirect;
        // $router.push('/');
        $router.push({path: redirect || '/'});
        ElNotification({
          type: 'success',
          message: '欢迎回来',
          title: `hi,${getTime()}好`
        });
        //登录成功加载效果也消失
        loading.value = false;
    } catch(error) {
      //登录失败加载效果消息
      loading.value = false;
      ElNotification({
        type: "error",
        message: (error as Error).message
      });
    }
}

//自定义校验规则函数
const validatorUserName = (rule: any, value: any, callback: any)=> {
  //rule:即为校验规则对象
  //value: 即为表单元素文本内容
  if(/^\d{4, 10}$/.test(value)){
    callback();
  } else {
    callback(new Error("账号长度至少五位"));
  }
}

const validatorPassword = (rule: any, value: any, callback: any)=> {
 //rule:即为校验规则对象
  //value: 即为表单元素文本内容
  if(/^\d{5, 10}$/.test(value)){
    callback();
  } else {
    callback(new Error("密码长度至少六位"));
  }
}
//定义表单校验需要配置对象
const rules = {
  username: [
    // {required: true, message: "用户名不能为空", trigger: "blur"},
    // {required: true, min:6, max: 10, message: "账号长度至少六位", trigger: "change"}
    {trigger: "change", validator: validatorUserName}
  ],
  password: [
    // {required: true, min:8, max:20,  message: "密码长度至少为8位", trigger: "change"}
    {trigger: "change", validator: validatorPassword}
  ]
}
</script>

<template>
  <div class="login_container">
    <el-row class="login_form">
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login-form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>Hello</h1>
          <h2>world</h2>
          <el-form-item prop="username">
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item >
            <el-button
              class="login_btn"
              type="primary"
              size="default"
              :loading="loading"
              @click="login"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>


<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background.jpg") no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url("@/assets/images/login_form.png");
    background-size: cover;

    h1 {
      color: white;
      font-size: 40px;
    }
    h2 {
      color: white;
      font-size: 20px;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>