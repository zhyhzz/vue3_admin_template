<template>
    <el-card class="box-card">
        <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
        <!-- 表格组件：用于展示已有的平台数据 -->
        <el-table style="margin: 10px 0px">
            <el-table-column label="序号"></el-table-column>
            <el-table-column label="品牌名称"></el-table-column>
            <el-table-column label="品牌logo"></el-table-column>
            <el-table-column label="品牌操作"></el-table-column>
        </el-table>
        <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      layout="prev, pager, next, jumper, ->,  sizes, total"
      :total="400"
    />
    </el-card>
</template>

<script lang="ts" setup>
import {ref, onMounted, reactive, nextTick} from "vue";
import {reqHasTrademark} from "@/api/product/trademark";
//当前页码
let pageNo = ref<number>(1);
//每一页展示多少条数据
let limit = ref<number>(3);
</script>

<style scoped></style>