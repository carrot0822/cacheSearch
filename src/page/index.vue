
<template>
  <div id="index">
    <section class="header">
      <div class="headImg">
        <div class="userInfo">
          <p class="pos">
            <router-link v-if="!userName" tag="span" to="/login">{{$t('navbar.login')}}</router-link>
            <span class="userName">{{userName}}</span>
            <span v-if="userName" @click="cancel">{{$t('navbar.logOut')}}</span>
            <router-link tag="span" to="/search">{{$t('navbar.back')}}</router-link>
            <span @click="handleSetLanguage('zh')">中文</span>
            <span @click="handleSetLanguage('en')">English</span>
          </p>
        </div>
      </div>
      <nav>
        <ul class="navCtx">
          <div></div>
          <li>
            <router-link tag="span" to="/search">{{$t('navbar.dashboard')}}</router-link>
          </li>
          <li>
            <span class="father">
              {{$t('navbar.searchBook')}}
              <div class="son">
                <router-link tag="span" to="/esaySearch">{{$t('navbar.easySearch')}}</router-link>
                <router-link tag="span" to="/hardSearch">{{$t('navbar.hardSearch')}}</router-link>
              </div>
            </span>
          </li>
          <li>
            <span class="father">
              {{$t('navbar.borrowMan')}}
              <div class="son">
                <router-link tag="span" to="/LendingRank"></router-link>
                <router-link tag="span" to="/NewBooksBulletins"></router-link>
              </div>
            </span>
          </li>
          <li>
            <router-link tag="span" to="/ReaderNavigation">{{$t('navbar.reader')}}</router-link>
          </li>
          <!-- <li>
            <router-link tag="span" to="/login">读者登录</router-link>
          </li>-->
          <li>
            <router-link tag="span" to="/classify">{{$t('navbar.classy')}}</router-link>
          </li>
        </ul>
      </nav>
    </section>
    <section class="content">
      <div class="centerBox">
        <router-view></router-view>
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
    handleSetLanguage(lang) {
      this.$i18n.locale = lang;
      sessionStorage.setItem("language", lang);
      this.$message({
        message: "switch language success",
        type: "success"
      });
    },
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
        bottom: 0;
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
      padding-top: 50px;
      margin-bottom: 54px;
    }
  }

  .copyright {
    padding-bottom: 48px;
    text-align: center;
    color: #ffffff;
    font-size: 13px;
    color: #2c2c2c;
  }
}
</style>


