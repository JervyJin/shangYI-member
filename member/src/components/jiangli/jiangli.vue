<template>
  <div id="reward">
    <!-- 头部 -->
    <heade title="我的奖励"></heade>

    <!-- banner -->
    <div class="banner">
      <van-tabs>
        <van-tab title="注册奖励 ">
          <div class="content" v-for="(item,index) in data" :key="index">
            <span class="name">{{item.Name||'昵称'}}</span>
            <!-- <span class="phone">{{item.Awardintegral}}</span> -->
            <p class="time">{{item.CreatorTime}}</p>
            <div class="list">
              <h1>获得奖励：</h1>
              <div class="fr">
                <span>
                  奖励积分:{{item.Awardintegral}}、奖励成长值:{{item.AwardGrowth}}、奖励储值额度:{{item.AwardRechargeAmount}}、
                  <br />
                  套餐：{{item.Combo}}、
                  <br />
                  优惠卷:{{item.Coupon}}
                  <br />
                  奖励储值红包:{{item.AwardHongBaoAmount}}
                </span>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="消费奖励">
          <div class="content">
            <span class="name"></span>
            <span class="phone"></span>
            <p class="time"></p>
            <div class="list">
              <h1></h1>
              <div class="fr">
                <span></span>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <CommonBottom />
  </div>
</template>

<script>
import heade from "../common/heade";
import CommonBottom from "../common/CommonBottom.vue";

export default {
  components: {
    heade,
    CommonBottom
  },
  data() {
    return {
      data: []
    };
  },
  methods: {},
  created() {
    let _this = this;

    this.http
      .get("/api/services/app/MemberRewardService/GetMyRegReword", {
        params: {}
      })
      .then(function(response) {
        console.log(response);

        _this.data = response.Result.Data;
        // _this.quan = response.Result.Data.MarketingCouponAwardList;
        // _this.taocan = response.Result.Data.MarketingComboAwardList;
      });
  }
};
</script>

<style scoped lang="scss">
#reward {
  background: #f6f3f7;
  min-height: 100%;
}
.banner {
  width: 100%;
  padding: 0.12rem 0.4rem;
}

.content {
  margin-top: 0.3rem;
  padding: 0.28rem 0.26rem;
  /* height: 268px; */
  opacity: 1;
  border-radius: 6px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0 0 2px rgba(3, 0, 6, 0.1);
}

.content .name {
  color: #000;
  font-size: 0.3rem;
  margin-right: 0.2rem;
  margin-bottom: 0.14rem;
}

.content .phone {
  color: #666666;
  font-size: 0.24rem;
}

.content .time {
  margin-top: 0.14rem;
  font-size: 0.2rem;
  color: #999999;
}

.list {
  margin-top: 0.21rem;
  clear: both;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.list h1 {
  font-size: 0.24rem;
  color: #000;
  flex: 1;
}

.list .fr {
  /* float: right; */
  flex: 3;
  text-align: justify;
  font-size: 0.24rem;
  color: #3C6EFD;
  line-height: 0.48rem;
  margin-top: -0.12rem;
}

/*覆盖van默认样式*/
/deep/ {
  .van-tabs__nav {
    background: none;

    .van-ellipsis {
      font-size: 0.3rem;
      color: #999;
    }
  }
  .van-tabs__wrap {
    height: 0.88rem;
}
.van-tab {
  
    padding: 0 0.1rem;
    color: #7d7e80;
    font-size: 0.28rem;
    line-height: 0.88rem;
    text-align: center;
    cursor: pointer;
}
  .van-tab.van-tab--active {
      .van-ellipsis{
        font-size: 0.32rem;
        color: #333;
      }
  }

  .van-tabs__line {
    background-color: #5a83fb;
    width: 0.84rem;
    height: 0.06rem;
  }
}
</style>