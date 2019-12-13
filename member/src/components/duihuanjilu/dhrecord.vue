<template>
  <div>
    <!-- 头部 -->
    <heade title="兑换记录"></heade>
    <!-- banner -->
    <div class="banner common">
      <van-cell-group>
        <van-field
          v-model="searchValue"
          placeholder="输入搜索内容"
          right-icon="search"
          @click-right-icon="getRecordList"
        />
      </van-cell-group>
      <!-- 优惠券列表 -->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="false"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="list">
            <div class="item" v-for="(item,index) in recordList" :key="index">
              <van-row type="flex" justify="space-between">
                <van-col span="8" style="margin-right: 0.09rem;margin-left: 0.06rem;">
                  <span
                    class="money"
                    :class="['son',
                item.ApplicableType=='通用'?'son1':item.ApplicableType=='商品品牌'?'son2':item.ApplicableType=='商品信息'?'son3':'son4']"
                  >{{item.UseType == 0?item.DiscountAmount:(item.DiscountRate/10).toFixed(1)}}</span>
                  <span
                    v-if="item.UseType=='折扣金额'"
                    :class="['son',
                item.ApplicableType=='通用'?'son1':item.ApplicableType=='商品品牌'?'son2':item.ApplicableType=='商品信息'?'son3':'son4']"
                    style="color:#fc997e;font-weight: bold;"
                  >￥</span>
                  <span v-else>折</span>
                </van-col>
                <van-col span="14">
                  <div class="right">
                    <span class="quan">{{item.Name}}</span>
                    <p>
                      有效期：{{item.ExpireDateType =='自定义日期' ? item.ExpireBeginDate.substring(0, 10) +
                      '~' +item.ExpireEndDate.substring(0, 10) : item.ExpireDateType}}
                    </p>
                    <p>适用范围：{{item.OrganizationRangeType}}</p>
                  </div>
                </van-col>
              </van-row>
              <van-divider
                dashed
                :style="{margin:'0.4rem 0 0 0',padding: '0 0.4rem',borderColor:'#5BA1E7' }"
              ></van-divider>
              <van-row type="flex" justify="space-between" class="bottom">
                <van-col span="6" style="margin-left:0.42rem;">
                  <!-- <img src="../../assets/images/mendian.png" alt /> -->
                  <i
                    class="iconfont iconweibiaoti--1"
                    :class="['son',
                item.ApplicableType=='通用'?'son1':item.ApplicableType=='商品品牌'?'son2':item.ApplicableType=='商品信息'?'son3':'son4']"
                    v-if="item.ApplicableType=='通用'"
                  ></i>
                  <i
                    class="iconfont iconweibiaoti--1"
                    :class="['son',
                item.ApplicableType=='通用'?'son1':item.ApplicableType=='商品品牌'?'son2':item.ApplicableType=='商品信息'?'son3':'son4']"
                    v-if="item.ApplicableType=='商品类别'"
                  ></i>
                  <i
                    class="iconfont iconweibiaoti--1"
                    :class="['son',
                item.ApplicableType=='通用'?'son1':item.ApplicableType=='商品品牌'?'son2':item.ApplicableType=='商品信息'?'son3':'son4']"
                    v-if="item.ApplicableType=='商品信息'"
                  ></i>
                  <i
                    class="iconfont iconweibiaoti--1"
                    :class="['son',
                item.ApplicableType=='通用'?'son1':item.ApplicableType=='商品品牌'?'son2':item.ApplicableType=='商品信息'?'son3':'son4']"
                    v-if="item.ApplicableType=='商品品牌'"
                  ></i>
                  <span class="type"
                    style="vertical-align:middle;color:#999;font-weight:6rem;">{{item.ApplicableType}}</span>
                </van-col>
                <van-col span="11">
                  <!-- <span>数量*{{item.CouponNum}}</span> -->
                  <span class="duihuan">{{item.NeedIntegral}}积分兑换</span>
                </van-col>
              </van-row>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <!-- 底部 -->
    <CommonBottom></CommonBottom>
  </div>
