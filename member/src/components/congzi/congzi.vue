<template>
  <div>
    <!-- 头部 -->
    <heade title="充值有礼"></heade>
    <!-- banner -->
    <div class="banner">
      <div class="congzi">
        <h3>请选择充值金额</h3>
        <div class="box">
          <!-- <button
            v-for="(item,index) in czidata"
            :key="item.index"
            @click="changeValue(item.MarketingId,item.MarketingLevel,index)"
            :class="{on:currentIndex===index}"
          >{{item.MarketingLevel}}元</button>-->

          <span
            class="button"
            v-for="(item,index) in czidata"
            :key="item.index"
            @click="changeValue(item.MarketingId,item.MarketingLevel,index)"
            :class="{on:currentIndex===index}"
          >{{item.MarketingLevel}}元</span>
        </div>
      </div>

      <div class="list">
        <p>
          <img src="../../assets/images/neirong.png" alt />
          <span class="title">充值奖励</span>
        </p>

        <p class="son" v-if="givemoney&&givemoney!=0">
          <img src="../../assets/images/money.png" alt />
          <span>奖励金额：{{givemoney}}</span>
          <router-link to="/huiyuanxinxi"></router-link>
        </p>
        <p class="son" v-if="giveredpackage&&givemoney!=0 &&givemoney!='0-0'">
          <img src="../../assets/images/hongbao.png" alt />
          <span>奖励红包：{{giveredpackage}}</span>
          <router-link to="/huiyuanxinxi"></router-link>
        </p>
        <p class="son" v-if="givecoupon">
          <img src="../../assets/images/quan.png" alt />
          <span>奖励券：{{givecoupon}}</span>
          <router-link to="/huiyuanxinxi"></router-link>
        </p>
        <p class="son" v-if="givepackage">
          <img src="../../assets/images/taocan.png" alt />
          <span>奖励套餐：{{givepackage}}</span>
          <router-link to="/huiyuanxinxi"></router-link>
        </p>
      </div>
      <van-button
        type="button"
        class="btn"
        :disabled="dis"
        size="large"
        @click="charge"
        :class="{img:currentIndex!=null}"
      >充值</van-button>
    </div>

    <!-- 底部 -->
    <CommonBottom></CommonBottom>
  </div>
</template>
<script>
import Vue from "vue";
import heade from "../common/heade";
import CommonBottom from "../common/CommonBottom";
import { debuglog } from "util";
import wechatCommon from "@/wechat";
export default {
  components: {
    heade,
    CommonBottom
  },
  data() {
    return {
      czidata: [],
      uuid: "",
      Amount: "",
      changeLeftBackground: 0,
      givemoney: "",
      giveredpackage: "",
      givecoupon: "",
      givepackage: "",
      currentIndex: null,
      dis: true
    };
  },

  methods: {
    back() {
      this.$router.go(-1);
    },
    // 点击金额展示奖励列表

    changeValue(id, Amount, index, e) {
      this.dis = false;
      // debugger
      this.currentIndex = index;

      this.uuid = id;
      this.Amount = Amount;
      this.CongziList();
    },

    // 查询充值金额档次
    Chaxun() {
      this.http
        .get("/api/services/app/MemberAmountService/GetRechargeGrade", {
          params: {}
        })
        .then(res => {
          console.log(res);
          this.czidata = res.Result.Data;
        });
    },

    // 添加充值订单
    charge() {
      this.http
        .post("/api/services/app/MemberAmountService/AddAmountOrder", {
          MarketingId: this.uuid,
          Amount: this.Amount,
          RechargeType: 0
        })
        .then(res => {
          let _this = this;
          wx.ready(function() {
            WeixinJSBridge.invoke(
              "getBrandWCPayRequest",
              res.Result.Data,
              function(res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                  _this.$router.push({ name: "czjilu" });
                }
              }
            );
          });
        });
    },
    /**
     * 获取充值奖励列表
     */
    CongziList() {
      if (!this.uuid) {
        this.givemoney = "";
        this.giveredpackage = "";
        this.givecoupon = "";
        this.givepackage = "";
        return;
      }
      this.http
        .get("/api/services/app/MemberAmountService/GetRechargeMarket", {
          params: { MarketingId: this.uuid }
        })
        .then(res => {
          this.givemoney = res.Result.Data.AwardRechargeAmoun;
          this.givecoupon = res.Result.Data.Coupon;
          this.givepackage = res.Result.Data.Combo;
          if (res.Result.Data.Combo == 0) {
            this.giveredpackage = res.Result.Data.AwardFixedAmount;
          } else {
            this.giveredpackage =
              res.Result.Data.RandomMinAmount +
              "-" +
              res.Result.Data.RandomMaxAmount;
          }
        });
    }
  },

  created() {
    this.Chaxun();
    wechatCommon.config(this);
  }
};
</script>
<style scoped lang="scss" type="text/scss">
.banner {
  width: 100%;
  padding: 0.12rem 0.4rem;
}
.congzi {
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  border-radius: 0.1rem;
  padding: 0.28rem 0.4rem;
  color: #333333;
  font-size: 0.24rem;
}
.congzi .box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .button {
    /* padding: 0.2rem 0.4rem; */
    width: 1.7rem;
    height: 0.61rem;
    text-align: center;
    line-height: 0.61rem;
    border-radius: 0.2rem;
    margin-bottom: 0.2rem;
    position: relative;
    display: inline-block;
    text-decoration: none;
    border: 1px solid #5BA1E7;
    
font-size: 0.24rem;
font-family: Microsoft YaHei Light;
font-weight: bold;

  }
}

.addclass {
  background: #5ba1e7;
}
.congzi h3 {
  margin-bottom: 0.37rem;
  font-size: 0.24rem;
  color: #333333;
  font-weight: bold;
font-family: Microsoft YaHei Light;
}

.van-col {
  padding: 10px 20px;
}
/* list */
.list {
  margin-top: 0.14rem;
  margin-bottom: 0.45rem;
  padding: 0.3rem;
  border-radius: 0.1rem;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  font-size: 0.25rem;
  color: #000000;
  font-weight: bold;
}
.list img {
  width: 0.3rem;
  height: 0.3rem;
  margin-right: 0.11rem;
}
.list .title {
  font-size: 0.3rem;
}
.list .text {
  margin-left: 0.37rem;
  color: #333333;
}
.list div {
  /* line-height: 0.41rem; */
  margin-bottom: 0.56rem;
}
.list .son {
  margin: 0.1rem;
  line-height: 0.4rem;
}

.son a {
  display: inline-block;
  width: 3.63rem;
  color: #3c6efd;
}
.on {
  background-color: #5BA1E7;
  color: #fff;
}
.img {
  background: #3c6efd;
  color: #fff;
}
/deep/ {
  .van-button--large {
    height: 0.9rem;
    line-height: 0.88rem;
    border-radius: 0.1rem;
    font-size: 0.3rem;
    background: #5BA1E7;
  }
}
</style>