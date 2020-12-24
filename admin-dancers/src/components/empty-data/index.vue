<template>
  <div class="d-f-d-cloumn empty-container">
    <img src="@/assets/not-data.png" :alt="PROJECT_TITLE">
    <p class="text">{{ textEmpty }}</p>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    textEmpty: {
      type: String,
      default: '数据正在筹备中...'
    }
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      PROJECT_TITLE: state => state.constants.PROJECT_TITLE
    })
  }
}
</script>

<style scoped lang="scss">
.empty-container {
  max-width: 1000px;
}
.text {
  color: #888;
  font-size: 14px;
}
</style>
