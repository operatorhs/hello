<template>
  <el-form ref="editForm" class="search-form" :model="editForm" label-width="100px">
    <el-form-item label="证书名称">
      <el-input v-model="editForm.name" placeholder="请输入证书名称" size="mini" clearable />
    </el-form-item>
    <el-form-item label="证书介绍">
      <el-input v-model="editForm.CertificateText" type="textarea" placeholder="证书介绍" size="mini" clearable />
    </el-form-item>
    <el-form-item label="上传证书模版">
      <fileButton @fileURL="getCoursePic" />
      <!-- <el-alert
        title="请上传482*694px的模版"
        type="error"
      /> -->
    </el-form-item>
    <div class="certificate d-f-s">
      <div class="left">
        <img class="bg" :src="BackgroundImgUrl" :alt="PROJECT_TITLE">
        <h2 class="name" :style="{ top: -memberNameY + 'px', left: memberNameX + 'px' }">{{ memberName }}</h2>
        <div class="asii" :style="{ top: -PhotoY + 'px', left: PhotoX + 'px' }">{{ PhotoUrl }}</div>
        <img class="code" :src="qrCodeUrl" :style="{ top: -qrCodeY + 'px', left: qrCodeX + 'px' }" :alt="PROJECT_TITLE">
      </div>
      <div class="right">
        <el-form-item label="请输入姓名">
          <el-input v-model="memberName" placeholder="请输入课程名称" size="mini" clearable />
          X:<el-input v-model="memberNameX" type="number" placeholder="请调整上下的位置" size="mini" clearable />
          Y:<el-input v-model="memberNameY" type="number" placeholder="请调整左右的位置" size="mini" clearable />
        </el-form-item>
        <el-form-item label="请二维码位置">
          <fileButton @fileURL="getCode" />
          <el-alert
            title="请上传160*160px的二维码"
            type="error"
          />
          X:<el-input v-model="qrCodeX" type="number" placeholder="请调整上下的位置" size="mini" clearable />
          Y:<el-input v-model="qrCodeY" type="number" placeholder="请调整左右的位置" size="mini" clearable />
        </el-form-item>
        <el-form-item label="请调整编码">
          <el-input v-model="PhotoUrl" placeholder="请输入课程名称" size="mini" clearable />
          X:<el-input v-model="PhotoX" type="number" placeholder="请调整上下的位置" size="mini" clearable />
          Y:<el-input v-model="PhotoY" type="number" placeholder="请调整左右的位置" size="mini" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="isLoading" @click="handleSubmit">提交</el-button>
        </el-form-item>
      </div>
    </div>
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
      courseImg: '',
      memberName: '测试姓名',
      memberNameX: -11,
      memberNameY: -304,
      qrCodeX: 0,
      qrCodeY: 0,
      PhotoX: 0,
      PhotoY: 0,
      PhotoUrl: ''
    }
  },
  computed: {
    ...mapState({
      PROJECT_TITLE: state => state.constants.PROJECT_TITLE
    }),
    BackgroundImgUrl() {
      return !this.editForm.BackgroundImgUrl ? require('../../../../assets/not-data.png') : process.env.VUE_APP_BASE_API + this.editForm.BackgroundImgUrl
    },
    qrCodeUrl() {
      return !this.editForm.qrCodeUrl ? require('../../../../assets/code.png') : process.env.VUE_APP_BASE_API + this.editForm.qrCodeUrl
    }
  },
  created() {
    this.inintPosition()
  },
  mounted() {
  },
  methods: {
    inintPosition() {
      this.qrCodeX = this.editForm.qrCodeX || 108
      this.qrCodeY = this.editForm.qrCodeY || -578
      this.memberNameX = this.editForm.memberNameX || 56
      this.memberNameY = this.editForm.memberNameY || -300
      this.memberName = this.editForm.memberName || '测试姓名'
      this.PhotoX = this.editForm.PhotoX || 100
      this.PhotoY = this.editForm.PhotoY || -645
      this.PhotoUrl = this.editForm.PhotoUrl
    },
    handleSubmit() {
      this.$emit('handleIsLoading')
      this.editForm.memberNameX = this.memberNameX
      this.editForm.memberNameY = this.memberNameY
      this.editForm.qrCodeX = this.qrCodeX
      this.editForm.qrCodeY = this.qrCodeY
      this.editForm.PhotoX = this.PhotoX
      this.editForm.PhotoY = this.PhotoY
      this.editForm.PhotoUrl = this.PhotoUrl
      this.$emit('sumbmitForm', this.editForm)
    },
    proviewHanlde(url) {
      open(url)
    },
    getCoursePic(res) {
      this.$emit('changeEditForm', {
        ...this.editForm,
        BackgroundImgUrl: res[0].url
      })
    },
    getCode(res) {
      this.$emit('changeEditForm', {
        ...this.editForm,
        qrCodeUrl: res[0].url
      })
    }
  }
}
</script>

<style scoped lang="scss">
.certificate {
  width: 1000px;
  // 595*842
  .left {
    flex-shrink: 0;
    width: 482px;
    height: 694px;
    box-sizing: border-box;
    box-shadow: 1px 1px 10px 10px rgba(51, 51, 51, 0.1);
    position: relative;
    .bg {
      width: 482px;
      height: 694px;
      position: absolute;
      top: 0;
      left: 0;
    }
    .asii {
      font-size: 12px;
      width: 147px;
      position: absolute;
    }
    .name {
      margin: 0;
      height: 40px;
      line-height: 40px;
      font-size: 28px;
      text-align: right;
      font-family: "STXingkai";
      position: absolute;
      top: 348px;
      left: 44px;
      z-index: 1
    }
    .code {
      width: 52px;
      height: 52px;
      position: absolute;
      z-index: 1;
    }
  }
  .right {
    width: 380px;
    margin-left: 25px;
    height: 842px;
  }
}
</style>
