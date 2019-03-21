<template>
  <div class="main">
    <EditeBar @add="addHandle"/>
    <FruitTable ref="table" :fruits="fruits"/>
    <el-dialog
      v-if="showAddFruitDialog"
      :visible.sync="showAddFruitDialog"
      top="50px"
      width="800px"
      title="添加水果"
    >
      <AddFruit/>
    </el-dialog>
  </div>
</template>
<style scoped>
.main {
  padding: 20px;
}
</style>
<script>
import { fetchFruitDetails } from '@/api/fruit'
import EditeBar from './Bar'
import FruitTable from './FruitTable'
import AddFruit from './AddFruit'
export default {
  components: {
    EditeBar,
    FruitTable,
    AddFruit
  },
  data() {
    return {
      fruits: [],
      showAddFruitDialog: false
    }
  },
  mounted() {
    fetchFruitDetails({ limit: 20, offset: 0 }).then(({ data }) => {
      if (data.success) {
        this.fruits = data.fruits
      }
    })
  },
  methods: {
    addHandle() {
      this.showAddFruitDialog = true
    }
  }
}
</script>
