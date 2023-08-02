<template>
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <!-- 渲染layout一级路由组件的子路由 -->
            <component :is="Component"></component>
        </transition>
    </router-view>
</template>

<style scoped>
.fade-enter-from {
    opacity: 0;
}
.fade-enter-active {

}
.fade-enter-to {
    opacity: 1;
}
</style>

<script lang="ts" setup>
import {watch, ref, nextTick} from "vue";
import useLayOutSettingStore from "@/store/modules/setting"
let layOutSettingStore = useLayOutSettingStore();

//控制当前组件是否摧毁重建
let flag = ref(true);

//监听仓库内部数据是否发生变化，如果发生变化，说明用户点击过刷新按钮
watch(
    () => layOutSettingStore.refresh,
    () => {
        flag.value = false;
        nextTick(()=> {
            flag.value = true;
        })
});
</script>