<template>
  <div class="content">
    <!-- <input type="text" placeholder="请输入账号" v-model="phone">
    <input type="password" placeholder="请输入密码" v-model="password">-->
    <div style="background: #ffffff;">
      <div class="landing">
        <img src="../../../assets/img/phone.png" alt />
        <input type="text" placeholder=" 请输入账号" v-model="phone" />
      </div>
      <van-divider :style="{margin:'4px 0'}"></van-divider>
      <div class="landing">
        <img src="../../../assets/img/pass.png" alt />
        <input type="password" placeholder=" 请输入验证码" v-model="password" />
        <span class="button" @click="send">获取验证码</span>
        <!-- <van-button plain type="info"  @click="send">朴素按钮</van-button> -->
      </div>

      <!-- <van-row type="flex" justify="space-between">
  <van-col span="10"><img src="../../../assets/img/pass.png" alt />
        <input type="password" placeholder=" 请输入验证码" v-model="password" /></van-col>
  <van-col span="6"><span class="button" @click="send">获取验证码</span></van-col>
</van-row> -->
    </div>
    <div class="bottom">
      <div class="login" @click="login">登录</div>
      <div class="problem">
        <router-link tag="span" :to="{ path: 'zuche' }">注册会员</router-link>
        <!-- <router-link tag="span" to="/zuche">找回密码</router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { Toast,Notify } from 'vant';
export default {
  data() {
    return {
      phone: "",
      password: ""
    };
  },
  methods: {
    send() {
      if(!/^1[3456789]\d{9}$/.test(this.phone)){
        this.$toasted.error("手机号格式不正确", { icon: "error" }).goAway(2000);
        return;
      }
      // 点击发送请求数据 拿到密码渲染到密码框
      this.http
        .post("/api/services/app/SMS/Send", {
          Phone: this.phone
        })
        .then(res => {
          //  console.log(res);
          if(res.Result.Code == 0){
            Toast({
              mask: false,
              message: '发送成功',
              position: 'bottom'
            });
          }
        });
    },
    // 登陆方法
    async login() {
      if (!this.phone || !this.password) {
        // this.$toasted.error("请输入完善信息", { icon: "error" }).goAway(2000);
        Notify({ type: 'danger', message: "请输入完善信息", duration: 1500 })
        return;
      }
      
      try {
        // await等待一个异步返回的结果 如果没有await 会报user is undefined 获取不到
        let res = await this.http.post("/api/TokenAuth/MemberAuthenticate", {
          Phone: this.phone,
          PhoneCode: this.password,
          WXTempKey: this.$store.state.WXTempKey
            ? this.$store.state.WXTempKey
            : ""
        });
        console.log(res);
        if (res.Result) {
          // debugger
          // console.log(res);
          // localStorage.setItem("token","res.Result.AccessToken");
          this.$store.commit("setToken", res.Result.AccessToken);
          Toast({
            mask: false,
            message: '登录成功',
            position: 'bottom'
          });
          this.$router.replace({ name: "index" });
        } else {
          // this.$toasted
          //   .error(res.Error.Message, { icon: "error" })
          //   .goAway(2000);
        }
      } catch (error) {
        // this.$toasted.error(error.message, { icon: "error" }).goAway(2000);
      }
    }
  }
};
</script>

<style scoped>
.content {
  width: 100%;
}
.bottom {
  padding-left: 0.6rem;
  padding-right: 0.6rem;
}
.landing {
  width: 100%;
  padding: 0 0.4rem;
}

.landing > input {
  font-size: 0.28rem;
  height: 0.8rem;
}
.landing img {
  width: 0.4rem;
  height: 0.4rem;
  margin-right: 0.28rem;
}

.login {
  width: 100%;
  height: 0.8rem;
  border-radius: 0.2rem;
  background: #5ba1e7;
  margin-top: 1.23rem;
  text-align: center;
  line-height: 0.8rem;
  font-size: 0.3rem;
  color: #ffffff;
  margin-bottom: 0.2rem;
}
.problem {
  width: 100%;
  height: 0.44rem;
  display: flex;
  justify-content: space-between;
}
.problem span {
  width: 1.2rem;
  height: 0.44rem;
  line-height: 0.44rem;
  text-align: center;
  font-size: 0.24rem;
  color: #5ba1e7;
}
.button {
  padding: 0.18rem 0.34rem;
  border: 1px solid #5ba1e7;
  vertical-align: middle;
  color: #5ba1e7;
  border-radius: 0.3rem;
    float: right;
}
</style>