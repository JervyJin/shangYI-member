<template>
  <div id="invite">
    <!-- 头部 -->
    <heade title="邀请赢好礼"></heade>

    <div class="banner">
      <div class="bg"></div>
      <!-- 流程图 -->
      <div class="liuceng">
        <p class="title">推荐流程图</p>
        <div class="flex">
          <div class="item">
            <span class="cir">
              <i class="iconfont iconfenxiang1"></i>
            </span>
            <p>分享该页</p>
            <p>面给好友</p>
          </div>
          <div class="jiantou">
            <i class="iconfont iconfanhuiyoujian"></i>
          </div>
          <div class="item">
            <span class="cir">
              <i class="iconfont iconzhuce1"></i>
            </span>
            <p>好友</p>
            <p>注册成功</p>
          </div>
          <div class="jiantou">
            <i class="iconfont iconfanhuiyoujian"></i>
          </div>
          <div class="item">
            <span class="cir">
              <i class="iconfont iconlingqu1"></i>
            </span>
            <p>您可以</p>
            <p>领取奖励</p>
          </div>
        </div>
      </div>
      <div class="guize">
        <p class="title">活动规则</p>
        <p>1.邀请未注册的好友，可以获得以下奖励</p>
        <p>2.获得的奖励可以在任意门店使用</p>
        <p>3.奖励信息可以在<router-link to="jiangli">【我的奖励】</router-link>中查看</p>
      </div>

      <!-- 奖励 -->
      <div class="list reward">
        <p class="zc-label">
<!--          <img src="../../assets/images/neirong.png" alt />-->
          <span class="title">奖励内容</span>
        </p>
        <p class="son" v-if="jlInfo.Awardintegral && jlInfo.Awardintegral.Awardintegral!==0">
          <i class="iconfont iconjifen"></i>
          <span class="reward_name">奖励积分：</span>
          <span class="score">{{jlInfo.Awardintegral ?jlInfo.Awardintegral.Awardintegral:''}}</span>
        </p>
        <p class="son" v-if="jlInfo.Awardintegral && jlInfo.Awardintegral.AwardGrowth!=0">
          <i class="iconfont iconchengchangzhi"></i>
          <span class="reward_name">奖励成长值：</span>
          <span class="score">{{jlInfo.Awardintegral ?jlInfo.Awardintegral.AwardGrowth:''}}</span>
        </p>
        <p class="son" v-if="this.jlInfo.Awardintegral && jlInfo.Awardintegral.AwardRechargeAmoun!= 0">
          <i class="iconfont iconjine"></i>
          <span class="reward_name">奖励金额：</span>
          <span class="score">{{jlInfo.Awardintegral ?jlInfo.Awardintegral.AwardRechargeAmoun:''}}</span>
        </p>
        <p class="son" v-if="jlInfo.Awardintegral && jlInfo.Awardintegral.AwardHongBaoAmount!=0">
          <i class="iconfont iconhongbao"></i>
          <span class="reward_name">奖励红包：</span>
          <span class="score">{{jlInfo.Awardintegral ?jlInfo.Awardintegral.AwardHongBaoAmount:''}}</span>
        </p>
        <p class="son" v-if="this.jlInfo.MarketingCouponAwardList!=null && this.jlInfo.MarketingCouponAwardList.length> 0 ">
          <i class="iconfont iconquan"></i>
          <span class="reward_name">奖励券：</span>
          <span v-for="(item, index) in jlInfo.MarketingCouponAwardList" :key="index">
            <span class="score">{{item.CouponName}}*{{item.Num}};</span>
          </span>
        </p>
        <p class="son" v-if="this.jlInfo.MarketingComboAwardList!=null && this.jlInfo.MarketingComboAwardList.length> 0 ">
          <i class="iconfont icontaocanhuodong"></i>
          <span class="reward_name">奖励套餐：</span>
          <span v-for="(item, index) in jlInfo.MarketingComboAwardList" :key="index">
            <span class="score">{{item.ComboName}}*{{item.Num}}</span>
          </span>
        </p>
        <div class="tip">活动以实际到账为准</div>
      </div>
    </div>
    <van-button type="info" size="large" @click="$router.push('jiangli')">我的奖励</van-button>
  </div>
