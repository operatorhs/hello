<template>
  <el-form ref="editForm" class="search-form" :model="editForm" label-width="200px">
    <el-form-item label="姓名">
      <el-input v-model="editForm.name" placeholder="请输入姓名" size="mini" clearable />
    </el-form-item>
    <el-form-item label="报名时间">
      <el-date-picker v-model="editForm.registrationTime" type="date" size="mini" placeholder="报名时间" style="width: 174px;" />
    </el-form-item>
    <el-form-item label="考核分数">
      <el-input v-model="editForm.assessmentScore" placeholder="请输入考核分数" size="mini" clearable />
    </el-form-item>
    <el-form-item label="考核级别">
      <el-select v-model="editForm.assessmentLevel" size="mini" placeholder="请选择考核级别" clearable>
        <el-option
          v-for="item in cassLevelList"
          :key="item.assessmentLevelID"
          :label="item.name"
          :value="item.name"
        />
      </el-select>
    </el-form-item>
    <!-- <el-form-item label="学生图片">
      <fileButton @fileURL="getCoursePic" />
      <div v-show="photoUrl" class="img3-2">
        <img :src="photoUrl" :alt="PROJECT_TITLE" @click="proviewHanlde(photoUrl)">
      </div>
    </el-form-item> -->
    <el-form-item label="证书类别">
      <el-select v-model="editForm.classCertificateID" size="mini" placeholder="请选择证书模版" clearable @change="handleChangeCertificate">
        <el-option
          v-for="item in certificateList"
          :key="item.classCertificateID"
          :label="item.name"
          :value="item.classCertificateID"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="证书编号">
      <el-input v-model="editForm.CertificateIdentifier" placeholder="请输入证书编号" size="mini" clearable />
    </el-form-item>
    <el-form-item label="证书说明">
      <el-input v-model="editForm.CertificateText" type="textarea" placeholder="请输入证书说明" size="mini" clearable />
    </el-form-item>
    <el-form-item v-show="certificateUrl" label="证书预览">
      <div class="img3-2">
        <img :src="certificateUrl" :alt="PROJECT_TITLE" @click="proviewHanlde(certificateUrl)">
      </div>
    </el-form-item>
    <el-form-item label="下载证书">
      <el-button v-if="editForm.classCertificateUrl" type="primary" size="mini" :loading="isLoading" @click="createdCertificateHandle(editForm.classCertificateUrl)">下载证书</el-button>
      <span v-else>您还没有生成证书</span>
    </el-form-item>
    <el-form-item label="颁发证书时间">
      <el-date-picker v-model="editForm.issuingTime" type="date" size="mini" placeholder="证书颁发时间" style="width: 174px;" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" :loading="isLoading" @click="handleSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { mapState } from 'vuex'
import {
  reqCertificateList,
  reqClassLevelList
} from '@/api/class'
import {
  reqDownloadFile
} from '@/api/constants'
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
    },
    classID: {
      type: [String, Number],
      default: ''
    },
    codeUrl: {
      type: [String],
      default: ''
    }
  },
  data() {
    return {
      courseImg: '',
      certificateList: [],
      certificateForm: {},
      cassLevelList: [],
      isCreatedCertificate: false
    }
  },
  computed: {
    ...mapState({
      PROJECT_TITLE: state => state.constants.PROJECT_TITLE
    }),
    photoUrl() {
      return !this.editForm.photoUrl ? null : process.env.VUE_APP_BASE_API + this.editForm.photoUrl
    },
    certificateUrl() {
      return !this.editForm.classCertificateUrl ? null : process.env.VUE_APP_BASE_API + this.editForm.classCertificateUrl
    }
  },
  created() {
    this.getCertificateList()
    this.getLevelList()
  },
  mounted() {
  },
  methods: {
    getCertificateList() {
      reqCertificateList({ classID: this.classID, page: 1, limit: 99999 }).then(res => {
        this.certificateList = res.gridlist
      })
    },
    getLevelList() {
      reqClassLevelList({ classID: this.classID, page: 1, limit: 99999 }).then(res => {
        console.log('等级表', res.gridlist)
        this.cassLevelList = res.gridlist
      })
    },
    handleSubmit() {
      this.$emit('handleIsLoading')
      this.$emit('sumbmitForm', this.editForm)
    },
    getBannerPic(res) {
      this.$emit('changeEditForm', {
        ...this.editForm,
        topBanner: res[0].url
      })
    },
    getCoursePic(res) {
      this.$emit('changeEditForm', {
        ...this.editForm,
        photoUrl: res[0].url
      })
    },
    proviewHanlde(url) {
      open(url)
    },
    handleChangeCertificate(e) {
      console.log(e)
      this.certificateList.forEach(item => {
        if (item.classCertificateID === e) {
          this.editForm.CertificateIdentifier = item.PhotoUrl // 这里用PhotoUrl 代替证书编号
          this.editForm.CertificateText = item.CertificateText
        }
      })
    },
    createdCertificateHandle(classCertificateUrl) {
      this.$emit('handleIsLoading')
      reqDownloadFile({ FilePath: classCertificateUrl }).then(res => {
        this.$emit('handleIsLoading')
        const reg = /(\.[a-zA-Z]+)/
        const suffix = classCertificateUrl.match(reg)[0]
        const objectURL = URL.createObjectURL(res)
        const a = document.createElement('a')
        a.download = this.editForm.name + suffix
        a.href = objectURL
        a.click()
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
