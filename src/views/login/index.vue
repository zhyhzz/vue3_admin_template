<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
import {useRouter} from "vue-router";
import {ElNotification} from "element-plus"
//引入用户相关的小仓库
import userUsersStore from "@/store/modules/user"
let userStore = userUsersStore();
//获取路由器
let $router = useRouter();
//定义变量控制按钮加载效果
let loading = ref(false);
let loginForm = reactive({ username: "admin", password: "111111" });

const login = async ()=> {
    loading.value = true;
    try {
        await userStore.userLogin(loginForm);
        //编程式导航数据跳转到展示数据首页
        $router.push('/');
        ElNotification({
          type: 'success',
          message: '欢迎回来',
          title: "hi,下午好"
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

//封装一个函数：获取一个时间段返回结果
const getTime = ()=> { 
  let message = "";
  // 通过内置构造函数Date
  let hours = new Date().getHours();
  if(hours <= 9) {
    message = "早上";
  } else if(hours <= 12) {
    message = "上午";
  } else if(hours <= 18) {
    message = "下午";
  } else {
    message = "晚上";
  }
};
getTime();
</script>

<template>
  <div class="login_container">
    <el-row class="login_form">
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form>
          <h1>Hello</h1>
          <h2>world</h2>
          <el-form-item>
            <el-input
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item>
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