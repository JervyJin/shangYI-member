<template>
  <div>
    <!-- 头部 -->
    <heade title="客易宝"></heade>
    <div class="user">
      <div class="top">
        <img class="touxiang" :src="data.HeadPortrait" alt v-if="data.HeadPortrait" />
        <img class="touxiang" src="../assets/images/touxiang.png" alt v-else />
        <div class="right">
          <p class="name">{{data.RealName}}</p>
          <img src="../assets/images/member.png" alt />
          <i>
            <img src="../assets/images/weixin.png" alt />
          </i>
          <p class="phone">{{data.Phone}}</p>
        </div>
        <div class="but">
          <span class="balance">可用余额：</span>
          <span class="yuer">{{data.RechargeAmount}}</span>元
        </div>
      </div>
    </div>
    <!-- banner -->
    <div class="banner">
      <div class="min">
        <router-link to="/huiyuanxinxi">
          <img src="../assets/images/mingpian.png" alt />
          <iclass="iconfont iconwodemingpian"></iclass="iconfont>
          <p>我的名片</p>
        </router-link>
        <router-link to="/erweima">
          <img src="../assets/images/erwei.png" alt />
          <p>我的会员卡</p>
        </router-link>
        <router-link to="/congzi">
          <img src="../assets/images/zaixian.png" alt />
          <p>在线充值</p>
        </router-link>

        <router-link to="/Record">
          <img src="../assets/images/jilu.png" alt />
          <p>消费记录</p>
        </router-link>
      </div>

      <div class="obj">
        <!-- <img src="../assets/images/indexQuan.png" alt=""> -->
        <router-link to="/quanbao" class="obj1">
          <p class="type">优惠券</p>
          <span class="num">{{data.CouponNum}}</span>张
        </router-link>

        <router-link to="/mytaocan" class="obj2">
          <div>
            <p class="type">我的套餐</p>
            <span class="num">{{data.ComboNum}}</span>个
          </div>
        </router-link>

        <router-link to="/jifen" class="obj3">
          <div>
            <p class="type">积分</p>
            <span class="num">{{data.Score}}</span>分
          </div>
        </router-link>
      </div>
      <!-- 轮播图 -->
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img src="../assets/images/swp.png" alt />
        </van-swipe-item>
        <van-swipe-item>
          <img src="../assets/images/yaoqingBG.png" alt />
        </van-swipe-item>
        <van-swipe-item>
          <img src="../assets/images/bg.png" alt />
        </van-swipe-item>
      </van-swipe>
      <!-- 常用功能 -->
      <p style="padding:0.1rem;font-size: 0.24rem;color:#333;font-weight: 6rem;">常用功能</p>

      <div class="gongneng">
        <!-- <img src="../assets/images/indexQuan.png" alt=""> -->
        <router-link to="/yaoqingli" class="van-col-1">
          <p class="title">推荐有礼</p>
          <p class="text">好友与你共享</p>
        </router-link>

        <router-link to="/teasing" class="van-col-2">
          <div>
            <p class="title">我要吐槽</p>
            <p class="text">人工快速回应</p>
          </div>
        </router-link>

        <router-link to="/endmoney" class="van-col-3">
          <div>
            <p class="title">账户余额</p>
            <p class="text">充值更多优惠</p>
          </div>
        </router-link>
      </div>
      <div class="box">
        <p class="copy">版权所有：河南新远方商翼电子科技有限公司</p>
      </div>
    </div>
    <!-- 红包弹窗 -->
    <van-popup v-model="show" class="pop">
      <div class="pop_img">
        <div class="cont">
          <p class="title">恭喜您</p>
          <p class="title">获得到店付款红包</p>
          <p class="num">{{hbdata.Amount}} 元</p>
          <p class="time">{{hbdata.ExpireEndDate}}前失效</p>
          <router-link to="endmoney?type=1">查看账户红包信息</router-link>
        </div>
        <div class="rule">
          <p class="title">活动规则：</p>
          <p class="text">1，每人领一次;</p>
          <p class="text">2，到店使用。</p>
        </div>
        <!-- <img src="../assets/images/￥.png" alt /> -->
      </div>
    </van-popup>
    <CommonBottom />
  </div>
</template>

<script>
import wechatCommon from "@/wechat";

import heade from "./common/heade";
import CommonBottom from "./common/CommonBottom.vue";
import erweima from "./common/erweima.vue";
import Bus from "../eventBus";

