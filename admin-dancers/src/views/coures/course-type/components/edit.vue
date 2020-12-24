<template>
  <el-form ref="editForm" class="search-form" :model="editForm" label-width="200px">
    <el-form-item label="类型名称">
      <el-input v-model="editForm.name" placeholder="请输入类型名称" size="mini" clearable />
    </el-form-item>
    <el-form-item label="排序值">
      <el-input v-model="editForm.orderNu" placeholder="请输入排序值" type="orderNu" size="mini" clearable />
      <span>
        <el-alert
          title="此处数值越大排名越靠前"
          type="error"
        />
      </span>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" :loading="isLoading" @click="handleSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    editForm: {
      type: Object,
      default: function() {
        return {}
      }
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      courseImg: ''
    }
  },
  computed: {},
  created() {
  },
  mounted() {
  },
  methods: {
    handleSubmit() {
      this.$emit('handleIsLoading')
      this.$emit('sumbmitForm', this.editForm)
    }
  }
}
</script>

<style scoped lang="scss">
// .el-form {
//   .el-form-item {
//     margin-bottom: 10px;
//   }
// }
</style>
