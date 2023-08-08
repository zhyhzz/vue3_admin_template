<script lang="ts" setup>
//获取路由对象
import {useRoute} from "vue-router"
//引入左侧菜单logo子组件
import Logo from "./logo/index.vue"
import Menu from "./menu/index.vue"
import Main from "./main/index.vue"
import Tabbar from "./tabbar/index.vue"
//获取用户相关的小仓库
import userUsersStore from "@/store/modules/user";
import useLayOutSettingStore from "@/store/modules/setting"

let userStore = userUsersStore();
let layOutSettingStore = useLayOutSettingStore();

let $route = useRoute();


</script>

<script lang="ts">
export default {
    name: "Layout"
}
</script>
<template>
    <div class="layout_container">
        <div class="layout_slider" :class="{fold: layOutSettingStore.fold? true: false}">
            <Logo></Logo>
            <el-scrollbar class="scrollbar" >
                <!-- 菜单组件 -->
                <el-menu background-color="#001529" text-color="white" :default-active="$route.path" :collapse="layOutSettingStore.fold?true:false"> 
                    <!-- 根据路由动态生成菜单 -->
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <div class="layout_tabbar" :class="{fold: layOutSettingStore.fold? true: false}">
            <Tabbar></Tabbar>
        </div>
        <div class="layout_main" :class="{fold: layOutSettingStore.fold? true: false}">
            <Main></Main>
        </div>
    </div>
</template>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;
    .layout_slider {
        color: white;
        width: $base-menu-width;
        height: 100vh;
        background: $base-menu-background;
     
        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height );
        }
        &.fold {
            width: $base-menu-min-width;
        }
    }

    .layout_tabbar {
        position: fixed;
        top: 0;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        transition: all 0.3s;
        &.fold {
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }
    .layout_main {
        position: absolute;
        left: $base-menu-width;
        top: $base-tabbar-height;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        overflow: auto;
        transition: all 0.3s;
        &.fold {
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }
}
</style>

