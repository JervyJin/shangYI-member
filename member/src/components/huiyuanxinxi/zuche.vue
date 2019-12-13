<template>
  <div>
    <!-- 头部 -->
    <heade title="会员注册"></heade>
    <!-- banner -->
    <div class="banner">
      <van-cell-group>
        <van-field
          v-model="userInfo.Phone"
          type="number"
          clearable
          label="手机号码"
          placeholder="请输入手机号码"
        />
        <van-field
          v-model="userInfo.VerificationCode"
          center
          clearable
          label="短信验证码"
          placeholder="请输入短信验证码"
        >
          <van-button
            :disabled="send"
            type="info"
            slot="button"
            size="small"
            plain
            @click="sendSms"
          >{{btnText}}</van-button>
        </van-field>
        <div class="van-cell van-field drop-container">
          <label>性别</label>
          <van-dropdown-menu>
            <van-dropdown-item v-model="userInfo.Sex" :options="sexLis" />
            <i class="iconfont iconxiangshang-copy"></i>
          </van-dropdown-menu>
        </div>
        <div class="van-cell van-field drop-container"> 
          <label>生日类型</label>
          <van-dropdown-menu>
            <van-dropdown-item v-model="userInfo.BirthdayType" :options="birthdayTypeLis" />
            <i class="iconfont iconxiangshang-copy"></i>
          </van-dropdown-menu>
        </div>
        <van-field v-model="Birthday" disabled clearable label="生日" is-link @click="showBirthday" />
        <div class="van-cell van-field">
         
            <van-checkbox name="agree" v-model="checked">我已查看并接受<span class="agreement" v-on:click.stop="agreementDetail">《会员注册协议》</span></van-checkbox>
      
        </div>
      </van-cell-group>
      <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="new Date('1970/01/01')"
          :max-date="new Date()"
          @confirm="handleConfirm"
          @cancel="handleCancel"
        />
      </van-popup>
      <!-- 注册奖励 -->
      <div class="list">
        <p class="zc-label">
          <!-- <img src="../../assets/images/neirong.png" alt /> -->
          <span class="title">注册奖励</span>
        </p>
        <p class="son" v-if="jlInfo.Awardintegral && jlInfo.Awardintegral.Awardintegral!==0">
          <i class="iconfont iconjifen"></i>
          <span class="reward_name">奖励积分：</span>
          <span class="title">{{jlInfo.Awardintegral.Awardintegral}}</span>
        </p>
        <p class="son" v-if="jlInfo.Awardintegral && jlInfo.Awardintegral.AwardGrowth!=0">
          <i class="iconfont iconchengchangzhi"></i>
          <span class="reward_name">奖励成长值：</span>
          <span class="title">{{jlInfo.Awardintegral.AwardGrowth}}</span>
        </p>
        <p class="son" v-if="this.jlInfo.Awardintegral && jlInfo.Awardintegral.AwardRechargeAmoun!= 0">
          <i class="iconfont iconjine"></i>
          <span class="reward_name">奖励金额：</span>
          <span class="title">{{jlInfo.Awardintegral.AwardRechargeAmoun}}</span>
        </p>
        <p class="son" v-if="jlInfo.Awardintegral && jlInfo.Awardintegral.AwardHongBaoAmount!=0">
          <i class="iconfont iconhongbao"></i>
          <span class="reward_name">奖励红包：</span>
          <span class="title">{{hongbaoNum}}</span>
        </p>
        <div class="son" v-if="this.jlInfo.MarketingCouponAwardList!=null && this.jlInfo.MarketingCouponAwardList.length> 0 ">
          <i class="iconfont iconquan"></i>
          <span class="reward_name">奖励券：</span>
          <span v-for="(item, index) in jlInfo.MarketingCouponAwardList" :key="index">
            <span class="title">{{item.CouponName}}*{{item.Num}};</span>
          </span>
        </div>
        <p class="son" v-if="this.jlInfo.MarketingComboAwardList!=null && this.jlInfo.MarketingComboAwardList.length> 0 ">
          <i class="iconfont icontaocanhuodong"></i>
          <span class="reward_name">奖励套餐：</span>
          <span v-for="(item, index) in jlInfo.MarketingComboAwardList" :key="index">
            <span class="title">{{item.ComboName}}*{{item.Num}}</span>
          </span>
        </p>
        <div class="tip">活动以实际到账为准</div>
      </div>
     
        <van-button class="button submit_btn" type="info" @click="save">提交</van-button>
    </div>
  </div>
</template>

<script>
import heade from "../common/heade";
import dayjs from "dayjs";

