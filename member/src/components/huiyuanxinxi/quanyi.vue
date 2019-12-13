<template>
  <div>
    <!-- 头部 -->
    <heade title="会员权益"></heade>
    <!-- 背景图 -->
    <div class="bg"></div>
    <!-- 权益 -->
    <div class="list">
      <div>
        <p>
          <img src="../../assets/images/name.png" alt />
          <span class="title">权益名称</span>
        </p>
        <p class="text">{{data.FeatureName}}</p>
      </div>
      <div>
        <p>
          <img src="../../assets/images/jieshao.png" alt />
          <span class="title">权益介绍</span>
        </p>
        <p class="text">{{data.FeatureRichContent}}</p>
      </div>
      <!-- 权益内容 -->
      <div>
        <p>
          <img src="../../assets/images/neirong.png" alt />
          <span class="title">权益内容</span>
        </p>
        <p class="son">
          <img src="../../assets/images/score.png" alt />
          <span>奖励积分：</span>
          <b>{{data.Awardintegral}}</b>
        </p>
        <p class="son">
          <img src="../../assets/images/grop.png" alt />
          <span>奖励成长值：</span>
          <b>{{data.AwardGrowth}}</b>
        </p>
        <p class="son">
          <img src="../../assets/images/money.png" alt />
          <span>奖励金额：</span>
          <b>{{data.AwardRechargeAmoun}}</b>
        </p>
        <p class="son">
          <img src="../../assets/images/hongbao.png" alt />
          <span>奖励红包：</span>
          <b>{{data.AwardHongBaoAmount}}</b>
        </p>
        <p class="son">
          <img src="../../assets/images/quan.png" alt />
          <span>奖励券：</span>
          <b>{{item.ComboName}}*{{item.Num}}</b>
        </p>
        <p class="son">
          <img src="../../assets/images/taocan.png" alt />
          <span>奖励套餐：</span>
          <b>
           {{item1.CouponName}}*{{item1.Num}}
          </b>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import heade from "../common/heade";
export default {
  components: {
    heade
  },
  data() {
    return {
      data: {},
      item: {},
      item1:{}
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    quanyi() {
      this.http
        .get("/api/services/app/MemberGradeService/GetMemberEquity", {
          params: { FeatureId: this.$route.query.id }
        })
        .then(res => {
          console.log(res);
          if (res.Result.Code == 0) {
            this.data = res.Result.Data;
            res.Result.Data.MarketingComboAwardList.map(item => {
              this.item = item;
            });
             res.Result.Data.MarketingCouponAwardList.map(item => {
              this.item1 = item;
            });
          }
        });
    }
  },
  created() {
    this.quanyi();
  }
};
</script>

<style scoped>
.bg {
  width: 6.7rem;
  height: 3.44rem;
  margin: 0.15rem auto;
  border-radius: 0.1rem;
  opacity: 1;
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  background-image: url(../../assets/images/bg.png);
  background-repeat: no-repeat;
  background-size: cover;
}

/* list */
.list {
  margin: auto;
  width: 6.65rem;
  height: 7.6rem;
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
  line-height: 0.41rem;
  margin-bottom: 0.56rem;
}
.list .son {
  margin-left: 0.4rem;
}
.son span {
  display: inline-block;
  width: 1.5rem;
}
.son b {
  display: inline-block;
  width: 3.63rem;
  color: #3c6efd;
}
</style>