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
    <!-- <el-form-item label="课程bannner">
      <fileButton @fileURL="getBannerPic" />
      <div v-show="topBanner" class="img192-50">
        <img :src="topBanner" :alt="PROJECT_TITLE" @click="proviewHanlde(topBanner)">
      </div>
    </el-form-item> -->
    <el-form-item label="等级名称">
      <el-input v-model="editForm.name" placeholder="请输入课程名称" size="mini" clearable />
    </el-form-item>
    <el-form-item label="排序值">
      <el-input v-model="editForm.sortNu" placeholder="请输入课程名称" size="mini" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" :loading="isLoading" @click="handleSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { mapState } from 'vuex'
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
    courseTypeList: {
      type: Array,
      default: function() {
        return []
      }
    },
    lecturerLists: {
      type: Array,
      default: function() {
        return []
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