export default {
  components: {
    heade
  },
  data() {
    // debugger
    return {
      userInfo: {
        Sex: 0,
        BirthdayType: 0,
        Birthday: "",
        Phone: "",
        VerificationCode: "",
        ReferrerId:this.$router.currentRoute.query.refer,
        WXTempKey: this.$store.state.WXTempKey
          ? this.$store.state.WXTempKey
          : ""
      },
      sexLis: [{ text: "男", value: 0 }, { text: "女", value: 1 }],
      birthdayTypeLis: [{ text: "农历", value: 0 }, { text: "公历", value: 1 }],
      show: false,
      currentDate: new Date(),
      checked: true,
      jlInfo: {
        Awardintegral: {}
      },
      btnText: "发送验证码",
      send: false,
      Birthday: "",
      suijiMin:0,
      suijiMax:0
    };
  },
  methods: {
    showBirthday() {
      this.show = true;
    },
    handleConfirm(val) {
      this.userInfo.Birthday = val;
      this.Birthday = dayjs(val).format("YYYY-MM-DD");
      this.userInfo.Birthday = this.Birthday + " " + "23:59:00";
      this.show = false;
    },
    handleCancel() {
      this.userInfo.Birthday = "";
      this.show = false;
    },
    getJl() {
      this.http
        .get("/api/services/app/CRMMemberService/GetRegAward")
        .then(res => {
          console.log(res);
          if (res.Result.Code === 0) {
            this.jlInfo = res.Result.Data;
            if(res.Result.Data.Awardintegral!=null){
              this.suijiMin = res.Result.Data.Awardintegral.RandomMinAmount;
              this.suijiMax = res.Result.Data.Awardintegral.RandomMaxAmount;
            }
            
            
          }
        });
    },
    sendSms() {
      if (!this.userInfo.Phone) {
        this.$toast({
          message: "请填写手机号!!",
          duration: 2000
        });
        return;
      }else if (!/^1[3456789]\d{9}$/.test(this.userInfo.Phone)) {
        this.$toast({
          message: "手机号格式不正确!!",
          duration: 2000
        });
        return;
      }
      

      this.http
        .post("/api/services/app/SMS/Send", {
          Phone: this.userInfo.Phone
        })
        .then(res => {
          if (res.Result.Code === 0) {
            this.$toast({
              message: res.Result.Message,
              duration: 2000
            });
            this.send = true;
            let t = 60;
            let timer = setInterval(() => {
              t--;
              this.btnText = `${t}s`;
              if (t === 0) {
                clearInterval(timer);
                this.btnText = "发送验证码";
                this.send = false;
              }
            }, 1000);
          }
        });
    },
    save() {
      if (!this.userInfo.Phone) {
        this.$toast({
          message: "请填写手机号!!",
          duration: 2000
        });
        return;
      }
      if (!this.userInfo.VerificationCode) {
        this.$toast({
          message: "请填写验证码!!",
          duration: 2000
        });
        return;
      }
      if (!this.userInfo.Birthday) {
        this.$toast({
          message: "请填写生日",
          duration: 2000
        });
        return;
      }
      if (!this.checked) {
        this.$toast({
          message: "请接受会员注册协议",
          duration: 2000
        });
        return;
      }
      this.http
        .post("/api/services/app/CRMMemberService/AddCRMMember", this.userInfo)
        .then(res => {
          if (res.Result.Code === 0) {
            this.$toast({
              message: "注册成功!!",
              duration: 2000
            });
            this.$store.commit("setToken", res.Result.Data);
            setTimeout(() => {
              this.$router.push({
                name: "index"
              });
            }, 2000);
          }
        });
    },
    agreementDetail(){
      this.$router.push({ name: "agreement" });
    }
  },
  created() {
    this.getJl();
  },
  computed: {
    hongbaoNum(){
      if(this.jlInfo.Awardintegral!=null &&this.jlInfo.Awardintegral.AwardAmountType===0 ){
        return this.jlInfo.Awardintegral.AwardHongBaoAmount
      }else{
        // return `${this.suijiMin}-${this.suijiMax}`
        return this.suijiMin +'-'+ this.suijiMax
      }
    }
  },
};
</script>

<style scoped lang="scss" type="text/scss">
// .banner {
//   width: 100%;
//   padding: 0.12rem 0.4rem;
// }

/* list */
.agreement{
    color: #5BA1E7;
    text-decoration: underline;
  }
