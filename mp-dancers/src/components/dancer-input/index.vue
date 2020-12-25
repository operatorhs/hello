<template>
  <div class="input-container">
    <input class="input" type="text" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" :placeholder="info.label" @blur="checkIsEmpty" >
    <span class="tips" v-show="isErr">{{ rules }}</span>
  </div>
</template>
<script>
export default {
  components: {
  },
  props: {
    value: [String, Number, Object, String, Boolean],
    info: {
      type: Object,
      default: function() {
        return {
          label: '用户名'
        }
      }
    },
    rules: {
      type: String,
      default: '请输入信息'
    }
  },
  data() {
    return {
      isErr: false
    }
  },
  computed: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    checkIsEmpty() {
      if (!this.value) {
        this.isErr = true
      } else {
        this.isErr = false
      }
    },
    checkError(flag) {
      if (flag) {
        this.isErr = true
      } else {
        this.isErr = false
      }
    }
  }
}
</script>

<style scoped lang="less">
input::-webkit-input-placeholder {
    /* WebKit browsers */
    font-size: .24rem;
    color: #999;
}
input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    font-size: .24rem;
    color: #999;
}
input:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    font-size: .24rem;
    color: #999
;
}
.input-container {
  position: relative;
  width: 100%;
  margin-bottom: 0.32rem;
  .input {
    display: block;
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    color: #e6e6e6;
    padding-bottom: .2rem;
    border-radius: 0;
    border-bottom: 1px solid #fff;
  }
  .tips {
    color: #ff1a1a;
    font-size: 0.24rem;
    position: absolute;
    bottom: -0.32rem;
    left: 0;
  }
}
</style>
