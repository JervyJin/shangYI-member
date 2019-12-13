<template>
  <div>
    <!--头部-->
    <heade title="修改绑定手机"></heade>
    <!--banner-->
    <div class="banner">
      <van-cell-group  style="border-radius:0.1rem;">
        <van-field v-model="phoneNum" label="新手机号码" placeholder="请输入新手机号码" class="phoneNum"></van-field>
        <van-field v-model="sms" center clearable label="验证码" placeholder="请输入验证码" class="sms">
          <van-button
            slot="button"
            size="small"
            type="primary"
            @click="codeBtnAction"
            class="yzm"
            :class="{hwDisables:captchaDisable}"
            v-bind:disabled="captchaDisable"
          >{{captchaLabel}}</van-button>
        </van-field>
        <!-- <van-field v-model="Oldsms" label="原密码" placeholder="请输入原密码" class="Oldsms"></van-field> -->
      </van-cell-group>
      <van-button
        type="primary"
        size="large"
        color="skyblue"
        class="btn"
        @click="success"
        style="border:none;"
      >完成</van-button>
    </div>
    <!--   <div v-if="error" class="invalid">{{error}}</div>-->
  </div>
</template>

<script>
import heade from "../common/heade";

export default {
  components: {
    heade
  },
  data: function() {
    return {
      phoneNum: "",
      sms: "",
      // Oldsms: "",
      seconds: 30,
      captchaLabel: "发送验证码",
      captchaDisable: false
    };
  },

  methods: {
    success: function() {
      if (!this.phoneNum) {
        this.$toast({
          message: "请填写新手机号码",
          duration: 2000
        });
        return;
      } else if (!/^1[3456789]\d{9}$/.test(this.phoneNum)) {
        this.$toast("手机号格式不正确");
        return;
      }
      if (!this.sms) {
        this.$toast({
          message: "请填写验证码",
          duration: 2000
        });
        return;
      }
      // if (!this.Oldsms) {
      //   this.$toast({
      //     message: "请填写旧验证码",
      //     duration: 2000
      //   });
      //   return;
      // }

      this.http
        .put("/api/services/app/CRMMemberService/UpdateCRMMemberPhone", {
          Phone: this.phoneNum,
          VerificationCode: this.sms,
          VerificationCodeOld: this.$router.currentRoute.query.code
        })
        .then(res => {
          console.log(res);
          if (res.Result.Code === 0) {
            this.$toast({
              message: "修改成功",
              duration: 2000
            });
            setTimeout(() => {
              this.$router.push({
                name: "persion"
              });
            }, 2000);
          }
        });
    },

    codeBtnAction() {
      if (!this.phoneNum) {
        this.$toast({
          message: "请填写号码",
          duration: 2000
        });
        return;
      } else if (!/^1[3456789]\d{9}$/.test(this.phoneNum)) {
        this.$toast("手机号格式不正确");
        return;
      }
      this.http
        .post("/api/services/app/SMS/Send", {
          Phone: this.phoneNum
        })
        .then(res => {
          if(res.Result.Code == 0){
            this.$toast({
              message: res.Result.Message,
              duration: 2000
            });
          }
        });
    }
  }
};
//-----
</script>
<style scoped lang="scss">
.banner {
  width: 100%;
  padding: 0.12rem 0.3rem;
}
.btn {
  border-radius: 5px;
  margin-top: 30px;
  background: #5ba1e7;
}
.yzm {
  background-color: white;
  color: skyblue;
  border: 1px solid skyblue;
  border-radius: 4px;
}
.van-button--large{
  height: 45px;
  line-height: 44px;
  border-radius: 0.1rem;
}
/deep/{
    .van-field__control {
    font-size: 0.2rem;
    height: 0.4rem;
    font-family: unset;
  }
  .van-cell__title.van-field__label {
    font-size: 0.2rem;
    line-height: 2;
  }
  .van-field__label{
    width: 1.8rem;
  }
  .van-cell {
    padding: 0.2rem 0.32rem;
    margin-top: 0.11rem;
    border-radius: 0.1rem;
    font-size: 0.28rem;
    line-height: 0.48rem;
    background-color: #fff;
    background: rgba(255,255,255,1);
    // box-shadow: 0px 2px 6px 0px rgba(3,0,6,0.1);
  }
.van-button--small {
    min-width: 0.12rem;
    height: 0.6rem;
    padding: 0 0.16rem;
    font-size: 0.24rem;
    line-height: 0.56rem;
}
.van-button--large{
  height: 0.9rem;
  line-height: 0.88rem;
  border-radius: 0.1rem;
}
.van-button{font-size: 0.28rem;}
}
</style>