.list {
  width: calc(100% - .8rem);
  margin: 0.12rem auto 0;
  padding: 0.3rem;
  border-radius: 0.1rem;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  font-size: 0.25rem;
  color: #000000;
}
.list img {
  width: 0.3rem;
  height: 0.3rem;
  margin-right: 0.11rem;
}
.list .text {
  margin-left: 0.37rem;
  color: #333333;
}
.list .son {
  // margin-left: 0.4rem;
  line-height: 0.6rem;
  .reward_name{
    width: 2rem;
  }
  .iconfont{
    font-size: 0.3rem;
    margin-right: 0.28rem;
    &.iconjifen{
      color: #FC997E;
    }
    &.iconchengchangzhi{
      color: #4DBFC3;
    }
    &.iconjine{
      color: #FCC27E;
    }
    &.iconhongbao{
      color: #FC7E7E;
    }
    &.iconquan{
      color: #4D97C3;
    }
    &.icontaocanhuodong{
      color: #FC7E7E;
    }
  }
}
.son span {
  display: inline-block;
}
.son .title {
  // display: inline-block;
  // width: 3.63rem;
  color: #3c6efd;
}
.tip {
  text-align: center;
  margin-top: 0.43rem;
  color: #c0bfbf;
}
.button {
  width: 100%;
  border-radius: 0.1rem;
  margin-top: 0.3rem;
}
.drop-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  /deep/.van-dropdown-menu.van-hairline--top-bottom {
    height: auto !important;
    display: flex;
    align-items: center;
  }
}
.zc-label {
  display: flex;
  align-items: center;
  margin-bottom: 0.2rem;
  font-weight: bold;
}
  .van-button--plain {
    border-radius: 4px;
  }
  .van-cell{
    font-size: 0.24rem;
    font-weight: 600;
    border-radius: 0.1rem;
  }
  .van-cell-group{
      border-radius: 0.1rem;
      box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
      width: calc(100% - .8rem);
      margin: .12rem auto 0;
    }
  .van-hairline--top-bottom::after{
    border-width: 0;
  }


/deep/ {
  .van-cell {
    font-size: 0.24rem;
    font-weight: 600;
    border-radius: 0.1rem;
    padding: 0.2rem 0.32rem;
    line-height: 0.48rem;
  }

  .van-cell-group {
    border-radius: 0.1rem;
    // box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  }
  .van-field__label {
    width: 1.8rem;
    font-weight: normal;
  }
  .drop-container{
    font-weight: normal;
  }
  .van-field__body{
    input{
      color: #333;
      font-weight: normal;
      text-align: right;
      &::placeholder{
        color: #999;
        font-size: 0.24rem;
        font-weight: normal;
      }
    }
  }
  .van-hairline--top-bottom::after {
    border-width: 0;
  }
  .van-dropdown-menu__title {
    position: relative;
    box-sizing: border-box;
    max-width: 100%;
    padding: 0 0.08rem;
    color: #323233;
    font-size: 0.25rem;
}
  .van-dropdown-menu__title::after {
    display: none;
    right: -0.1rem;
    top: 0.15rem;
    border: 0.06rem solid;
    border-color: transparent transparent currentColor currentColor;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  .van-button--small {
    min-width: 1.2rem;
    height: 0.6rem;
    padding: 0 0.16;
    font-size: 0.12rem;
    line-height: 0.28rem;
    padding: 0 .24rem;
    font-weight: normal;
    color: #5BA1E7;
}
.van-checkbox__icon{
  font-size: 0.4rem;
}
.van-checkbox__label{
  line-height: 0.48rem;
  font-weight: normal;
}
.van-button--normal{
  padding: 0 0.3rem;
}
.van-button{font-size: 0.28rem;}

  .van-cell__left-icon, .van-cell__right-icon {
    min-width: 1em;
    height: 0.24rem;
    font-size: 0.32rem;
    line-height: 0.48rem;
}
  .iconxiangshang-copy{
    color: #999;
    font-weight: normal;
    font-size: 0.32rem;
  }
}
.van-dropdown-menu__title .van-ellipsis{
  font-weight: normal;
}
.submit_btn{
    height: 0.74rem;
    line-height: 0.74rem;
    border-radius: 0.1rem;
    font-size: 0.3rem;
    width: calc(100% - .8rem);
    margin-left: 0.4rem;
    opacity: 1;
    background: rgba(91,161,231,1);
    box-shadow: 0px 2px 6px 0px rgba(3,0,6,0.1);
    border: none;
  }

  /deep/.van-checkbox{
    display: flex;
    align-items: center;
  }

  /deep/.van-checkbox__icon{
    display: flex;
    align-items: center;
    .van-icon{
      width: .2rem !important;
      height: 0.2rem !important;
      font-size: 0.2rem;
      color: #F6F3F7;
      background: #F6F3F7;
    }
  }
</style>
