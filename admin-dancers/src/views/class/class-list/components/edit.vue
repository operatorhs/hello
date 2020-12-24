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
    <el-form-item label="班级名称">
      <el-input v-model="editForm.name" placeholder="请输入班级名称" size="mini" clearable />
    </el-form-item>
    <el-form-item label="开班时间">
      <el-date-picker v-model="editForm.openingTime" type="date" size="mini" placeholder="请选择开班时间" style="width: 174px;" />
    </el-form-item>
    <el-form-item label="结课时间">
      <el-date-picker v-model="editForm.closingTime" type="date" size="mini" placeholder="请选择结束时间" style="width: 174px;" />
    </el-form-item>
    <el-form-item label="省份">
      <el-select v-model="editForm.province" size="mini" placeholder="请选择省份" clearable @change="changProvince">
        <el-option
          v-for="item in provinces"
          :key="item.RegionalID"
          :label="item.Name"
          :value="item.RegionalID"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="城市">
      <el-select v-model="editForm.city" size="mini" placeholder="请选择城市" clearable @change="changCity">
        <el-option
          v-for="item in citys"
          :key="item.RegionalID"
          :label="item.Name"
          :value="item.RegionalID"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="县">
      <el-select v-model="editForm.county" size="mini" placeholder="请选择县" clearable>
        <el-option
          v-for="item in county"
          :key="item.RegionalID"
          :label="item.Name"
          :value="item.RegionalID"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="地址">
      <el-input v-model="editForm.address" placeholder="请输入录制说明" size="mini" clearable />
    </el-form-item>
    <el-form-item label="班级简介">
      <el-input v-model="editForm.introduce" type="textarea" placeholder="请输入录制说明" size="mini" clearable />
    </el-form-item>
    <!-- <el-form-item label="讲师">
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
    </el-form-item> -->
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
    county: {
      type: Array,
      default: function() {
        return []
      }
    },
    provinces: {
      type: Array,
      default: function() {
        return []
      }
    },
    citys: {
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
    changProvince(e) {
      console.log(e)
      this.$emit('changProvince', e)
    },
    changCity(e) {
      this.$emit('changCity', e)
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
