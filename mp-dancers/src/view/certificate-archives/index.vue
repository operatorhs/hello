<template>
  <div class="info-container">
    <div class="info-contants common">
      <div class="avatar">
        <img :src="photoUrl" :alt="DANCERS_TITLE">
        <h5>欧阳明月</h5>
      </div>
      <div class="contants">
        <span class="title">联系方式</span>
        <h6 class="content">{{ memberInfo.mobileNu }}</h6>
      </div>
      <div class="second d-f-s">
        <div class="item">
          <span class="title">微信号</span>
          <h6 class="content">{{ memberInfo.wechatNumber }}</h6>
        </div>
        <div class="item">
          <span class="title">电子邮箱</span>
          <h6 class="content">{{ memberInfo.email }}</h6>
        </div>
      </div>
      <div class="contants address">
        <span class="title">通讯地址</span>
        <h6 class="content">{{ memberInfo.address }}</h6>
      </div>
    </div>

    <div class="common info-base">
      <h3>基本信息</h3>
      <div class="second d-f-s">
        <div class="item">
          <span class="title">姓名</span>
          <h6 class="content">{{ memberInfo.name }}</h6>
        </div>
        <div class="item">
          <span class="title">性别</span>
          <h6 class="content">{{ memberInfo.Gender }}</h6>
        </div>
      </div>
      <div class="second d-f-s">
        <div class="item">
          <span class="title">出身年月</span>
          <h6 class="content">{{ memberInfo.birthday }}</h6>
        </div>
        <div class="item">
          <span class="title">政治面貌</span>
          <h6 class="content">{{ memberInfo.Parties }}</h6>
        </div>
      </div>
      <div class="second d-f-s">
        <div class="item">
          <span class="title">身高</span>
          <h6 class="content">{{ memberInfo.height }}CM</h6>
        </div>
        <div class="item">
          <span class="title">最高学历</span>
          <h6 class="content">{{ memberInfo.education }}</h6>
        </div>
      </div>
      <div class="other">
        <span class="title">工作单位</span>
        <h6 class="content">{{ memberInfo.workUnit }}</h6>
      </div>
      <div class="other">
        <span class="title">毕业院校、专业</span>
        <h6 class="content">{{ memberInfo.graduate }}</h6>
      </div>
    </div>

    <div class="common experience" v-if="false">
      <div class="spane"></div>
      <h3>求学与工作经历</h3>
      <div class="content d-f-s">
        <div class="left">
          <span>2018至今</span>
          <img src="@/assets/img/certificate-archives/icon.png" :alt="DANCERS_TITLE">
        </div>
        <div class="right">
          <h2>学生</h2>
          <span>天津体育学院</span>
        </div>
      </div>
      <div class="content d-f-s">
        <div class="left">
          <span>2018至今</span>
          <img src="@/assets/img/certificate-archives/icon.png" :alt="DANCERS_TITLE">
        </div>
        <div class="right">
          <h2>学生</h2>
          <span>天津体育学院</span>
        </div>
      </div>
      <div class="content d-f-s">
        <div class="left">
          <span>2018至今</span>
          <img src="@/assets/img/certificate-archives/icon.png" :alt="DANCERS_TITLE">
        </div>
        <div class="right">
          <h2>学生</h2>
          <span>天津体育学院</span>
        </div>
      </div>
    </div>

    <div class="common result" v-if="false">
      <h3>主要成果</h3>
      <div class="item">
        <h6 class="content">云南艺术学院文华学院舞蹈学</h6>
      </div>
      <div class="item">
        <h6 class="content">云南艺术学院文华学院舞蹈学</h6>
      </div>
      <div class="item">
        <h6 class="content">云南艺术学院文华学院舞蹈学</h6>
      </div>
    </div>

  </div>
</template>
<script>
import { mapState } from 'vuex'
import { reqMemberByID } from '@/api/certificate'
export default {
  components: {
  },
  data() {
    return {
      memberID: null,
      memberInfo: {},
      photoUrl: ''
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
    this.getMemberInfo()
  },
  mounted() {
  },
  methods: {
    getMemberInfo() {
      reqMemberByID(this.memberID).then(res => {
        this.memberInfo = res
        this.photoUrl = this.BASE_URL + res.photoUrl
      })
    }
  }
}
</script>

<style scoped lang="less">
@borderCorder: #E6E6E6; // 边框线的颜色
@spaceTop: .2rem; // 每个信息之间的间隙
@modelSpace: .3rem; // 板块间的间隙
.info-container {
  width: 100%;
  background: url(../../assets/img/certificate/bg.png) repeat-y;
  background-size: cover;
  padding-top: 1.64rem;
  padding-bottom: .3rem;
  .common {
    background: rgba(255, 255, 255, 0.95);
    padding: .5rem;
    border-radius: .16rem;
    .title {
      color: #999999;
      font-size: .2rem;
    }
    .content {
      color: #4D4D4D;
      font-size: .28rem;
      font-weight: 400
    }
    h3 {
      color: #000;
      font-size: .28rem;
      font-weight: 400;
    }
  }
  .info-contants {
    padding-top: 1.81rem;
    position: relative;
    .avatar {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 2rem;
      height: 2rem;
      border-radius: 2rem;
      background: pink;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      h5 {
        margin-top: @spaceTop;
        font-size: .3rem;
        color: #000;
        font-weight: 400;
        text-align: center;
      }
    }
    .contants {
      .content {
        padding-top: .2rem;
        padding-bottom: .1rem;
        border-bottom: 1px solid @borderCorder;
      }
      &.address {
        margin-top: @spaceTop;
      }
    }
    .second {
      margin-top: @spaceTop;
      border-bottom: 1px solid @borderCorder;
      padding: .1rem;
      .item {
        width: 50%;
        .content {
          padding-top: @spaceTop;
        }
        &:nth-child(2) {
          border-left: 1px solid @borderCorder;
          padding-left: .22rem;
        }
      }
    }
  }
  .info-base {
    margin-top: @modelSpace;
    .second {
      margin-top: @modelSpace;
      .item {
        width: 50%;
        border-bottom: 1px solid @borderCorder;
        padding-bottom: .1rem;
        .content {
          padding-top: .2rem;
        }
        &:nth-child(2) {
          padding-left: .22rem;
        }
      }
    }
    .other {
      margin-top: @spaceTop;
      padding-bottom: .1rem;
      border-bottom: 1px solid @borderCorder; 
      .content {
        padding-top: @spaceTop;
      }
    }
  }
  .experience {
    margin-top: @modelSpace;
    position: relative;
    .spane {
      width: 2px;
      height: calc(100% - 1.58rem);
      background: @borderCorder;
      position: absolute;
      left: 1.78rem;
      top: 1.08rem;
    }
    h3 {
      padding-bottom: @modelSpace;
      margin-bottom: .72rem;
    }
    .content {
      height: 1.5rem;
      .left {
        width: 1.3rem;
        position: relative;
        span {
          font-size: .2rem;
          color: #000;
        }
        img {
          position: absolute;
          right: 0;
          top: .06rem;
          transform: translate(50%);
          width: .22rem;
        }
      }
      .right {
        padding-left: .5rem;
        padding-top: @modelSpace;
        h2 {
          color: #000;
          font-size: .3rem;
          font-weight: 400;
          margin-bottom: .2rem;
        }
        span {
          color: #999;
          font-size: .2rem;
        }
      }
    }
  }
  .result {
    margin-top: @modelSpace;
    .item {
      margin-top: @modelSpace;
      padding-bottom: .1rem;
      border-bottom: 1px solid @borderCorder;
    }
  }
}
</style>
