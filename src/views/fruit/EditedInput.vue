<template>
  <div class="edtite-input" @dblclick="edite=true">
    <div v-if="edite">
      <slot/>
      <el-input :value="data" class="hover-underline-animation" size="mini" @change="changeHandel">
        <el-button
          slot="suffix"
          type="success"
          circle
          size="mini"
          class="el-icon-check check"
          @click="edite=false"
        />
      </el-input>
    </div>
    <el-tooltip v-else content="双击编辑" placement="top">
      <span class="title">{{ data }}</span>
    </el-tooltip>
  </div>
</template>
<script>
export default {
  model: {
    prop: 'data',
    event: 'change'
  },
  props: {
    data: {
      required: true
    }
  },
  data() {
    return {
      edite: false
    }
  },
  methods: {
    changeHandel(val) {
      this.$emit('change', val)
    }
  }
}
</script>
<style scoped>
.check {
  cursor: pointer;
}
.title {
  display: inline-block;
  cursor: pointer;
  min-width: 100px;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<style>
.edtite-input .el-input__inner {
  outline: none;
  border: 0;
}
</style>

