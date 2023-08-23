<template>
  <div>
    <el-card class="box-card">
      <el-button type="primary" size="default" icon="Plus" @click="addTrademark"
        >添加品牌</el-button
      >
      <!-- 表格组件：用于展示已有的平台数据 -->
      <el-table style="margin: 10px 0px" :data="trademarkArr">
        <el-table-column
          label="序号"
          width="80px"
          align="center"
          type="index"
        ></el-table-column>
        <!-- table-column:默认展示数据用div -->
        <el-table-column label="品牌名称">
          <template #="{ row, $index }">
            <pre>{{ row.tmName }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="品牌logo">
          <template #="{ row, $index }">
            <img src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateTrademark"
            ></el-button>
            <el-popconfirm :title="`ru sure to delete${row.tmName}`">
              <template #reference>
                <el-button type="primary" size="small" icon="Delete" @confirm="removeTradeMark(row.id)"></el-button>    
              </template>
            </el-popconfirm>
            
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        :page-count="9"
        layout="prev, pager, next, jumper, ->,  sizes, total"
        :total="total"
        @current-change="getHasTrademark"
        @size-change="sizeChange"
      />
    </el-card>
    <el-dialog
      v-model="dialogFromVisible"
      :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
    >
      <el-form
        style="width: 80%"
        :model="trademarkParams"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input
            placeholder="请您输入品牌名称"
            v-model="trademarkParams.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌logo" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>

      <!-- 具名插槽:footer -->
      <template #footer>
        <el-button type="primary" size="default" @click="cancel"
          >取消</el-button
        >
        <el-button type="primary" size="default" @click="confirm"
          >确定</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, nextTick } from "vue";
import {
  reqAddorUpdateTrademark,
  reqHasTrademark,
  reqDeleteTrademark
} from "@/api/product/trademark";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";
import { ElMessage } from "element-plus";
const imageUrl = ref("");

import type {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from "@/api/product/trademark/type";
//当前页码
let pageNo = ref<number>(1);
//每一页展示多少条数据
let limit = ref<number>(3);
//存储总数
let total = ref<number>(0);
//存储已有品牌的数据
let trademarkArr = ref<Records>([]);
let dialogFromVisible = ref<boolean>(false);

let trademarkParams = reactive<TradeMark>({
  tmName: "",
  logoUrl: "",
});

let formRef = ref();
//上传图片组件->上传图片之前触发的钩子函数
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  trademarkParams.logoUrl = URL.createObjectURL(uploadFile.raw!);
  formRef.value.clearValidate("logoUrl");
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};

//获取已有品牌的接口封装成一个函数:在任何情况下向获取数据，调用此函数即可
const getHasTrademark = async (pager = 1) => {
  pageNo.value = pager;
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value
  );
  if (result.code == 200) {
    total.value = result.data.total;
    trademarkArr.value = result.data.records;
  }
  console.log(result);
};

const removeTradeMark = async(id: number) => {
  let result = await reqDeleteTrademark(id);
  if(result.code == 200) {
    ElMessage( {
      type: 'success',
      message: "删除品牌成功"
    })

    //再次获取已有的品牌数据
    getHasTrademark(
      trademarkArr.value.length > 1? pageNo.value : pageNo.value - 1
    ) 
  } else {
    ElMessage({
      type: "error",
      message: "删除品牌失败"
    })
  }
}

const sizeChange = () => {
  getHasTrademark();
};

const addTrademark = () => {
  dialogFromVisible.value = true;
  trademarkParams.id = 0;
  trademarkParams.tmName = "";
  trademarkParams.logoUrl = "";
  nextTick(() => {
    formRef.value.clearValidate("tmName");
    formRef.value.clearValidate("logoUrl");
  });
};

const cancel = () => {
  dialogFromVisible.value = false;
  //清空收集数据
  trademarkParams.tmName = "";
  trademarkParams.logoUrl = "";
};

const confirm = async () => {
  await formRef.value.validate();
  let result: any = await reqAddorUpdateTrademark(trademarkParams);
  //添加品牌成功
  if (result.code == 200) {
    dialogFromVisible.value = false;
    //弹出提示信息
    ElMessage({
      type: "success",
      massage: trademarkParams.id ? "修改品牌成功" : "添加品牌成功",
    });
    //再次发请求获取已有全部
    getHasTrademark(trademarkParams.id ? pageNo.value : 1);
  } else {
    ElMessage({
      type: "error",
      massage: trademarkParams.id ? "修改品牌失败" : "添加品牌失败",
    });
  }
};
const updateTrademark = (row: TradeMark) => {
  console.log(row);
  //对话框显示
  dialogFromVisible.value = true;

  //ES6语法合并对象
  Object.assign(trademarkParams, row);
  reqAddorUpdateTrademark(trademarkParams);
  nextTick(() => {
    formRef.value.clearValidate("tmName");
    formRef.value.clearValidate("logoUrl");
  });
};
//组件挂载完毕钩子————发一次请求
onMounted(() => {
  getHasTrademark();
});
//分页器当前页码发生变化的时候会触发
//品牌自定义校验规则方法
const validatorTmName = (rule: any, value: any, callBack: any) => {
  //是当表单元素触发blur时候，会触发此方法
  if (value.trim().length >= 2) {
    callBack();
  } else {
    callBack(new Error("品牌名称位数大于等于两位"));
  }
};

const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  if (value) {
    callBack();
  } else {
    callBack(new Error("logo url不存在"));
  }
};
//表单校验规则对象
const rules = {
  tmName: [
    //required:这个字段务必校验
    //trigger:代表触发校验规则时机
    { required: true, trigger: "blur", validator: validatorTmName },
  ],
  logoUrl: [{ required: true, trigger: "blur", validator: validatorLogoUrl }],
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>