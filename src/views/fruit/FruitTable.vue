<template>
  <div>
    <el-table ref="table" :data="tableData" stripe>
      <el-table-column align="center" prop="id" label="水果Id"/>
      <el-table-column width="100px" align="center" prop="fruitImgUrl" label="图片">
        <template slot-scope="props">
          <img :src="props.row.fruitImgUrl" class="fruit-img">
        </template>
      </el-table-column>
      <el-table-column align="center" prop="fruitTitle" label="标题"/>
      <el-table-column align="center" prop="originalPrice" label="原价"/>
      <el-table-column align="center" prop="price" label="现价"/>
      <el-table-column align="center" prop="unit" label="单位"/>
      <el-table-column align="center" prop="summary" label="简介"/>
      <el-table-column align="center" prop="sellPoint" label="卖点"/>
      <el-table-column align="center" prop="startAll" label="评级等级"/>
      <el-table-column align="center" prop="buyerCount" label="已经购买人数"/>
      <el-table-column align="center" prop="num" label="库存"/>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="toogleExpandHandle(scope)">编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column width="1" type="expand">
        <template slot-scope="props">
          <el-form label-position="right" inline class="table-expand">
            <el-form-item label="图片Url：" label-width="100px">
              <EditedInput v-model="props.row.fruitImgUrl" style="width:400px">
                <el-button size="mini" @click="uploadImgHandle">选择本地图片</el-button>
              </EditedInput>
              <input
                id="imgUpload"
                ref="imgUpload"
                type="file"
                style="display:none"
                accept="image/*"
                @change="inputChangeHandle"
              >
            </el-form-item>
            <el-form-item label="标题：" label-width="100px">
              <EditedInput v-model="props.row.fruitTitle" style="width:400px"/>
            </el-form-item>
            <el-form-item label="原价：" label-width="100px">
              <EditedInput v-model="props.row.originalPrice" style="width:400px"/>
            </el-form-item>
            <el-form-item label="现价：" label-width="100px">
              <EditedInput v-model="props.row.price" style="width:400px"/>
            </el-form-item>
            <el-form-item label="单位：" label-width="100px">
              <EditedInput v-model="props.row.unit" style="width:400px"/>
            </el-form-item>
            <el-form-item label="简介：" label-width="100px">
              <EditedInput v-model="props.row.summary" style="width:400px"/>
            </el-form-item>
            <el-form-item label="卖点：" label-width="100px">
              <EditedInput v-model="props.row.sellPoint" style="width:400px"/>
            </el-form-item>
            <el-form-item label="评级等级：" label-width="100px">
              <EditedInput v-model="props.row.sellPoint" style="width:400px"/>
            </el-form-item>
            <el-form-item label="已购买人数：" label-width="100px">
              <EditedInput v-model="props.row.buyerCount" style="width:400px"/>
            </el-form-item>
            <el-form-item label="库存：" label-width="100px">
              <EditedInput v-model="props.row.num" style="width:400px"/>
            </el-form-item>
          </el-form>
          <div class="clearfix">
            <el-button
              type="danger"
              class="fl"
              @click="showEditeDetailedDialogHandle(props)"
            >编辑（预览）水果详情展示</el-button>
            <el-button class="fr" type="success" @click="submitFormHandle(props.row)">提交修改</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-if="showEditeDetailedDialog"
      :fullscreen="true"
      :visible.sync="showEditeDetailedDialog"
      title="编辑商品详情"
      width="100%"
    >
      <EditeFruitDetail :content="currentExpandRow.discrib" @change="detailChangeHandel"/>
    </el-dialog>
  </div>
</template>
<style scoped>
.main {
  padding: 20px;
}
.fruit-img {
  width: 50px;
  height: 50px;
}
.table-expand {
  font-size: 0;
}
.table-expand label {
  color: #99a9bf;
  width: 200px !important;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
<script>
import { updateFruit, uploadImg } from '@/api/fruit'
import EditedInput from './EditedInput'
import EditeFruitDetail from './EditeFruitDetail'
export default {
  components: {
    EditedInput,
    EditeFruitDetail
  },
  props: {
    fruits: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      tableData: [],
      detail: '',
      showEditeDetailedDialog: false,
      rowStatus: {
        isExpand: false,
        id: -1
      },
      currentExpandRow: {}
    }
  },
  watch: {
    fruits(newVal) {
      this.tableData = newVal
    }
  },
  mounted() {},
  methods: {
    uploadImgHandle() {
      this.$refs['imgUpload'].click()
    },
    inputChangeHandle() {
      const file = this.$refs['imgUpload'].files[0]
      if (file) {
        const f = new FormData()
        f.append('img', file)
        uploadImg(f).then(({ data }) => {
          if (data.success) {
            this.currentExpandRow.fruitImgUrl = data.url
            this.$refs['imgUpload'].value = ''
          }
        })
      }
    },
    showEditeDetailedDialogHandle(prop) {
      this.showEditeDetailedDialog = true
    },
    submitFormHandle(row) {
      updateFruit({
        values: {
          ...row
        },
        id: row.id
      }).then(({ data }) => {
        if (data.success) {
          this.$notify({
            message: data.msg
          })
        }
      })
    },
    detailChangeHandel(val) {
      this.currentExpandRow.discrib = val
    },
    toogleExpandHandle({ row, $index }) {
      this.currentExpandRow = row
      const table = this.$refs['table']
      if (this.rowStatus.id == row.id) {
        this.rowStatus.isExpand = !this.rowStatus.isExpand
        table.toggleRowExpansion(row, this.rowStatus.isExpand)
      } else {
        this.tableData.forEach(item => {
          if (item.id != row.id) {
            table.toggleRowExpansion(item, false)
          }
        })
        table.toggleRowExpansion(row, true)
        this.rowStatus = {
          id: row.id,
          isExpand: true
        }
      }
    }
  }
}
</script>
