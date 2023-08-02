<template>
    <el-icon style="margin-right: 10px" @click="changeIcon">
      <component :is="layOutSettingStore.fold? 'Fold': 'Expand'"></component>
    </el-icon>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" :to="item.path">
        <!-- 图标 -->
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span  style="margin: 0px 5px">{{ item.meta.title }}</span>
      </el-breadcrumb-item>
      <button @click="handler"></button>
    </el-breadcrumb>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import useLayOutSettingStore from "@/store/modules/setting"
let layOutSettingStore = useLayOutSettingStore();
let fold = ref(false);
import {useRoute} from "vue-router";

let $route = useRoute();
//点击图标的方法
const changeIcon = ()=> {
  layOutSettingStore.fold = !layOutSettingStore.fold;
}
const handler = ()=> {
  console.log($route);
}
</script>
<script lang="ts">
export default {
    name: "BreadCrumb"
}
</script>
<style lang="scss" scoped>

</style>