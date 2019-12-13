<template>
  <div>
    <!-- 头部 -->
    <heade title="优惠券详情"></heade>
    <!-- banner -->
    <div class="banner">
      <div class="box1">
        <div class="fl">
          <!-- <img src="../../assets/images/1.png" alt /> -->
          <span class="money">{{yhqInfo.DiscountAmount}}</span>
          <span>优惠券</span>
        </div>
        <div class="fr">
          <h1>{{yhqInfo.CouponName}}</h1>
          <h2>
            <i>{{yhqInfo.NeedIntegral}}</i>积分
          </h2>
          <p>使用日期：{{yhqInfo.UserDate}}</p>
          <p>抵扣类型：{{yhqInfo.UseType}}</p>
          <p>抵扣金额：{{yhqInfo.DiscountAmount}}</p>
          <div class="dk-count">
            <van-stepper v-model="value" :max="yhqInfo.RemainingConversionNumber" />
            <span class="kc">库存{{yhqInfo.RemainingConversionNumber}}件</span>
          </div>
        </div>
      </div>
      <!-- 查看使用门店 -->
      <div class="door" @click="goToMd">
        <span>查看使用门店（{{yhqInfo.Count}}）</span>
        <van-icon name="arrow" />
      </div>

      <van-tabs v-model="active" swipeable>
        <van-tab title="兑换规则 ">
          <h1>兑换规则</h1>
          <p>
            1.最低消费金额；
            <span class="cont">{{duihuan.ExpireDate}}</span>
          </p>
          <p>
            2.是否可以与同类型券使用；
            <span class="cont">是</span>
          </p>
          <p>
            3.是否可以转赠其他会员；
            <span class="cont">是</span>
          </p>
          <p>
            4.每单限用张数；
            <span class="cont">{{duihuan.ConversionEveryoneNumbe}}</span>
          </p>
        </van-tab>
        <van-tab title="使用规则 ">
          <h1>使用规则</h1>
          <p>
            1.最低消费金额；
            <span class="cont">{{siyong.AstrictNum}}</span>
          </p>
          <p>
            2.是否可以与同类型券使用；
            <span class="cont">{{siyong.IsIncrease? '是' :'否'}}</span>
          </p>
          <p>
            3.是否可以转赠其他会员；
            <span class="cont">{{siyong.IsMeanwhile? '是' :'否'}}</span>
          </p>
          <p>
            4.每单限用张数；
            <span class="cont">{{siyong.MinimumConsumption}}</span>
          </p>
        </van-tab>
      </van-tabs>

      <van-button
        type="info"
        @click="submit"
        size="large"
        style="margin-top:0.4rem;border-radius: 0.1rem;"
      >立即兑换</van-button>
    </div>
    <!-- 底部 -->
    <CommonBottom></CommonBottom>
  </div>
</template>
<script>
import heade from "../common/heade";
import CommonBottom from "../common/CommonBottom";
import bus from "../../eventBus";