export default {
  components: {
    heade,
    CommonBottom,
    erweima
  },
  data() {
    return {
      data: {},
      show: false,
      hbdata: {}
    };
  },
  methods: {},
  created() {
    this.http
      .get("/api/services/app/CRMMemberService/GetMyInfo", {
        params: {}
      })
      .then(response => {
        // console.log(response);
        this.data = response.Result.Data;
      })
      .catch(function(error) {
        console.log(error);
      });
    /*领红包*/
    // debugger
    if (
      this.$router.currentRoute.query &&
      this.$router.currentRoute.query.refer === "scanredbox"
    ) {
      this.http
        .post("/api/services/app/CRMHongBaoService/HongBaoByQRCode", {
          OrgId: this.$router.currentRoute.query.store
        })
        .then(res => {
          this.hbdata = res.Result.Data;
          this.show = true;
          console.log(res);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.banner {
  width: 100%;
  padding: 0.12rem 0.4rem;
}
a {
  color: #fff;
}
.user {
  clear: both;
  background-image: linear-gradient(
    160deg,
    #5ba1e7 10%,
    #7b92e7 40%,
    #888de7 80%
  );
  opacity: 1;
  height: 2.24rem;
  padding: 0.36rem 0.4rem;
  font-size: 0.24rem;
  color: #fff;
  font-weight: bold;
}

.user .name {
  font-size: 0.3rem;
  display: inline-block;
  margin-right: 0.1rem;
  vertical-align: middle;
}
.user .touxiang {
  float: left;
  width: 1rem;
  height: 1rem;
  margin-right: 0.12rem;
  margin-left: 0.1rem;
  border-radius: 0.06rem;
}
.user .right {
  line-height: 0.5rem;
  margin-left: 0.1rem;
  display: inline-block;
  margin-top: -0.1rem;
}
.user .right img {
  width: 0.3rem;
  height: 0.3rem;
  margin-right: 0.08rem;
}
.user .right .phone {
  font-size: 0.24rem;
  font-weight: initial;
}
.user .but {
  float: right;
  /* width: 2.07rem; */
  height: 0.61rem;
  opacity: 1;
  margin-right: 0.15rem;
  line-height: 0.61rem;
  margin-top: -0.1rem;
  font-weight: initial;
}
.user .but .balance {
  font-size: 0.24rem;
}
.user .but .yuer {
  /* color: #3c6efd; */
  font-size: 0.36rem;
  font-weight: 6rem;
  padding-right: 0.09rem;
}
.obj {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.15rem;
  .obj1 {
    display: inline-block;
    background: url(../assets/images/indexQuan.png) no-repeat;
    background-size: 100% 100%;
    width: 2.08rem;
    height: 1.44rem;
    padding: 0.2rem 0.2rem;
  }
  .obj2 {
    display: inline-block;
    background: url(../assets/images/indexTaocan.png) no-repeat;
    background-size: 100% 100%;
    width: 2.08rem;
    height: 1.44rem;
    padding: 0.2rem 0.2rem;
  }
  .obj3 {
    display: inline-block;
    background: url(../assets/images/indexjifen.png) no-repeat;
    background-size: 100% 100%;
    width: 2.08rem;
    padding: 0.2rem 0.2rem;
    height: 1.44rem;
  }
  .type {
    margin-bottom: 0.1rem;
    font-weight: 6rem;
  }
  .num {
    font-size: 0.36rem;
    font-weight: 6rem;
    line-height: 0.89rem;
    margin-right: 0.05rem;
  }
}

.min {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.42rem;
  text-align: center;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  border-radius: 0.1rem;
  /* margin: 0.13rem auto; */
  margin-top: -0.7rem;
  padding: 0.17rem 0.25rem;
  line-height: 0.7rem;
  font-size: 0.24rem;
  color: #000000;
  font-weight: bold;
}
.min img {
  /* display: inline-block; */
  margin-top: 0.25rem;
  width: 0.5rem;
  height: 0.5rem;
}
.min p {
  font-size: 0.2rem;
  color: #666;
  font-weight: initial;
}
.van-swipe {
  height: 2.56rem;
  border-radius: 0.1rem;
  margin-top: 0.1rem;
  img {
    width: 100%;
    height: 100%;
  }
}
.gongneng {
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .title {
    // font-size: 0.24rem;
    padding: 0.04rem 0;
    font-weight: 6rem;
    margin-top: 0.2rem;
    color: #333333;
    font-size: 0.26rem;
  }
  .text {
    font-size: 0.18rem;
    margin-top: 0.02rem;
    color: #888888;
  }
  .van-col-1 {
    width: 2.1rem;
    height: 2.2rem;
    background: url(../assets/images/indextuijian.png) no-repeat;
    background-size: 100% 100%;
  }
  .van-col-2 {
    width: 2.1rem;
    height: 2.2rem;
    background: url(../assets/images/indextucao.png) no-repeat;
    background-size: 100% 100%;
  }
  .van-col-3 {
    width: 2.1rem;
    height: 2.2rem;
    background: url(../assets/images/indexyue.png) no-repeat;
    background-size: 100% 100%;
  }
}

.box {
  position: relative;
  .copy {
    position: absolute;
    text-align: center;
    color: #a2a2a2;
    font-size: 0.2rem;
    width: 100%;
    top: 0.2rem;
    left: 0;
    line-height: 0.89rem;
    font-weight: 6rem;
  }
}
.pop {
  background: none !important;
}
// 红包弹窗
.pop_img {
  width: 5.94rem;
  height: 7.05rem;
  // position: relative;
  font-family: Microsoft YaHei Regular;
  background-image: url(../assets/images/￥.png);
  background-size: 100% 100%;
  .cont {
    margin: auto;
    width: 4.82rem;
    height: 3.41rem;
    text-align: center;
    padding-top: 0.67rem;
    font-size: 0;
    .title {
      font-size: 0.3rem;
      color: #c8874b;
      line-height: 0.36rem;
    }
    .num {
      margin-top: 0.4rem;
      margin-bottom: 0.3rem;
      color: #fb6a38;
      font-size: 0.68rem;
      font-weight: bold;
    }
    .time {
      font-size: 0.24rem;
      color: #a4a4a4;
      margin-bottom: 0.09rem;
    }
    a {
      font-size: 0.24rem;
      color: #c8874b;
    }
  }
  .rule {
    text-align: left;
    font-size: 0.24rem;
    margin-top: 1.15rem;
    margin-left: 0.52rem;
    color: #ffffff;
    .title {
      font-size: 0.3rem;
      margin-bottom: 0.14rem;
    }
    .text {
      line-height: 0.36rem;
    }
  }
}
</style>
