<template>
  <div>
    <!--头部-->
    <heade title="校验绑定手机"></heade>
    <!--banner-->
    <div class="banner">
      <van-cell-group style="border-radius:0.1rem;">
        <van-field v-model="phone" disabled label="手机号码" class="phoneNum"></van-field>
        <van-field v-model="sms" center clearable label="验证码" placeholder="请输入验证码" class="sms">
          <van-button
            slot="button"
            size="small"
            type="info"
            @click="codeBtnAction"
            class="yzm"
            :class="{hwDisables:captchaDisable}"
            v-bind:disabled="captchaDisable"
          >{{captchaLabel}}</van-button>
        </van-field>
      </van-cell-group>
      <van-button type="info" size="large" color="skyblue" class="btn" @click="register">下一步</van-button>
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
      phone: "",
      sms: "",
      seconds: 30,
      captchaLabel: "发送验证码",
      captchaDisable: false
    };
  },

  methods: {
    getPhone() {
      this.http
        .get("/api/services/app/CRMMemberService/GetMyInfo", {})
        .then(res => {
          console.log(res);
          this.phone = res.Result.Data.Phone;
        });
    },
    // 校验验证码
    codeBtnAction() {
      this.http
        .post("/api/services/app/CRMMemberService/CRMMemberSend", {})
        .then(res => {
          console.log(res);
          if (res.Result.Code == 0) {
            this.$toast({
              message: res.Result.Message,
              duration: 2000
            });
          }
        });
    },
    /**
     * 下一步
     * */
    register() {
      if (!this.sms) {
        this.$toast({
          message: "请填写验证码",
          duration: 2000
        });
        return;
      }

      this.http
        .put("/api/services/app/CRMMemberService/UpdateCRMMemberPhoneCheck", {
          VerificationCode: this.sms
        })
        .then(res => {
          console.log(res);
          if (res.Result.Code === 0) {
            this.$toast({
              message: "校验成功",
              duration: 2000
            });
            setTimeout(() => {
              this.$router.push({
                path: "newPhone?code=" + this.sms
              });
            }, 2000);
          }
        });
    }
  },
  created() {
    this.getPhone();
  }
};
//-----
</script>
<style scoped lang="scss">
.banner {
  width: 100%;
  padding: 0.12rem 0.3rem;
}
.phoneNum {
  color: #333333;
}
.sms {
  font-size: 0.24rem;
}
.yzm {
  background-color: white;
  color: #5ba1e7;
  border-color: #5ba1e7;
  border-radius: 4px;
}
// line
.van-cell:not(:last-child)::after {
  left: 1.38rem;
  width: 5.13rem;
  height: 0.01rem;
  opacity: 0.48;
  background-colorrgba(199, 23, 23, 0.48)
  background: rgba(199, 23, 23, 0.48);
  color: red;
}

/deep/ {
  .van-cell.van-field {
    border-radius: 0.1rem;
    // box-shadow: 1px 1px 1.8px 0px #ccc;
  }

  .van-field__control {
    font-size: 0.2rem;
    height: 0.4rem;
    font-family: unset;
  }

  .van-cell__title.van-field__label {
    font-size: 0.2rem;
    line-height: 2;
  }

  .van-cell {
    padding: 0.2rem 0.32rem;
    overflow: hidden;
    color: #323233;
    font-size: 0.14rem;
    line-height: 0.24rem;
    background-color: #fff;
  }
  .van-field__label {
    width: 1.6rem;
  }
  .van-button--small {
    min-width: 0.12rem;
    height: 0.6rem;
    padding: 0 0.16rem;
    font-size: 0.24rem;
    line-height: 0.56rem;
  }
  .van-button--large {
    height: 0.9rem;
    line-height: 0.88rem;
    border-radius: 0.1rem;
    font-size: 0.3rem;
    margin-top: 0.3rem;
  }
}
</style>
