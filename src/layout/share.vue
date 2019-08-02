<template>
  <div id="shareBtn">
    <i @click="QQ" class="shareicon iconfont icon-QQ"></i>
    <i @click="Douban" class="shareicon iconfont icon-douban"></i>
    <i @click="Sina" class="shareicon iconfont icon-weibo"></i>
    <i @click="QQzone" class="shareicon iconfont icon-QQkongjian"></i>
  </div>
</template>

<script>
const url = window.url
import { share, shop } from "./share";
export default {
  props: {
      title:{
          type:String,
          default:'无标题'
      },
      url:{
          type:String,
          default:url,
      },
      imgUrl:{
          type:String,
          default:''
      }
  },
  data() {
    return {
      shareObj: null,
      shopObj:null
    };
  },
  methods: {
    QQzone() {
      this.shareObj.shareQQZone();
    },
    Sina() {
      this.shareObj.shareSina();
    },
    Douban() {
      this.shareObj.shareDouban();
    },
    QQ() {
      this.shareObj.shareQQ();
    },
    dingdang() {
      this.pbj.shopDing();
    },
    Amazon() {
      this.pbj.shopAmazon();
    },
    dong() {
      this.pbj.shopJing();
    }
  },
  mounted() {
    this.shareObj = new share(this.title, this.url, this.imgUrl);
    this.shopObj = new shop(this.title);
    console.log(this.shareObj)
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variables.scss";
#shareBtn {
    
  .shareicon {
    font-size: 30px;
    color: #444;
    cursor: pointer;
    padding: 0 3px;
  }
  .shareicon:hover {
    color: $green;
  }
}
</style>


