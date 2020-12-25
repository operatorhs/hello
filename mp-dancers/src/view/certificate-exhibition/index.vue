<template>
  <div class="exhibition-container">
    <template v-if="!isErr">
      <img class="logo" src="@/assets/img/certificate/logo.png" :alt="DANCERS_TITLE">
      <div class="content">
        <h3>{{ memberInfo.name }}:</h3>
        <p class="text-ch">
          {{ memberInfo.CertificateText }}
        </p>
        <h5>证书编号: {{ memberInfo.CertificateIdentifier }}</h5>
        <span>特颁此证。</span>
      </div>
      <div class="code">
        <img src="@/assets/img/certificate-exhibition/code.png" :alt="DANCERS_TITLE">
        <span>顶尖舞者微信公众号</span>
      </div>
    </template>
    <zh-empty :text="errText" v-if="isErr" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { reqClassMembersByID } from '@/api/certificate'
import zhEmpty from '@/components/zh-empty'
export default {
  components: {
    zhEmpty
  },
  data() {
    return {
      memberInfo: {},
      errText: '',
      isErr: true
    }
  },
  computed: {
    ...mapState({
      DANCERS_TITLE: state => state.app.DANCERS_TITLE
    })
  },
  created() {
    this.classMemberID = this.$route.query.classMemberID
    if (!this.classMemberID) {
      // 证书不存在
      this.isErr = true
      this.errText = '没有查到您,在本协会学习的记录'
    } else {
      this.isErr = false
      reqClassMembersByID(this.classMemberID).then(res => {
        this.memberInfo = res
      })
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
.exhibition-container {
  width: 100%;
  height: 100%;
  background: url('../../assets/img/certificate-exhibition/bg.png') no-repeat center;
  background-size: cover;
  position: relative;
  .logo {
    position: absolute;
    top: 1.47rem;
    left: 1.65rem;
    width: 4.21rem;
    height: 2.47rem;
  }
  .content {
    position: absolute;
    top: 4.8rem;
    left: 1.09rem;
    width: 5.31rem;
    h3 {
      font-size: .3rem;
      color: #fff;
      font-size: 400;
      margin-bottom: .1rem;
    }
    h5 {
      color: #fff;
      font-size: .26rem;
      line-height: .4rem;
      margin-bottom: .2rem;
    }
    p{
      color: #fff;
      font-size: .26rem;
      line-height: .4rem;
      margin-bottom: .3rem;
      text-indent: 2em;
    }
    span {
      color: #fff;
      font-size: .26rem;
      line-height: .4rem;
    }
  }
  .code {
    width: 2.5rem;
    position: absolute;
    left: 2.5rem;
    top: 9.25rem;
    color: #fff;
    font-size: .16rem;
    text-align: center;
    img {
      width: 100%;
      margin-bottom: .1rem;
    }
  } 
}
</style>
