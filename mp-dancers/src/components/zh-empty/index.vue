<template>
  <div class="empty-container">
    <div class="img-box">
      <img src="@/assets/img/common/empty-icon.png" :alt="DANCERS_TITLE">
    </div>
    <p>{{ text }}</p>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  components: {
  },
  data() {
    return {
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
  methods: {
  }
}
</script>

<style scoped lang="less">
.empty-container {
  width: 100%;
  height: 100%;
  background: url('../../assets/img/common/empty-bg.png') no-repeat center;
  background-size: cover;
  position: relative;
  .img-box {
    height: 4.04rem;
    width: 5.88rem;
    position: absolute;
    left: 50%;
    top: 3.64rem;
    transform: translateX(-2.94rem);
    img {
      width: 100%;
      height: 100%;
    }
  }
  p {
    text-align: center;
    width: 5.88rem;
    position: absolute;
    left: 50%;
    top: 7.22rem;
    color: #999;
    transform: translateX(-2.94rem);
    font-size: .32rem;
    line-height: .44rem;
  }
}
</style>
