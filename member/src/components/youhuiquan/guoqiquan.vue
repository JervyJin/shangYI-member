<template>
  <div>
    <!-- 头部 -->
    <heade title="过期券包"></heade>
    <!-- banner -->
    <div class="banner common" v-if="this.yhqTypes.length!=0">
      <van-tabs
        v-model="active"
        swipeable
        @change="handleChange"
        color="#3C6EFD"
        font-size="0.3rem"
      >
        <van-tab v-for="item in yhqTypes" :title="item.Name" :name="item.Id" :key="item.Id">
          <van-field
            v-model="searchValue"
            placeholder="输入搜索内容"
            right-icon="search"
            @click-right-icon="getYhqList"
            class="searchContent"
          />
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <div class="list" v-for="(item, index) in yhqList" :key="index">
                <div class="item">
                  <van-row type="flex" justify="space-between">
                    <van-col span="8" style="margin-right: 0.09rem;margin-left: 0.06rem;">
                      <span
                        class="money"
                        :class="['son',
                item.ApplicableType=='通用'?'son1':item.ApplicableType=='商品品牌'?'son2':item.ApplicableType=='商品信息'?'son3':'son4']"
                      >{{item.UseType == 0?item.DiscountAmount:(item.DiscountRate/10).toFixed(1)}}</span>
                      <span class="Symbol" v-if="item.UseType == 0">￥</span>
                      <span v-else>折</span>
                    </van-col>
                    <van-col span="14">
                      <div class="right">
                        <span class="quan">{{item.CouponName}}</span>
                        <p class="fontSmall">有效期:{{item.ExpireDate}}</p>
                        <p
                          style="color:#999;font-size: 0.24rem;"
                        >适用范围:{{item.OrganizationRangeType}}</p>
                      </div>
                    </van-col>
                  </van-row>
                  <!-- <p class="card">卡号：{{item.CardNo}}</p> -->
                  <van-divider
                    dashed
                    :style="{margin:'0.48rem 0 0 0',padding: '0 0.34rem',borderColor:'#5BA1E7' }"
                  ></van-divider>
                  <van-row type="flex" justify="space-between" align="center" class="bottom">
                    <van-col span="6" style="margin-left:0.41rem;">
                      <!-- <img src="../../assets/images/type0.png" v-if="item.ApplicableType=='通用'" />
                      <img
                        src="../../assets/images/type1.png"
                        v-else-if="item.ApplicableType=='商品类别'"
                      />
                      <img
                        src="../../assets/images/type2.png"
                        v-else-if="item.ApplicableType=='商品信息'"
                      />
                      <img
                        src="../../assets/images/type3.png"
                        v-else-if="item.ApplicableType=='商品品牌'"
                      /> -->
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
                      <!-- <van-icon name="shop" size="20px" style="vertical-align:middle;" v-else /> -->
                      <span style="margin-left: 0.1rem;color: rgb(153, 153, 153);">{{item.ApplicableType}}</span>
                    </van-col>
                    <van-col span="10">
                      <span>数量*{{item.CouponNum}}</span>
                      <span class="duihuan">已过期</span>
                    </van-col>
                  </van-row>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>

      <!-- <van-button type="info" @click="submit" style="margin-top:0.4rem;border-radius: 0.1rem;">兑换优惠券</van-button> -->
    </div>
    <div class="zero" v-else>
      <!-- <img src="../../assets/images/zero.png" alt /> -->
      <i class="iconfont iconyouhuiquan"></i>
      <p>您没有过期的券哦</p>
    </div>
    <!-- 底部 -->
    <!-- <CommonBottom></CommonBottom> -->
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
      searchValue: "",
      active: "",
      yhqTypes: [],
      yhqList: [],
      page: 0,
      rows: 15,
      total: 0,
      loading: false,
      finished: false,
      isLoading: false
    };
  },
  methods: {
    back() {
      this.$router.push({
        name: "index"
      });
    },
    /**
     * 优惠券类别切换
     */
    handleChange() {
      this.getYhqList();
    },
    /**
     * 获取优惠券列表
     */
    getYhqList() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        loadingType: "spinner",
        message: "加载中..."
      });
      this.http
        .get("/api/services/app/CRMMemberCouponService/GetMemberCoupon", {
          params: {
            CouponCatalogId: this.active === -1 ? "" : this.active,
            CouponName: this.searchValue,
            page: this.page,
            rows: this.rows,
            IsExpire: true
          }
        })
        .then(res => {
          console.log(res);
          this.isLoading = false;
          this.loading = false;

          if (res.Result.Code === 0) {
            this.total = res.Result.Total;
            if (this.page == 1) {
              this.yhqList = res.Result.Rows;
            } else {
              this.yhqList.push(...res.Result.Rows);
            }
            if (
              this.yhqList.length === 0 ||
              Math.ceil(this.total / this.rows) == this.page
            ) {
              this.finished = true;
            } else {
              this.finished = false;
            }
          } 
          // else {
          //   this.$toast({
          //     message: "获取优惠券失败!!",
          //     duration: 2000
          //   });
          // }
          this.$toast.clear();
        });
    },
    /**
     * 获取优惠券类型
     */
    getYhqType() {
      this.http
        .get("/api/services/app/CRMMemberCouponService/GetCouponCatalo")
        .then(res => {
          console.log(res);
          if (res.Result.Code === 0) {
            this.yhqTypes = res.Result.Data;
            this.yhqTypes.unshift({
              Name: "全部",
              Code: null,
              Id: -1
            });
          }
          //  else {
          //   this.$toast({
          //     message: "获取优惠券类型失败!!",
          //     duration: 2000
          //   });
          // }
        });
    },
    submit() {
      this.$router.push({
        name: "quan"
      });
    },

    onLoad() {
      this.page++;
      this.getYhqList();
    },
    onRefresh() {
      this.page = 1;
      this.getYhqList();
    }
  },
  created() {
    this.getYhqType();
  }
};
</script>
<style scoped lang="scss" type="text/scss">
.banner {
  width: 100%;
  padding: 0.12rem 0.4rem;
}
.van-cell {
  margin-top: 0.11rem;
  border-radius: 0.1rem;
}
/* 券包 */
.list .item {
  background: url(../../assets/images/222.png) no-repeat;
  background-size: 100% 100%;
  height: 3.1rem;
  margin-top: 0.14rem;
  // color: #fff;
  position: relative;
  .card {
    text-align: center;
    color: #333;
    font-weight: bold;
    padding: 10px;
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
  font-size: 1.2rem;
 font-weight: 6rem;
  padding-left: 0.5rem;
  padding-top: 0.62rem;
}
.item .Symbol {
  position: absolute;
  left: 0.4rem;
  top: 0.4rem;
  font-size: 0.38rem;
  font-weight: 6rem;
  color: rgba(252, 153, 126, 1);
}
.item .quan {
  font-size: 0.3rem;
  /* color: #333333; */
  font-weight: 6rem;
}
.item .bottom {
  font-size: 0.24rem;
}

.item .bottom img {
  width: 0.35rem;
  height: 0.35rem;
  margin-right: 0.11rem;
}
.item .bottom .duihuan {
  padding: 0.15rem 0.3rem;
  border-radius: 0.2rem;
  background: #f6f3f7;
  margin-left: 0.2rem;
  color: #999999;
}
.common {
  .van-tabs__nav {
    background-color: inherit !important;
  }
  .van-tabs__content {
    margin-top: 0.2rem;
  }
  .van-button--normal {
    width: 100%;
    padding: 0 0.1rem;
    font-size: 0.28rem;
  }
}

.fontSmall {
  font-size: 0.24rem;
  padding: 0.09rem 0;
  color: #999999;
}
.zero {
  margin-top: 1.9rem;
  // margin-bottom: 4rem;
  text-align: center;
  color: #999999;
  font-size: 0.32rem;
}

/deep/.van-icon.van-icon-search {
  font-size: 0.48rem;
}
/deep/.van-tabs--line .van-tabs__wrap {
  height: 0.88rem;
}
/deep/.van-tabs__nav--line {
  padding-bottom: 0.3rem;
}
/deep/.van-tab {
  padding: 0 0.1rem;
  color: #7d7e80;
  font-size: 0.28rem;
  line-height: 0.88rem;
}
/deep/.van-tabs__line {
  bottom: 0.3rem;
  left: 0;
  z-index: 1;
  height: 0.06rem;

  border-radius: 0.06rem;
}
/deep/.van-cell {
  padding: 0.2rem 0.32rem;

  font-size: 0.28rem;
  line-height: 0.48rem;
}
/*覆盖van默认样式*/
/deep/ {
  .van-row {
    padding-top: 0.38rem;
    padding-left: 0.1rem;
  }
  .van-tabs__nav {
    background: none;
  }

  .van-tab.van-tab--active {
    font-weight: bold;
  }

  .van-tabs__line {
    background-color: #5a83fb;
  }
  .van-field__control {
    font-size: 0.25rem;
    font-family: unset;
  }
}
</style>
