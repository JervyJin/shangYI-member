<template xmlns="http://www.w3.org/1999/html">
  <div>
    <heade title="消费详情"></heade>
    <div class="banner">
      <div class="tradtime">
        <van-row type="flex" justify="space-between">
          <van-col span="6" vertical-align="middle">
            <img src="../../assets/images/shop.png" alt />
            <span class="time">交易信息</span>
          </van-col>
          <van-col span="10"></van-col>
        </van-row>
        <van-divider />

        <van-row>
          <van-col span="6">
            <span class="item-label">结算金额</span>
          </van-col>
          <van-col span="10" offset>
            <span class="item-content">{{detailInfo.PayAmount}}元</span>
          </van-col>
        </van-row>

        <van-row>
          <van-col span="6">
            <span class="item-label">交易状态</span>
          </van-col>
          <van-col span="10" offset>
            <span
              :class="detailInfo.TransactionState==0?'zhuangtai':'zhuangtai-error'"
            >{{detailInfo.TransactionState==0?'交易成功':'交易失败'}}</span>
          </van-col>
        </van-row>

        <van-row>
          <van-col span="6">
            <span class="item-label">交易机构</span>
          </van-col>
          <van-col span="10" offset>
            <span class="item-content">{{detailInfo.OrganizationName}}</span>
          </van-col>
        </van-row>

        <van-row>
          <van-col span="6">
            <span class="item-label">交易时间</span>
          </van-col>
          <van-col span="10" offset>
            <span class="item-content">{{detailInfo.CreatorTime}}</span>
          </van-col>
        </van-row>

        <van-row>
          <van-col span="6">
            <span class="item-label">交易流水号</span>
          </van-col>
          <van-col span="10" offset>
            <span class="item-content">{{detailInfo.ThirdpartyOrderCode}}</span>
          </van-col>
        </van-row>

        <van-row>
          <van-col span="6">
            <span class="item-label">订单号</span>
          </van-col>
          <van-col span="10" offset>
            <span class="item-content">{{detailInfo.OrderCode}}</span>
          </van-col>
        </van-row>
      </div>
      <!-- 支付信息 -->
      <div class="tradtime">
        <van-row type="flex" justify="space-between">
          <van-col span="6" vertical-align="middle">
            <img src="../../assets/images/goumai.png" alt />
            <span class="time">支付信息</span>
          </van-col>
          <van-col span="10"></van-col>
        </van-row>
        <van-divider />

        <template v-for="(item, index) in detailInfo.ListPay">
          <van-row>
            <van-col span="6">
              <span class="item-label">支付方式</span>
            </van-col>
            <van-col span="10" offset>
              <span class="item-content">{{item.PayType}}</span>
            </van-col>
          </van-row>

          <van-row>
            <van-col span="6">
              <span class="item-label">支付金额</span>
            </van-col>
            <van-col span="10" offset>
              <span class="item-content">{{item.Amount}}</span>
            </van-col>
          </van-row>
        </template>
      </div>

      <!-- 商品信息 -->

      <div class="tradtime">
        <van-row type="flex" justify="space-between">
          <van-col span="6" vertical-align="middle">
            <img src="../../assets/images/zhengfang.png" alt />
            <span class="time">商品信息</span>
          </van-col>
          <van-col span="10"></van-col>
        </van-row>
        <van-divider />

        <template v-for="(item, index) in detailInfo.ListGoods">
          <van-row>
            <van-col span="6">
              <span class="item-label">商品名称</span>
            </van-col>
            <van-col span="10" offset>
              <span class="item-content">{{item.GoodName}}</span>
            </van-col>
          </van-row>

          <van-row>
            <van-col span="6">
              <span class="item-label">数量</span>
            </van-col>
            <van-col span="10" offset>
              <span class="item-content">{{item.Num}}</span>
            </van-col>
          </van-row>
        </template>
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
      msg: "",
      detailInfo: {}
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getDetail() {
      this.http
        .get("/api/services/app/MemberExpendService/GetExpendDetail", {
          params: {
            id: this.$route.query.id
          }
        })
        .then(res => {
          // console.log(res)
          if (res.Result.Code === 0) {
            this.detailInfo = res.Result.Data;
          }
        });
    }
  },
  created() {
    this.getDetail();
  }
};
</script>

<style scoped lang="scss" type="text/scss">
.banner {
  width: 100%;
  padding: 0.12rem 0.4rem;
}
.tradtime {
  padding: 0.14rem;
  margin-bottom: 0.12rem;
  border-radius: 0.08rem;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  .van-row {
    padding: 0.2rem 0;
  }
  img {
    width: 0.3rem;
    height: 0.3rem;
  }
  .time {
    font-size: 0.3rem;
    color: #000;
    font-weight: 6rem;
    margin-left: 0.1rem;
  }
  .item-label {
    font-size: 0.24rem;
    color: #999;
    font-weight: 6rem;
  }
  .item-content {
    font-size: 0.24rem;
    color: #333333;
    font-weight: 6rem;
  }
  .zhuangtai{
    col
  }
}
</style>
