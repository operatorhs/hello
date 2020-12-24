<template>
  <div class="home">
    <img ref="certificate" :src="myUrl" alt="下载" />
    <p>{{ message }}</p>
    <div @click="handleDownImg">下载</div>
    <!-- <a href="../assets/logo.png" download="下载图片.png">下载图片</a> -->
    <Button>antUI</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Button } from "vant";

export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    const message = ref(1);
    const myUrl = ref("");
    return {
      message,
      myUrl
    };
  },
  methods: {
    handleDownImg() {
      // console.log(plus)
      // const img:any = this.$refs["certificate"];
      // console.log(img);
      const img = new Image();
      img.src = require("../assets/logo.png");
      const canvas = document.createElement("canvas");
      this.message = 2;
      img.onload = () => {
        this.message = 3;
        const width: number = img.width;
        const height: number = img.height;
        console.log(width, height);
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (ctx === null) {
          this.message = 4;
          return false;
        }
        this.message = 5;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const url = canvas.toDataURL("image/png");

        const blob = this.base64ToBlob(url);

        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        this.myUrl = URL.createObjectURL(blob);
        a.download = "certificate.png";
        // a.click();
        // this.message = 9;
        // alert('保存成功')
      };
    },
    base64ToBlob(code: any) {
      const parts = code.split(";base64,");
      const contentType = parts[0].split(":")[1];
      const raw = window.atob(parts[1]);
      const rawLength = raw.length;
      const uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });
    }
  }
});
</script>
