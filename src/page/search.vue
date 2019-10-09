<template>
  <div id="search">
    <transition name="fade">
      <div class="mask" v-if="isMask"></div>
    </transition>
    <!-- 导航 -->
    <section class="header">
      <nav class="nav">
        <ul class="navCtx">
          
            <router-link tag="li" to="/">首页</router-link>
          
          
            <router-link tag="li" to="/esaySearch">书籍检索</router-link>
            <router-link tag="li" to="/LendingRank">借阅管理</router-link>
						<router-link v-if="isLogin" tag="li" to="/BasicInfo">读者中心</router-link>
          <router-link  v-if="!isLogin" tag="li" to="/login">读者登录</router-link>
        </ul>
      </nav>
    </section>
    <!-- logo图片 -->
    <section class="imgLogoBox">
      <img src="@/common/img/libLogo.png" />
    </section>
    <!-- 搜索框 -->
    <section class="searchBox">
      <search-input @blur-son="blurMask" @focu-son="focuMask"  @emit-search="_searchto"></search-input>
    </section>
    
    <div class="copyright">版权所有 copyright © www.kuiniu.com 智慧图书馆</div>
  </div>
</template>
<script>
import SearchInput from "@/components/SearchInput";
export default {
  data() {
    return {
      isMask:false,
			isLogin:false,
    };
  },
  computed: {
    searchTimeForm() {}
  },
  components: {
    SearchInput
  },
  methods: {
    _searchto(val){
      console.log('?',val)
      this.$router.push({path:'searchList',query:val})
      
    },
    focuMask(){
      this.isMask = true
    },
    blurMask(){
      this.isMask = false
    },
  },
  mounted(){
   console.log(document.documentElement.clientHeight)
	 let token = sessionStorage.getItem('authorization');
	 if(token){
		 this.isLogin = true
	 } else {
		 this.isLogin = false
	 }
  }
};
</script>
<style lang="scss" scoped>
@import '@/common/scss/variables.scss';
#search {
  background-image: url("../common/img/bg.jpg");
  
  background-size: cover;
  height: 100vh;
  background-position: center;
  .header {
    .nav {
      width: 1200px;
      margin: 0 auto;
      
      .navCtx {
        display: flex;
        flex-direction: row;
        color: #ffffff;

        li {
          line-height: 60px;
          width: 140px;
          cursor: pointer;
          span {
            
          }
        }
      }
    }
  }
  .imgLogoBox {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 225px;
    z-index: 2;
  }
  .searchBox {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 352px;
    z-index: 2;
    width: 1200px;
    .tips {
      padding-left: 140px;
      font-size: 16px;
      line-height: 48px;
      color: #ffffff;
    }
  }
  .copyright {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    color: #ffffff;
    font-size: 13px;
  }
   .mask{
    height: 100%;
    width: 100%;
    background-color: rgba($color: #000000, $alpha: 0.4);
    position: absolute;
    z-index: 2;
    
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  } 
}
</style>
<style>
#search .el-select .el-input {
  width: 130px;
}
#search .input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>