</template>
<script>
import heade from "../common/heade";
import CommonBottom from "../common/CommonBottom";

export default {
  components: {
    heade,
    CommonBottom
  },
  data() {
    return {
      searchValue: "",
      recordList: [],
      page: 1,
      rows: 15,
      total: 0,
      loading: false,
      finished: false,
      isLoading: false
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    /**
     * 获取优惠券列表
     */
    getRecordList() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        loadingType: "spinner",
        message: "加载中..."
      });
      this.http
        .get("/api/services/app/CRMIntegralConversionService/GetCRMCouponHis", {
          params: {
            CouponName: this.searchValue,
            page: this.page,
            rows: this.rows
          }
        })
        .then(res => {
          console.log(res);
          this.isLoading = false;
          this.loading = false;
          if (res.Result.Code === 0) {
            this.total = res.Result.Total;
            if (this.page == 1) this.recordList = res.Result.Rows;
            else this.recordList.push(...res.Result.Rows);
            if (
              this.recordList.length === 0 ||
              Math.ceil(this.total / this.rows) == this.page
            ) {
              this.finished = true;
              // this.searchValue = "";
            } else {
              this.finished = false;
            }
          }
          // else {
          //     this.$toast({
          //         message: "获取优惠券失败!!",
          //         duration: 2000
          //     });
          // }
          this.$toast.clear();
        });
    },
    onLoad() {
      this.page++;
      this.getRecordList();
    },
    onRefresh() {
      this.page = 1;
      this.getRecordList();
    }
  },
  created() {
    this.getRecordList();
  }
};
</script>
<style scoped lang="scss">
.banner {
  width: 100%;
  padding: 0.12rem 0.4rem;
}

.van-search {
  background: #fff;
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  padding: 0;
}

.list .item {
  background: url(../../assets/images/222.png) no-repeat;
  background-size: 100% 100%;
  height: 3.1rem;
  padding-top: 0.14rem;
  .card {
    text-align: center;
    color: #333;
    font-weight: 6rem;
    padding: 0.1rem;
  }

  .son1 {
    color: #fc7e7e;
  }
  .son2 {
    color: #fcc27e;
  }
  .son3 {
    color: #4dbfc3;
  }
  .son4 {
    color: #fc997e;
  }
}

.item .money {
  font-size: 1.22rem;
  font-weight: bold;
   padding-left: 0.6rem;
  padding-top: 0.62rem;
}

.item .right {
  line-height: 20px;
  font-size: 0.24rem;
}

.code {
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
}

.item .quan {
  font-size: 0.3rem;
  /* color: #333333; */
  font-weight: bold;
}

.main .data {
  padding: 0.12rem 0;
}

.item .bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 0.4rem;
  font-size: 0.24rem;
  columns: #000000;
}

.item .bottom img {
  width: 0.35rem;
  height: 0.35rem;
  margin-right: 0.2rem;
}

.item .bottom .duihuan {
  padding: 0.2rem 0.3rem;
  border-radius: 0.1rem;
  background: rgb(209, 204, 204);
}

/*覆盖van搜索默认样式*/
/deep/ {
  .van-cell {
    padding: 0.2rem 0.32rem;
    margin-top: 0.11rem;
    border-radius: 0.1rem;
    font-size: 0.28rem;
    line-height: 0.48rem;
    background-color: #fff;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  }
  .van-icon.van-icon-search {
    font-size: 0.48rem;
  }

  .van-field__control {
    font-size: 0.24rem;
    font-family: unset;
  }

  .van-button--large {
    height: 0.9rem;
    line-height: 0.88rem;
    border-radius: 0.1rem;
    font-size: 0.28rem;
  }
  .van-cell-group {
    border-radius: 0.1rem;
  }
}
</style>
