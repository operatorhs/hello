<template>
  <div>
    <slot name="content" />
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :limit="limit"
      :current-page="page"
      @current-change="currentChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      default: 10
    },
    page: {
      type: Number,
      default: 1
    }
  },
  methods: {
    currentChange(p) {
      this.$emit('currentChange', p)
    }
  }
}
</script>

<style>