export default {
  components: {
    heade,
    CommonBottom
  },
  data() {
    return {
      active: "",
      yhqInfo: {},
      value: 1,
      uid: "",
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    /**
     * 优惠券兑换
     */
    submit() {
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "您确定要兑换当前优惠券吗?"
        })
        .then(() => {
          this.$toast.loading({
            duration: 0,
            forbidClick: true,
            loadingType: "spinner",
            message: "加载中..."
          });
          this.http
            .post(
              "/api/services/app/CRMIntegralConversionService/AddCRMMemberScoreChange",
              {
                ConponId: this.$route.query.id,
                Value: this.value * this.yhqInfo.NeedIntegral,
                ExchangeNum: this.value
              }
            )
            .then(res => {
              if (res.Result.Code === 0) {
                this.$toast({
                  message: "兑换成功!!",
                  duration: 2000
                });
                setTimeout(() => {
                  this.$router.push({
                    name: "quanbao"
                  });
                }, 2000);
              }
            })
            .catch(err => {});
        })
        .catch(() => {
          // this.$toast({
          //   message: "兑换失败!!",
          //   duration: 2000
          // });
          // this.$toast.clear();
        });
    },
    /**
     * 获取优惠券详情
     */
    getYhqDetail() {
      this.http
        .get(
          "/api/services/app/CRMIntegralConversionService/GetCRMCouponInfo",
          {
            params: {
              couponId: this.$route.query.id
            }
          }
        )
        .then(res => {
          console.log(res);

          if (res.Result.Code === 0) {
            this.yhqInfo = res.Result.Data;
            this.uid = res.Result.Data.IntegralConversionId;
            this.siyong();
            this.duihuan();
          }
          //  else {
          //   this.$toast({
          //     message: "获取优惠券信息失败!!",
          //     duration: 2000
          //   });
          // }
        });
    },
    /*
     *使用规则
     */

    siyong() {
      this.http
        .get(
          "/api/services/app/CRMIntegralConversionService/GetCRMCouponUserRule",
          {
            params: {
              couponId: this.$route.query.id
            }
          }
        )
        .then(res => {
          //  console.log(res)
          if (res.Result.Code === 0) {
            this.siyong = res.Result.Data;
          } 
          // else {
          //   this.$toast({
          //     message: "获取信息失败!!",
          //     duration: 2000
          //   });
          // }
        });
    },
    /*
     *兑换规则
     */

    duihuan() {
      this.http
        .get(
          "/api/services/app/CRMIntegralConversionService/GetCRMCouponConversionRule",
          {
            params: {
              integralConversionId: this.uid
            }
          }
        )
        .then(res => {
          console.log(res);
          if (res.Result.Code === 0) {
            this.duihuan = res.Result.Data
          } 
          // else {
          //   this.$toast({
          //     message: "获取信息失败!!",
          //     duration: 2000
          //   });
          // }
        });
    },
    goToMd() {
      this.$router.push({
        name: "mendian",
        query: {
          id: this.$route.query.id
        }
      });
    }
  },
  created() {
    this.getYhqDetail();
  }
};
</script>
<style scoped>
.banner {
  width: 100%;
  padding: 0.12rem 0.4rem;
}
.box1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.2rem;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  padding: 0.36rem 1.07rem 0.4rem 0.27rem;
  margin-top: 0.13rem;
}
.box1 .fr {
  font-size: 0.22rem;
  color: #000;
}
.box1 .fl {
  width: 2.24rem;
  height: 1.28rem;
  color: #ffffff;
  background: url(../../assets/images/1.png);
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 0.1rem;
}

.box1 .fl .money {
  font-size: 0.86rem;
  color: #ffffff;
  font-weight: bold;
  margin-left: 0.35rem;
}
.box1 .money::before {
  content: "￥";
  font-size: 0.28rem;
  color: #ffffff;
  font-weight: bold;
  position: absolute;
  left: 36px;
}
.fr h1 {
  font-size: 0.3rem;
  font-weight: bold;
  color: #000;
  margin-bottom: 0.23rem;
}
.fr h2 i {
  font-size: 0.3rem;
  font-weight: bold;
  color: #3c6efd;
}
.fr p {
  font-size: 0.22rem;
  color: #000;
  line-height: 0.32rem;
}
.door {
  display: flex;
  margin-top: 0.13rem;
  justify-content: space-between;
  align-items: center;
  padding: 0.24rem;
  margin-bottom: 0.13rem;
  height: 0.95rem;
  border-radius: 0.1rem;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
}
.van-tab__pane,
.van-tab__pane-wrapper {
  height: 2.68rem;
  margin-top: 0.2rem;
  padding: 0.3rem;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
}
.van-tab__pane h1 {
  font-size: 0.3rem;
  font-weight: bold;
  margin-bottom: 0.2rem;
}
.van-tab__pane,
.van-tab__pane-wrapper p {
  line-height: 0.4rem;
  font-size: 0.2rem;
  color: #333333;
}
.dk-count {
  margin-top: 0.2rem;
  display: flex;
  align-items: flex-end;
}
.dk-count > .kc {
  margin-left: 0.2rem;
  color: #d2d2d2;
}
.rule {
  padding: 0.3rem;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  margin-bottom: 0.4rem;
}
.rule h1 {
  font-size: 0.3rem;
  font-weight: bold;
  color-adjust: #000;
  margin-bottom: 0.1rem;
}
.rule .flex {
  line-height: 0.4rem;
}
.cont {
  float: right;
  font-weight: bold;
}
</style>
