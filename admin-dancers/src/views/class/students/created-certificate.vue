<template>
  <div class="lt-20">
    <el-alert
      v-if="msg"
      :title="msg"
      type="error"
    />
    <el-button type="primary" size="mini" @click="$router.go(-1)">返回</el-button>
    <div v-if="msg" style="height: 10px;" />
    <div ref="certificate-container" v-loading="loading" class="certificate-container">
      <h2 class="name" :style="{ top: -CertificateForm.memberNameY + 'px', left: CertificateForm.memberNameX + 'px' }">{{ currentForm.name }}</h2>
      <img ref="bg" :src="BackgroundImgUrl" class="bg" alt="顶尖舞者">
      <div id="QRCode" class="qrbox">
        <img id="qrCodeIco" src="./components/icon.png">
      </div>
      <img class="zh-code" :src="codeUrl" style="width: 260px; height: 260px" alt="">
      <img class="zh-code" :src="codeUrl" style="width: 52px; height: 52px; z-index: 100" alt="">
      <span>{{ CertificateForm.CertificateIdentifier }}</span>
    </div>
    <!-- <img :src="testUrl" alt=""> -->
  </div>
</template>
<script>
import {
  reqClassMembersByID,
  reqClassMembersList,
  reqCertificateByID,
  reqClassMembersUpload
} from '@/api/class'
import {
  reqDownloadFile,
  reqUpload
} from '@/api/constants'
import QRCode from 'qrcodejs2'
import Html2canvas from 'html2canvas'
export default {
  components: {
  },
  data() {
    return {
      BackgroundImgUrl: null,
      currentForm: {},
      CertificateForm: {},
      myUrl: null,
      codeUrl: null,
      testUrl: null,
      loading: false,
      msg: null,
      zk_code: null
    }
  },
  computed: {
  },
  created() {
    if (this.$route.query.classMemberID) {
      const classMemberID = this.$route.query.classMemberID
      reqClassMembersByID(classMemberID).then(res => {
        const currentForm = res
        this.currentForm = res
        const { CertificateIdentifier, classCertificateID, name } = currentForm
        if (!name) {
          this.tips('该学员没有姓名请完善！')
          return false
        }
        if (!classCertificateID) {
          this.tips('请为该学员选择一个证书类型！')
          return false
        }
        if (!CertificateIdentifier) {
          this.tips('该学员没有证书编号!')
          return false
        }
        this.loading = true
        reqCertificateByID(classCertificateID).then(cer => {
          this.CertificateForm = cer
          reqDownloadFile({ FilePath: this.CertificateForm.BackgroundImgUrl }).then(img => {
            this.BackgroundImgUrl = URL.createObjectURL(img)
            this.initCode(this.BackgroundImgUrl, currentForm)
          })
        })
      })
    } else if (this.$route.query.classID) {
      const classID = this.$route.query.classID
      reqClassMembersList({ page: 1, limit: 9999999, classID }).then(res => {
        console.log(res)
        const checkList = res.gridlist
        let count = 0
        let str = '分别是'
        checkList.forEach(item => {
          if (item.name && item.classCertificateID && item.CertificateIdentifier) {
            this.loading = true
            const temp = {}
            reqCertificateByID(item.classCertificateID).then(cer => {
              const currentForm = item
              this.currentForm = item
              this.CertificateForm = cer
              if (temp.classCertificateID) { // 做个性能优化
                this.initCode(temp.classCertificateID, currentForm)
              } else {
                reqDownloadFile({ FilePath: this.CertificateForm.BackgroundImgUrl }).then(img => {
                  this.BackgroundImgUrl = URL.createObjectURL(img)
                  temp.classCertificateID = this.BackgroundImgUrl
                  this.initCode(this.BackgroundImgUrl, currentForm)
                })
              }
            })
          } else {
            count++
            str += (item.name || '请输入姓名') + ','
          }
        })
        this.msg = `由于信息缺失，共有${count}人未能生成证书，${str}`
        this.$message({
          type: 'warning',
          message: this.msg
        })
      })
    } else {
      this.$router.push({
        path: '/class/list'
      })
    }
  },
  mounted() {
  },
  methods: {
    initCode(BackgroundImgUrl, currentForm) {
      const { classMemberID } = currentForm
      const elBox = document.getElementById('QRCode')
      const option = {
        text: 'http://www.baidu.com?classMemberID=' + classMemberID,
        width: 224,
        height: 224,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      }
      if (!this.zk_code) {
        this.zk_code = new QRCode(elBox, option)
      } else {
        this.zk_code.clear()
        this.zk_code.makeCode('http://www.baidu.com?classMemberID=' + classMemberID)
      }
      Html2canvas(elBox).then(canvas => {
        this.codeUrl = canvas.toDataURL('image/png')
        const codeUrl = canvas.toDataURL('image/png')
        this.initCertificate(BackgroundImgUrl, codeUrl, currentForm)
      })
    },
    initCertificate(BackgroundImgUrl, codeUrl, currentForm) {
      const { name, CertificateIdentifier } = currentForm
      const cw = 2409
      const ch = 3470
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = cw
      canvas.height = ch
      const bg = new Image()
      bg.src = BackgroundImgUrl
      bg.onload = () => {
        ctx.drawImage(bg, 0, 0, cw, ch)
        const { qrCodeX, qrCodeY, memberNameX, memberNameY, PhotoX, PhotoY } = this.CertificateForm
        const codeImg = new Image()
        codeImg.src = codeUrl
        codeImg.onload = () => {
          ctx.drawImage(codeImg, qrCodeX * 5, -qrCodeY * 5, 260, 260)
          ctx.font = '80px STXingkai'
          const x = name.length === 3 ? memberNameX * 5 + 300 : name.length === 2 ? memberNameX * 5 + 340 : name.length === 4 ? memberNameX * 5 + 260 : memberNameX * 5 + 220
          ctx.fillText(name, x, -memberNameY * 5 + 140)
          ctx.font = '36px Arial'
          ctx.fillStyle = '#333'
          ctx.fillText(CertificateIdentifier, PhotoX * 5 + 4, -PhotoY * 5 + 36)
          this.testUrl = canvas.toDataURL()
          const bytes = window.atob(this.testUrl.split(',')[1])
          const ab = new ArrayBuffer(bytes.length)
          const ia = new Uint8Array(ab)
          for (let i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i)
          }
          const blob = new Blob([ab], { type: 'image/jpeg' })
          const fd = new FormData()
          fd.append('file', blob, name + '.jpg')
          reqUpload(fd).then(file => {
            console.log(file)
            currentForm.classCertificateUrl = file[0].url
            reqClassMembersUpload(currentForm, currentForm.classMemberID).then(u => {
              this.loading = false
              this.$message({
                message: `已经为"${name}"生成证书`,
                type: 'success'
              })
            })
            // this.certificatesForm.FormworkDrawing = res[0].url
            // this.updateCertificate()
            // this.isLoading = false
          })
        }
      }
    },
    tips(t) {
      this.$alert(t, '温馨提示', {
        confirmButtonText: '确定',
        callback: action => {
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
// 482*694px
.certificate-container {
  width: 482px;
  height: 694px;
  position: relative;
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100
  }
  .name {
    margin: 0;
    height: 40px;
    line-height: 40px;
    font-size: 28px;
    font-weight: 500;
    text-align: right;
    color: #333;
    font-family: "STXingkai";
    position: absolute;
    top: 348px;
    left: 44px;
    z-index: 101
  }
  .zh-code {
    position: absolute;
    bottom: 79px;
    left: 126px;
  }
}
.qrbox {
  width: 260px;
  height: 260px;
  background: #ffffff;
  position: relative;
  padding: 18px;
  #qrCodeIco {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-27px, -27px);
  }
}
</style>
