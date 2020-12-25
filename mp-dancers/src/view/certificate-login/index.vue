<template>
  <div class="certificate-login">
    <img class="logo" src="@/assets/img/certificate/logo.png" :alt="DANCERS_TITLE">
    
    <div class="form-info">
      <div class="item">
        <dancer-input ref="username" v-model="username" :info="{ label: '用户名' }" :rules="'请输入用户名'" />
      </div>
      <div class="item phone">
        <dancer-input ref="mobile" v-model="mobile" :info="{ label: '请输入手机号' }" :rules="mobileRules" />
        <span class="send" @click="sendCheckCode">{{ !isSendCode ? '发送验证码' : `已发送${sendTimer}/s` }}</span>
      </div>
      <div class="item">
        <dancer-input ref="poneCode" v-model="PhoneCode" :info="{ label: '请输入验证码' }" :rules="phoneCodeCheck" />
      </div>
      <div class="btn" @click="handleLogin">
        <van-loading v-if="isLogin" color="#b72e2c" />
        登录
      </div>
    </div>
    <h3 class="theme">中国舞蹈家协会、中国文联舞蹈艺术中心</h3>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import dancerInput from '@/components/dancer-input'
import { Loading } from 'vant'
import {
  reqGeneratePhoneCode,
  reqGenerateCheckPhoneCode,
  reqMemberLogin
} from '@/api/certificate'
export default {
  components: {
    [Loading.name]: Loading,
    dancerInput
  },
  data() {
    return {
      username: '',
      isSendCode: false,
      sendTimer: 61,
      timerOut: null,
      timerInterval: null,
      mobile: '',
      mobileRules: '手机号码不能为空',
      PhoneCode: '',
      phoneCodeCheck: '验证码不能为空',
      isLogin: false
    }
  },
  computed: {
    ...mapState({
      DANCERS_TITLE: state => state.app.DANCERS_TITLE
    })
  },
  created() {
  },
  mounted() {
  },
  destroyed() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval)
    }
    if (this.timerOut) {
      clearTimeout(this.timerOut)
    }
  },
  methods: {
    ...mapActions(['app/setUserInfo', 'app/setToken']),
    sendCheckCode() {
      const reg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!reg.test(this.mobile)) {
        this.mobileRules = '请输入正确的手机号码'
        this.$refs['mobile'].checkError(true)
        return false
      } else {
        this.$refs['mobile'].checkError(false)
      }
      if (!this.isSendCode) {
        reqGeneratePhoneCode({ mobileNu: this.mobile, name: this.username }).then(res => {
          if (!res) {
            this.mobileRules = '发送失败'
            this.$refs['mobile'].checkError(true)
            this.isSendCode = false
            if (this.timerInterval) {
              clearInterval(this.timerInterval)
              this.sendTimer = 61
              this.timerInterval = null
            }
            if (this.timerOut) {
              clearTimeout(this.timerOut)
              this.timerOut = null
            }
          }
        })
      }
      this.isSendCode = true
      this.timerOut = setTimeout(() => {
        this.isSendCode = false
        if (this.timerInterval) {
          clearInterval(this.timerInterval)
          this.timerInterval = null
        }
        if (this.timerOut) {
          clearTimeout(this.timerOut)
          this.timerOut = null
        }
      }, 60000)
      this.timerInterval = setInterval(() => {
        this.sendTimer--
      }, 1000)
    },
    handleLogin() {
      if (!this.PhoneCode) {
        this.$refs['poneCode'].checkIsEmpty()
        return false
      } else {
        this.$refs['poneCode'].checkIsEmpty()
      }
      if (!this.username) {
        const reg = /^1[3|4|5|7|8][0-9]{9}$/
        if (!reg.test(this.mobile)) {
          this.mobileRules = '请输入正确的手机号码'
          this.$refs['mobile'].checkError(true)
          return false
        } else {
          this.$refs['mobile'].checkError(false)
        }
        return false
      } else {
        this.$refs['mobile'].checkIsEmpty()
      }
      if (!this.PhoneCode) {
        this.$refs['poneCode'].checkIsEmpty()
        return false
      } else {
        this.$refs['poneCode'].checkIsEmpty()
      }
      this.isLogin = true
      reqGenerateCheckPhoneCode({ mobile: this.mobile, VerificationCode: this.PhoneCode }).then(check => {
        if (!check) {
          this.phoneCodeCheck = '验证码错误,请检查'
          this.$refs['poneCode'].checkError(true)
          this.isLogin = false
        } else {
          reqMemberLogin({ username: this.username, password: this.mobile }, { PhoneCode: this.PhoneCode }).then(res => {
            this.isLogin = false
            if (res.success) {
              this['app/setUserInfo'](res)
              this['app/setToken'](res.token)
              this.$router.replace({
                path: '/certificate-down'
              })
              this.$refs['poneCode'].checkError(false)
            } else {
              this.mobileRules = '登录失败请检查手机号码'
              this.phoneCodeCheck = '登录失败请检查验证码'
              this.$refs['poneCode'].checkError(true)
              this.$refs['mobile'].checkError(true)
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.certificate-login {
  width: 100%;
  height: 100%;
  background: url('../../assets/img/certificate/bg.png') no-repeat center;
  background-size: cover;
  position: relative;
  .logo {
    position: absolute;
    top: 1.47rem;
    left: 1.65rem;
    width: 4.21rem;
    height: 2.47rem;
  }
  .theme {
    width: 100%;
    text-align: center;
    color: #ccc;
    font-size: .2rem;
    line-height: .2rem;
    position: absolute;
    bottom: .5rem;
    left: 0;
  }
  .form-info {
    width: 5rem;
    position: absolute;
    top: 4.94rem;
    left: 1.25rem;
    .item {
      &:nth-child(1) {
        margin-top: 0;
      }
      &.phone {
        position: relative;
        .send {
          position: absolute;
          right: 0;
          top: -.04rem;
          font-size: .2rem;
          color: #e6e5e6;
          width: 1.5rem;
          height: .64rem;
          line-height: .64rem;
          text-align: center;
          &:active {
            background: rgba(51, 51, 51, .1)
          }
        }
      }
      margin-top: .56rem;
    }
    .btn {
      transition: all .1 ease;
      background: #fff;
      position: absolute;
      top: 4.2rem;
      left: 0px;
      width: 5rem;
      height: .84rem;
      border-radius: .84rem;
      line-height: .84rem;
      text-align: center;
      color: #333333;
      font-size: .36rem;
      &:active {
        transform: scale(.98);
      }
    }
  }
}
</style>
