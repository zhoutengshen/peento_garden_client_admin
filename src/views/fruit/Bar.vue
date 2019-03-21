<template>
  <div class="clearfix">
    <el-row class="fl">
      <el-button type="success" @click="addhandle">添加水果</el-button>
    </el-row>
    <el-row class="fr">
      <el-form :inline="true">
        <el-form-item>
          <el-input placeholder="输入要搜索的水果Id"/>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="输入要搜索的水果标题"/>
        </el-form-item>
        <el-form-item>
          <el-button type="success">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>
<style scoped>
</style>
<script>
export default {
  data() {
    return {
      formData: {
        fruitTitle: '山东黄元帅苹果 5斤装',
        id: 1
      }
    }
  },
  mounted() {},
  methods: {
    addhandle() {
      this.$emit('add')
    }
  }
}
</script>
