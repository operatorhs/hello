<template>
  <div class="down-container">
    <template v-if="!isErr">
      <div class="top">
        <h3>顶尖教师巡回课堂（网络培训班）</h3>
      </div>
      <div class="main d-f-c" @click="previewImg">
        <!-- <img src="@/assets/img/certificate-down/cer.png" :alt="DANCERS_TITLE"> -->
        <van-loading v-if="isLogin" color="#b72e2c" />
        <img v-show="!isLogin" :src="classCertificateUrl" :alt="DANCERS_TITLE">
      </div>
      <div class="down">
        <span class="text">长按证书(图片)保存到相册</span>
      </div>
      <div class="info d-f-c" @click="handleGoInfo">
        <img src="@/assets/img/certificate-down/info.png" :alt="DANCERS_TITLE">
        学员信息
      </div>
    </template>
    <zh-empty :text="errText" v-if="isErr" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { reqMemberesList } from '@/api/certificate'
import { ImagePreview, Loading} from 'vant'
import zhEmpty from '@/components/zh-empty'
export default {
  components: {
    zhEmpty,
    [Loading.name]: Loading,
  },
  data() {
    return {
      classID: '030e96fc-75b1-4619-9fc0-25868c8b7d5a',
      memberID: null,
      classCertificateUrl: '',
      isErr: false,
      errText: '',
      isLogin: false
    }
  },
  computed: {
    ...mapState({
      DANCERS_TITLE: state => state.app.DANCERS_TITLE,
      userInfo: state =>  state.app.userInfo,
      BASE_URL: state => state.app.BASE_URL
    })
  },
  created() {
    if (!this.userInfo || !this.userInfo.id || !this.userInfo.token) {
      this.$router.replace({
        path: '/certificate-login'
      })
      return false
    }
    this.memberID = this.userInfo.id
    this.initPage()
  },
  mounted() {
    // https://demo2.tdgjs.com/cdaMember/api/classMembers?page=1&limit=11&memberID=78f5e6af-2ecb-42f9-8aa8-f7c06e0309d1&classID=030e96fc-75b1-4619-9fc0-25868c8b7d5a
    // https://demo2.tdgjs.com/cdaMember/api/members?page=1&limit=10&memberID=78f5e6af-2ecb-42f9-8aa8-f7c06e0309d1&classID=030e96fc-75b1-4619-9fc0-25868c8b7d5a
  },
  methods: {
    previewImg() {
      ImagePreview([this.classCertificateUrl])
    },
    initPage() {
      this.isLogin = true
      reqMemberesList({ page: 1, limit: 10, memberID: this.memberID, classID: this.classID }).then(res => {
        this.isLogin = false
        if (!res || !res.gridlist[0]) {
          // 对不起您不是该期学员, 请联系协会报名
          this.isErr = true
          this.errText = '对不起您不是该期学员, 请联系协会报名'
          return false
        }
        if (!res.gridlist[0].classCertificateUrl) {
          // 对不起您的证书没有生成请联系协会
          this.isErr = true
          this.errText = '对不起您的证书没有生成,请联系协会'
          return false
        }
        this.isErr = false
        this.classCertificateUrl = this.BASE_URL + res.gridlist[0].classCertificateUrl
      })
    },
    handleGoInfo() {
      this.$router.push({
        path: '/certificate-archives'
      })
    }
  }
}
</script>

<style scoped lang="less">
.down-container {
  width: 100%;
  height: 100%;
  background: url('../../assets/img/certificate-down/bg.png') no-repeat center;
  background-size: cover;
  .top {
    height: 1.28rem;
    h3 {
      height: 1.28rem;
      text-align: center;
      line-height: 1.28rem;
      color: #fff;
      font-size: .3rem;
      font-weight: 400;
    }
  }
  .main {
    height: calc(100% - 2.92rem);
    // border-bottom: 1px dashed #fff;
    img {
      width: 100%;
      max-height: 100%;
    }
  }
  .down {
    height: .8rem;
    line-height: .8rem;
    text-align: center;
    .text {
      color: #fff;
      font-size: .2rem;
    }
  }
  .info {
    border-top: 1px solid #fff;
    height: .84rem;
    background: #000;
    color: #fff;
    font-size: .3rem;
    img {
      margin-right: .2rem;
      width: .38rem;
      height: .38rem;
    }
  }
}
</style>
