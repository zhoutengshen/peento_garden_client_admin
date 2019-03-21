<template>
  <el-form ref="addForm" :model="addFormData" :rules="rules" class="add-form">
    <el-form-item prsp="fruitImgUrl">
      <el-row :gutter="20" type="flex">
        <el-col :span="20">
          <el-input
            :disabled="true"
            v-model="addFormData.fruitImgUrl"
            size="small"
            inline
            placeholder="图片Url"
          />
        </el-col>
        <input ref="uploadImgInput" style="display:none" type="file" @change="inputChnageHandle">
        <el-col :span="4">
          <el-button type="text" size="mini" @click="uploadImgHandle">选择图片</el-button>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item prop="fruitTitle">
      <MDinput v-model="addFormData.fruitTitle" placeholder="输入标题">标题</MDinput>
    </el-form-item>
    <el-form-item prop="summary">
      <MDinput v-model="addFormData.summary" placeholder="输入简介">简介</MDinput>
    </el-form-item>
    <el-form-item prop="sellPoint">
      <MDinput v-model="addFormData.sellPoint" placeholder="输入卖点">卖点</MDinput>
    </el-form-item>
    <el-form-item prop="unit">
      <MDinput v-model="addFormData.unit" placeholder="如,XXX斤装">单位</MDinput>
    </el-form-item>
    <el-form-item prop="originalPrice">
      <MDinput
        v-model.number="addFormData.originalPrice"
        type="number"
        min="0"
        placeholder="输入原价"
      >原价</MDinput>
    </el-form-item>
    <el-form-item prop="price">
      <MDinput v-model.number="addFormData.price" type="number" min="0" placeholder="输入现价">现价</MDinput>
    </el-form-item>
    <el-form-item prop="buyerCount">
      <MDinput
        v-model.number="addFormData.buyerCount"
        type="number"
        min="0"
        placeholder="输入已购买人数"
      >已购买人数</MDinput>
    </el-form-item>
    <el-form-item prop="num">
      <MDinput v-model.number="addFormData.num" type="number" min="0" placeholder="输入库存">库存</MDinput>
    </el-form-item>
    <el-form-item prop="startAll">
      <MDinput
        v-model.number="addFormData.startAll"
        type="number"
        min="0"
        max="10"
        placeholder="输入评级等级"
      >评级等级</MDinput>
    </el-form-item>
    <el-form-item style="padding-top:20px" class="clearfix">
      <el-button class="fr" type="success" @click="resetHandle">重置</el-button>
      <el-button style="margin-right:10px" class="fr" type="success" @click="submitHandle">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<style scoped>
.md-input {
  padding: 0;
  width: 0;
  width: 400px;
}
</style>
<script>
import MDinput from '@/components/MDinput/index'
import { uploadImg, addFruit } from '@/api/fruit'
export default {
  components: {
    MDinput
  },
  data() {
    return {
      addFormData: {
        buyerCount: '',
        discrib: '',
        fruitImgUrl: '',
        fruitTitle: '',
        num: '',
        origin: '',
        originalPrice: '',
        price: '',
        sellPoint: '',
        startAll: '',
        status: '',
        summary: '',
        unit: ''
      },
      rules: {
        fruitImgUrl: {
          required: true,
          type: 'string',
          message: '不能为空'
        },
        num: {
          required: true,
          type: 'number',
          message: '必须为数字'
        },
        originalPrice: {
          required: true,
          type: 'number',
          message: '必须为数字'
        },
        fruitTitle: {
          required: true,
          type: 'string',
          message: '不能为空'
        },
        price: {
          type: 'number',
          required: true,
          message: '必须位数字'
        },
        sellPoint: {
          required: true,
          type: 'string',
          message: '不能为空'
        },
        summary: {
          required: true,
          message: '不能为空',
          type: 'string'
        },
        unit: {
          required: true,
          message: '不能为空',
          type: 'string'
        },
        startAll: {
          required: true,
          message: '必须在0-10之间',
          type: 'number',
          max: 10,
          min: 0
        },
        buyerCount: {
          required: true,
          message: '必须输入整数',
          type: 'number',
          min: 0
        }
      }
    }
  },
  methods: {
    uploadImgHandle() {
      this.$refs['uploadImgInput'].click()
    },
    inputChnageHandle() {
      let file = this.$refs['uploadImgInput'].files[0]
      if (file) {
        const fileData = new FormData()
        fileData.append('img', file)
        uploadImg(fileData).then(({ data }) => {
          file = null
          if (data.success) {
            this.addFormData.fruitImgUrl = data.url
          } else {
            this.$message({
              message: data.msg,
              type: 'error'
            })
          }
        })
      }
    },
    submitHandle() {
      this.$refs['addForm'].validate(r => {
        if (r) {
          addFruit({
            values: {
              ...this.addFormData
            }
          }).then(({ data }) => {
            this.$notify({
              message: data.msg
            })
          })
        }
      })
    },
    resetHandle() {
      this.$refs['addForm'].resetFields()
    }
  }
}
</script>
<style>
.add-form .el-input__inner {
  outline: none;
  border: 0;
}
.add-form .el-form-item {
  margin-bottom: 0px;
}
</style>
