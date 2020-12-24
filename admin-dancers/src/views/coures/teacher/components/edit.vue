<template>
  <el-form ref="editForm" class="search-form" :model="editForm" label-width="200px">
    <!-- <el-form-item label="活动名称">
      <el-input v-model="editForm.name" size="mini" clearable />
    </el-form-item>
    <el-form-item label="活动区域">
      <el-select v-model="editForm.region" size="mini" placeholder="请选择活动区域" clearable>
        <el-option label="区域一" value="shanghai" />
        <el-option label="区域二" value="beijing" />
      </el-select>
    </el-form-item> -->
    <el-form-item label="课程bannner">
      <fileButton @fileURL="getBannerPic" />
      <div v-show="topBanner" class="img192-50">
        <img :src="topBanner" :alt="PROJECT_TITLE" @click="proviewHanlde(topBanner)">
      </div>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="editForm.name" placeholder="请输入姓名" size="mini" clearable />
    </el-form-item>
    <el-form-item label="公司">
      <el-input v-model="editForm.company" placeholder="请输入公司名称" size="mini" clearable />
    </el-form-item>
    <el-form-item label="职务">
      <el-input v-model="editForm.post" placeholder="请输入职务" size="mini" clearable />
    </el-form-item>
    <el-form-item label="简介">
      <el-input v-model="editForm.introduction" type="textarea" size="mini" placeholder="请输入简介" clearable />
    </el-form-item>
    <el-form-item label="照片">
      <fileButton @fileURL="getCoursePic" />
      <div v-show="imagePath" class="img3-2">
        <img :src="imagePath" :alt="PROJECT_TITLE" @click="proviewHanlde(imagePath)">
      </div>
    </el-form-item>
    <el-form-item label="状态">
      <el-input v-model="editForm.status" size="mini" clearable />
    </el-form-item>
    <el-form-item v-show="isEdit" label="生成时间">
      <span>{{ editForm.createTime | filterDate }}</span>
    </el-form-item>
    <el-form-item v-show="isEdit" label="修改时间">
      <span>{{ editForm.updateTime | filterDate }}</span>
    </el-form-item>
    <el-form-item label="modifyInfo">
      <el-input v-model="editForm.modifyInfo" size="mini" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" :loading="isLoading" @click="handleSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { mapState } from 'vuex'
import fileButton from '@/components/FileButton'
export default {
  components: {
    fileButton
  },
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
  computed: {
    ...mapState({
      PROJECT_TITLE: state => state.constants.PROJECT_TITLE
    }),
    imagePath() {
      return !this.editForm.imagePath ? null : process.env.VUE_APP_BASE_API + this.editForm.imagePath
    },
    topBanner() {
      return !this.editForm.topBanner ? null : process.env.VUE_APP_BASE_API + this.editForm.topBanner
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handleSubmit() {
      this.$emit('handleIsLoading')
      this.$emit('sumbmitForm', this.editForm)
    },
    getCoursePic(res) {
      this.$emit('changeEditForm', {
        ...this.editForm,
        imagePath: res[0].url
      })
    },
    getBannerPic(res) {
      this.$emit('changeEditForm', {
        ...this.editForm,
        topBanner: res[0].url
      })
    },
    proviewHanlde(url) {
      open(url)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
