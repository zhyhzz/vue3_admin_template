<template>
    <el-button  size="small" icon="Refresh" circle @click="updateRefresh"></el-button>
    <el-button  size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
    <el-button  size="small" icon="Setting" circle></el-button>
    <img :src="userStore.avatar" alt="" style="width: 24px; height: 24px; margin: 0px 10px;"/>
    <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item  @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
</template>

<script lang="ts" setup>
import {useRouter, useRoute} from "vue-router";
//获取用户的小仓库
import userUserStore from "@/store/modules/user";
//获取骨架的小仓库
import useLayOutSettingStore from "@/store/modules/setting"
let layOutSettingStore = useLayOutSettingStore();

let userStore = userUserStore();

//获取路由器对象
let $router = useRouter();
//获取路由对象
let $route = useRoute();
//刷新按钮点击回调
const updateRefresh = ()=> {
  layOutSettingStore.refresh = !layOutSettingStore.refresh;
}

const fullScreen = () => {
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

//退出登录点击回调
const logout = ()=> {
  //1.向服务器发起请求【退出登录接口】
  //2.仓库当中关于用于相关的数据清空[token|username|avatar]
  //3.跳转到登录页面
  userStore.userLogout();
  $router.push({path: "/login", query: {redirect: $route.path}});
}
</script>
<script lang="ts">
export default {
    name: "Setting"
}
</script>