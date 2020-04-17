<template>
  <div id="login">
    <div class="loginBack">
      <el-form ref="form" :model="form" :rules="rules" label-width="85px">
        <div class="flexLayoutRow">
          <img :src="userIcon" class="iconStyle" />
          <el-form-item label="用户名：" prop="name" >
            <el-input v-model="form.name" placeholder="请输入电话/身份证/卡号/邮箱"  clearable></el-input>
          </el-form-item>
        </div>
        <div class="flexLayoutRow">
          <img :src="userIcon" class="iconStyle" />
          <el-form-item label="密　码：" prop="password">
            <el-input placeholder="请输入密码" @keyup.enter.native="landingBtn" type="password" v-model="form.password" clearable></el-input>
          </el-form-item>
        </div>
        <!--<div class="flexLayoutRow">
                    <img :src="userIcon" class="iconStyle">
                    <el-form-item label="分中心：" prop="center">
                        <el-select v-model="form.center" placeholder="请选择活动区域" clearable>
                            <el-option label="重庆市馆分中心" value="重庆市馆分中心"></el-option>
                            <el-option label="渝中区馆分中心" value="渝中区馆分中心"></el-option>
                            <el-option label="渝北区馆分中心" value="渝北区馆分中心"></el-option>
                            <el-option label="江北区馆分中心" value="江北区馆分中心"></el-option>
                        </el-select>
                    </el-form-item>
        </div>-->
        <el-form-item label-width="120px">
          <el-button type="primary" @click="landingBtn">登 录</el-button>
          <el-button type="info" @click="cancelBtn('form')">取 消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="pointOut">
      <p class="pointTitle">登陆提示</p>
      <p class="pointFont">• 夔牛图书馆提供读者个性化的服务空间，默认已经开通读者空间服务，请输入读者证号和密码进入系统。</p>
      <p class="pointFont">• 初始密码为身份证后6位。</p>
      <p class="pointFont">• 读者可登录个人空间修改登录密码。如忘记密码请联系管理员</p>
    </div>
  </div>
</template>

<script>
import { loginInt } from "@/request/api/login";

export default {
  data() {
    return {
      form: {
        name: "", //用户名
        password: "", //密码
        center: "" //分中心
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        center: [{ required: true, message: "请选择分中心", trigger: "change" }]
      },
      userIcon: require("../../common/img/readerIcon/BasicInfo.png")
    };
  },
  methods: {
    landingBtn() {
      loginInt.loginFun(this.form.name, this.form.password).then(res => {
        console.log("登录后返回的信息", res);
        if (res.data.state == true) {
          var userInfo = JSON.stringify(res.data.row.nowLoginUser);
          const data = res.data.row;
          var authorization = res.data.row.authorization;
          sessionStorage.setItem("userInfo", userInfo);
          sessionStorage.setItem("authorization", authorization);
          this.$store.commit("SET_TOKEN", data.authorization);
          this.$store.commit("SET_NAME", data.nowLoginUser.name);
          this.messageFix.success("登录成功");
          this.$router.push("/BasicInfo");
        } else {
          this.messageFix.error(res.data.msg)
          console.log(res.data.msg);
        }
      });
    },
    //取消按钮
    cancelBtn(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
#login {
  margin: 0px auto;
  width: 815px;
  
}
.loginBack {
  background-image: url("../../common/img/login/login.png");
  width: 475px;
  height: 220px;
  padding: 90px 170px;
}
.iconStyle {
  width: 20px;
  height: 20px;
  margin-top: 10px;
}
.pointOut {
  padding: 20px 20px;
}
.pointTitle {
  color: #12b494;
  margin-bottom: 20px;
  font-weight: bold;
}
.pointFont {
  color: #2a2a2a;
  margin-bottom: 20px;
  margin-left: 20px;
  font-size: 15px;
}
</style>

