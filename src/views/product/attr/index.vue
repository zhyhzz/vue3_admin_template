<template>
    <div>
        <Category></Category>
        <el-card>
            <el-button type="primary" size="default" icon="Plus">添加属性</el-button>
            <el-table>
                <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                <el-table-column label="属性名称" align="center" width="120px"></el-table-column>
                <el-table-column label="属性值名称" align="center" ></el-table-column>
                <el-table-column label="操作" align="center" width="120px"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>