</template>
<script>
import heade from "../common/heade";
import wechatCommon from "@/wechat";
export default {
  components: {
    heade
  },
  data() {
    return {
      jlInfo: {
        Awardintegral: {}
      },
      userId: ""
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  created() {
    this.http
      .get("/api/services/app/CRMMemberService/GetMyInfo", {
        params: {}
      })
      .then(res => {
        console.log(res);
        this.userId = res.Result.Data.Id;
        // debugger
        let _this = this;
        wechatCommon.config(this, function() {
          wx.ready(function() {
            //需在用户可能点击分享按钮前就先调用
            wx.updateAppMessageShareData({
              title: "您的好友邀请您注册会员", // 分享标题
              desc: "点击立即注册", // 分享描述
              link:
                window.location.protocol +
                "//" +
                window.location.host +
                "/zuche?refer=" +
                _this.userId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: "", // 分享图标
              success: function() {
                // 设置成功
              }
            });
          });
        });
      });

    // 邀请礼奖励
    this.http

      .get("/api/services/app/CRMMemberService/GetInvitationWinCourtesy", {
        params: {}
      })
      .then(res => {
        console.log(res);

        this.jlInfo = res.Result.Data;
      });
  }
};
</script>
<style lang="scss" scoped>
#invite{
  padding-bottom: 0.6rem;
}
.banner {
  width: 100%;
  padding: 0.12rem 0.4rem;
}
/* 背景图 */
.bg {
  height: 3.05rem;
  opacity: 1;
  border-radius: 0.1rem;
  background-image: url(../../assets/images/yaoqingBG.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.liuceng {
  /* width: 670px; */
  border-radius: 0.1rem;
  margin: 0.12rem auto;
  padding: 0.31rem 0.38rem 0.92rem;
  /* height: 4.23rem; */
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
}
.title {
  margin-bottom: 0.64rem;
  font-size: 0.3rem;
  font-weight: bold !important;
}
.liuceng .flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex .jiantou {
  margin-bottom: 16%;
}
.jiantou .iconfanhuiyoujian{
  font-size: 0.6rem;
  color: #E1E1E1;
  font-weight: 600;
}
.liuceng .item {
  text-align: center;
}
.liuceng .item p {
  width: 1.22rem;
  font-size: 0.24rem;
  color: #333;
  font-weight: 400;
  line-height: 0.34rem;
}
.liuceng .item .cir {
  width: 1.22rem;
  height: 1.22rem;
  margin-bottom: 0.28rem;
  border: 1px solid #5ba1e7;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.liuceng .item .cir .iconfont{
  font-size: 0.6rem;
  color: #5BA1E7;
}
.guize {
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  font-size: 0.24rem;
  border-radius: 0.1rem;
  color: #333333;
  font-weight: 400;
  padding: 0.45rem;
  line-height: 0.44rem;
  .title{
    margin-bottom: 0.2rem;
  }
  p{
    font-size: 0.2rem;
    color: #333;
    line-height: 0.36rem;
  }
}
/* list */
.list {
  margin: 0.12rem auto;

  padding: 0.3rem;
  border-radius: 0.1rem;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  font-size: 0.25rem;
  color: #000000;
  font-weight: 400;
}
.list img {
  width: 0.3rem;
  height: 0.3rem;
  margin-right: 0.11rem;
}

.list .score{
  color:#5ba1e7;
}
.zc-label{
  line-height: 0.8rem;
}
.list .text {
  margin-left: 0.37rem;
  color: #333333;
}
.list .son {
  /* margin-left: 0.4rem; */
  line-height: 0.6rem;
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
  /* width: 1.5rem; */
}
.son a {
  display: inline-block;
  width: 3.63rem;
  color: #3c6efd;
}
.son{
  .reward_name{
    width: 2rem;
  }
}
.tip {
  text-align: center;
  margin-top: 0.43rem;
  color: #c0bfbf;
}
.list.reward{
  margin-bottom: 0.5rem;
}
.van-button--large {
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
</style>