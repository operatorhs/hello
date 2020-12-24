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
    <el-form-item label="课程名称">
      <el-input v-model="editForm.courseName" placeholder="请输入课程名称" size="mini" clearable />
    </el-form-item>
    <el-form-item label="录制日期">
      <el-date-picker v-model="editForm.videoTime" type="date" size="mini" placeholder="请选择录制日期" style="width: 100%;" />
    </el-form-item>
    <el-form-item label="录制说明（过程说明）">
      <el-input v-model="editForm.videoExplain" type="textarea" placeholder="请输入录制说明" size="mini" clearable />
    </el-form-item>
    <el-form-item label="讲师">
      <el-select v-model="editForm.courseLecturerID" size="mini" placeholder="请选择课程类型" clearable>
        <el-option
          v-for="item in lecturerLists"
          :key="item.courseLecturerID"
          :label="item.name"
          :value="item.courseLecturerID"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="课程类型">
      <el-select v-model="editForm.courseTypeID" size="mini" placeholder="请选择课程类型" clearable>
        <el-option
          v-for="item in courseTypeList"
          :key="item.courseTypeID"
          :label="item.name"
          :value="item.courseTypeID"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="课程图片">
      <fileButton @fileURL="getCoursePic" />
      <div v-show="imagePath" class="img3-2">
        <img :src="imagePath" :alt="PROJECT_TITLE" @click="proviewHanlde(imagePath)">
      </div>
    </el-form-item>
    <el-form-item label="课程说明">
      <el-input v-model="editForm.courseDescribe" type="textarea" placeholder="请输入课程名称" size="mini" clearable />
    </el-form-item>
    <el-form-item label="总时长">
      <el-input v-model="editForm.courseDuration" placeholder="请输入数字（单位秒）" type="number" size="mini" clearable />
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
