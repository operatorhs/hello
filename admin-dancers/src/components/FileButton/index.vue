<template>
  <div>
    <div class="upload">
      <input ref="file" class="file" type="file" @change="photopUpload">
      <el-button class="btn" type="primary" size="mini" :loading="isLoading">点击上传</el-button>
    </div>
  </div>
</template>

<script>
import { reqUpload } from '@/api/constants'
export default {
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    photopUpload() {
      this.isLoading = true
      const file = this.$refs.file.files[0]
      const formData = new FormData()
      formData.append('file', file)
      reqUpload(formData).then(res => {
        this.isLoading = false
        this.$emit('fileURL', res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.upload {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 28px;
  .file {
    position: absolute;
    width: 90px;
    height: 36px;
    opacity: 0;
  }
}
</style>
