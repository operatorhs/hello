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
    <el-form-item label="姓名">
      <el-input v-model="editForm.name" placeholder="请输入姓名" size="mini" clearable />
    </el-form-item>
    <el-form-item label="性别">
      <el-select v-model="editForm.Gender" size="mini" placeholder="请选择性别" clearable>
        <el-option label="男" value="男" />
        <el-option label="女" value="女" />
        <el-option label="其他" value="其他" />
      </el-select>
    </el-form-item>
    <el-form-item label="出生日期">
      <el-date-picker v-model="editForm.birthday" type="date" size="mini" placeholder="请选择出生日期" style="width: 100%;" />
    </el-form-item>
    <el-form-item label="名族">
      <el-input v-model="editForm.nation" placeholder="请输入名族" size="mini" clearable />
    </el-form-item>
    <el-form-item label="籍贯">
      <el-input v-model="editForm.nativePlace" placeholder="请输入籍贯" size="mini" clearable />
    </el-form-item>
    <el-form-item label="身高">
      <el-input v-model="editForm.height" placeholder="请输入身高" size="mini" clearable />
    </el-form-item>
    <el-form-item label="微信号">
      <el-input v-model="editForm.wechatNumber" placeholder="请输入微信号码" size="mini" clearable />
    </el-form-item>
    <el-form-item label="身份证号">
      <el-input v-model="editForm.naIDCarde" placeholder="请输入省份证号码" size="mini" clearable />
    </el-form-item>
    <el-form-item label="毕业院校、专业">
      <el-input v-model="editForm.graduate" placeholder="请输入专业" size="mini" clearable />
    </el-form-item>
    <el-form-item label="通讯地址">
      <el-input v-model="editForm.address" placeholder="请输入通讯地址" size="mini" clearable />
    </el-form-item>
    <el-form-item label="求学与工作经历">
      <el-input v-model="editForm.experience" placeholder="请输入工作经历" size="mini" clearable />
    </el-form-item>
    <el-form-item label="主要成果">
      <el-input v-model="editForm.achievements" placeholder="请输入主要成果" size="mini" clearable />
    </el-form-item>
    <el-form-item label="照片地址">
      <fileButton @fileURL="getPhotoUrl" />
      <div v-show="photoUrl" class="img3-2">
        <img :src="photoUrl" :alt="PROJECT_TITLE" @click="proviewHanlde(photoUrl)">
      </div>
    </el-form-item>
    <el-form-item label="政治面貌">
      <el-input v-model="editForm.Parties" placeholder="请选择政治面貌" size="mini" clearable />
    </el-form-item>
    <el-form-item label="省份">
      <el-select v-model="editForm.province" size="mini" placeholder="请选择省份" clearable>
        <el-option
          v-for="item in provinceList"
          :key="item.RegionalID"
          :label="item.Name"
          :value="item.Name"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="所在单位">
      <el-input v-model="editForm.workUnit" placeholder="请输入工作单位" size="mini" clearable />
    </el-form-item>
    <el-form-item label="文化程度">
      <el-input v-model="editForm.education" placeholder="请输入最高文化程度" size="mini" clearable />
    </el-form-item>
    <el-form-item label="担任职务">
      <el-input v-model="editForm.post" placeholder="请输入职务" size="mini" clearable />
    </el-form-item>
    <el-form-item label="手机号">
      <el-input v-model="editForm.mobileNu" placeholder="请输入手机号码" size="mini" clearable />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="editForm.email" placeholder="请输入邮箱" size="mini" clearable />
    </el-form-item>
    <el-form-item label="是否新文艺群体">
      <el-input v-model="editForm.newLiteraryGroup" placeholder="请选择" size="mini" clearable />
    </el-form-item>
    <el-form-item label="协会会员资格">
      <el-input v-model="editForm.membership" placeholder="请选择" size="mini" clearable />
    </el-form-item>
    <el-form-item label="专业领域（多选）">
      <el-input v-model="editForm.professionalField" placeholder="请选择专业领域" size="mini" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" :loading="isLoading" @click="handleSubmit">提交</el-button>
    </el-form-item>
    <!-- <el-form-item label="录制说明（过程说明）">
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
      <div v-show="photoUrl" class="img3-2">
        <img :src="photoUrl" :alt="PROJECT_TITLE" @click="proviewHanlde(photoUrl)">
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
    </el-form-item> -->
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
    provinceList: {
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
    photoUrl() {
      return !this.editForm.photoUrl ? null : process.env.VUE_APP_BASE_API + this.editForm.photoUrl
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
    getPhotoUrl(res) {
      this.$emit('changeEditForm', {
        ...this.editForm,
        photoUrl: res[0].url
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
