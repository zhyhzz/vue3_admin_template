<script setup lang="ts">
//获取父组件传递过来的全部路由数组
defineProps(["menuList"]);

//获取路由器对象
import {useRouter} from "vue-router"
let $router = useRouter();
const goRoute = (vs: any) => {
  //路由跳转
  console.log(vs);
  $router.push(vs.index);
}
</script>

<script lang="ts">
export default {
  name: "Menu",
};
</script>
<template>
  <!-- {{menuList }} -->
  <template v-for="(item, index) in menuList" :key="item.path">
    <template v-if="!item.children">
      <el-menu-item  v-if="!item.meta.hidden" :index="item.path" @click="goRoute">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item
        v-if="!item.children[0].meta.hidden"
        :index="item.children[0].path"
        @click="goRoute"
      >
        <template #title>
          <el-icon>
            <component :is="item.children[0].meta.icon"></component>
          </el-icon>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
</template>
  <el-sub-menu
    v-if="item.children && item.children.length > 1"
    :index="item.path"
    @click="goRoute"
  >
    <template #title>
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </template>
    <Menu :menuList="item.children"></Menu>
  </el-sub-menu>
  </template>
</template>