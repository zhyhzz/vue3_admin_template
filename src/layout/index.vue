<script lang="ts" setup>
//引入左侧菜单logo子组件
import Logo from "./logo/index.vue"
import Menu from "./menu/index.vue"

//获取用户相关的小仓库
import userUsersStore from "@/store/modules/user";
let userStore = userUsersStore();
</script>

<template>
    <div class="layout_container">
        <div class="layout_slider">
            <Logo></Logo>
            <el-scrollbar class="scrollbar">
                <!-- 菜单组件 -->
                <el-menu background-color="#001529" text-color="white"> 
                    <!-- 根据路由动态生成菜单 -->
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <div class="layout_tabbar">546</div>
        <div class="layout_main">
            <router-view></router-view>
        </div>
    </div>
</template>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;
    .layout_slider {
        width: $base-menu-width;
        height: 100vh;
        background: $base-menu-background;

        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height );
        }
    }

    .layout_tabbar {
        position: fixed;
        top: 0;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        background: cyan;
    }
    .layout_main {
        position: absolute;
        left: $base-menu-width;
        top: $base-tabbar-height;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        background-color: yellowgreen;
        overflow: auto;
    }
}
</style>