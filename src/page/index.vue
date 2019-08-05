<template>
  <div id="index">
    <section class="header">
      <div class="headImg">
        <div class="userInfo">
          <p class="pos">
            <router-link v-if="!userName" tag="span" to="/login">读者登录</router-link>
            <span class="userName">{{userName}}</span>
            <span v-if="userName" @click="cancel">退出登录</span>
            <router-link tag="span" to="/search">返回</router-link>
          </p>
        </div>
      </div>
      <nav>
        <ul class="navCtx">
          <div></div>
          <li>
            <router-link tag="span" to="/search">首页</router-link>
          </li>
          <li>
            <span class="father">
              书籍检索
              <div class="son">
                <router-link tag="span" to="/esaySearch">简单检索</router-link>
                <router-link tag="span" to="/hardSearch">高级检索</router-link>
              </div>
            </span>
          </li>
          <li>
            <span class="father">
              借阅管理
              <div class="son">
                <router-link tag="span" to="/LendingRank">借阅排行</router-link>
                <router-link tag="span" to="/NewBooksBulletins">新书快递</router-link>
              </div>
            </span>
          </li>
          <li>
            <router-link tag="span" to="/ReaderNavigation">读者中心</router-link>
          </li>
          <!-- <li>
            <router-link tag="span" to="/login">读者登录</router-link>
          </li>-->
          <li>
            <router-link tag="span" to="/classify">分类导航</router-link>
          </li>
        </ul>
      </nav>
    </section>
    <section class="content">
      <div class="centerBox">
        <div class="scrollBox">
          <el-scrollbar style="height:100%">
            <div style="width:100%">
              <router-view></router-view>
            </div>
            
          </el-scrollbar>
        </div>
      </div>
    </section>
    <div class="copyright">版权所有 copyright © www.kuiniu.com 智慧图书馆</div>
  </div>
</template>

<script>
import { getInfo } from "../request/api/login";
export default {
  data() {
    return {};
  },
  methods: {
    cancel() {
      this.$store.dispatch("logout");
      if (this.$route.meta.permission) {
        this.$router.push("/search");
      }

      this.$message.success("退出成功");
    }
  },
  computed: {
    userName() {
      return this.$store.state.name;
    },
    token() {
      return this.$store.token;
    }
  },
  created() {
    console.log(this.$route);
  }
};
</script>

<style lang="scss" scoped>
@import "../common/scss/variables.scss";
#index {
  position: relative;
  .header {
    .userInfo {
      width: 1000px;
      margin: 0 auto;
      height: 160px;
      position: relative;
      .pos {
        position: absolute;
        bottom: 20px;
        right: 0;
        span {
          display: inline-block;
          cursor: pointer;
          padding: 0 4px;
        }
      }
    }
    .headImg {
      width: 100%;
      background-image: url("../common/img/head.jpg");
      height: 160px;
    }
    nav {
      width: 100%;
      height: 50px;
      background-color: $green;
      .navCtx {
        width: 1200px;
        position: relative;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
        li {
          width: 20%;
          height: 50px;
          line-height: 50px;

          color: #ffffff;
          span {
            display: inline-block;
            cursor: pointer;
            width: 140px;
            height: 50px;
            text-align: center;
            position: relative;

            &:hover {
              background-color: $highGreen;
            }
          }
          .father {
            &:hover {
              .son {
                display: block;
              }
            }
            .son {
              position: absolute;
              z-index: 10;
              width: 140px;
              display: none;
              background-color: $highGreen;
              span {
                &:hover {
                  color: #007f66;
                }
              }
            }
          }
        }
      }
    }
  }
  .content {
    .centerBox {
      width: 1200px;
      
      margin: 0 auto;
      padding-top: 40px;
      margin-bottom: 50px;
      .scrollBox{
        height: calc(100vh - 380px);
      }
    }
  }

  .copyright {
    padding-bottom: 50px;
    text-align: center;
    color: #ffffff;
    font-size: 13px;
    color: #2c2c2c;
  }
}
</style>

<style>
.scrollBox .el-scrollbar__wrap {
    overflow-x: hidden;
}
.scrollBox .is-horizontal .el-scrollbar__thumb{
  width: 0!important;
}
</style>

