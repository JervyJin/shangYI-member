<template>
  <div>
    <!-- 头部 -->
    <heade title="我的券包"></heade>
    <!-- banner -->
    <div class="banner common">
      <van-tabs v-model="active" swipeable @change="handleChange" color="#3C6EFD">
        <van-tab v-for="item in yhqTypes" :title="item.Name" :name="item.Id" :key="item.Id">
          <van-field
            v-model="searchValue"
            placeholder="输入搜索内容"
            right-icon="search"
            @click-right-icon="getYhqList"
            class="searchContent"
          />
        </van-tab>
      </van-tabs>

      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" v-if="this.total>0">
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
                  <span v-if="item.UseType == 0" class="Symbol">￥</span>
                  <span v-else>折</span>
                </van-col>
                <van-col span="14">
                  <div class="right">
                    <span class="quan">{{item.CouponName}}</span>
                    <p class="fontSmall">有效期:{{item.ExpireDate}}</p>
                    <p style="color:#999;font-size: 0.24rem;">适用范围:{{item.OrganizationRangeType}}</p>
                  </div>
                </van-col>
              </van-row>
              <!-- <p class="card">卡号：{{item.CardNo}}</p> -->
              <van-divider
                dashed
                :style="{margin:'0.48rem 0 0 0',padding: '0 0.4rem',borderColor:'#5BA1E7' }"
              ></van-divider>
              <van-row type="flex" justify="space-between" align="center" class="bottom">
                <van-col span="6" style="margin-left:0.42rem;">
                  <img src="../../assets/images/type0.png" v-if="item.ApplicableType=='通用'" />
                  <img src="../../assets/images/type1.png" v-else-if="item.ApplicableType=='商品类别'" />
                  <img src="../../assets/images/type2.png" v-else-if="item.ApplicableType=='商品信息'" />
                  <img src="../../assets/images/type3.png" v-else-if="item.ApplicableType=='商品品牌'" />
                  <span
                    style="vertical-align:middle;color:#999;font-weight:600;"
                  >{{item.ApplicableType}}</span>
                </van-col>
                <van-col span="11">
                  <span>数量*{{item.CouponNum}}</span>
                  <span class="duihuan" @click="use(item.CardNo)">立即使用</span>
                </van-col>
              </van-row>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>

      <div class="zero" v-else>
        <img src="../../assets/images/zero.png" alt />
        <p style="margin-bottom:0.1rem;">您还没有优惠券哦</p>
      </div>
      <p class="guoqi" @click="goGuoqi()">点击查看过期优惠券</p>

      <van-button type="info" @click="submit" style="margin-top:0.5rem;border-radius: 0.1rem;">兑换优惠券</van-button>
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
      this.$router.push({
        name: "index"
      });
    },
    goGuoqi() {
      this.$router.push({
        name: "guoqiquan"
      });
    },
    /**
     * 优惠券类别切换
     */
    handleChange() {
      this.getYhqList();
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
          // else {
          //   this.$toast({
          //     message: "获取优惠券类型失败!!",
          //     duration: 2000
          //   });
          // }
        });
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
            IsExpire: false
          }
        })
        .then(res => {
          console.log(res);
          this.isLoading = false;
          this.loading = false;

          if (res.Result.Code === 0) {
            this.total = res.Result.Total;
            // console.log(this.total)
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

    submit() {
      this.$router.push({
        name: "quan"
      });
    },
    /**
     * 立即使用
     * @id 券包标识
     */
    use(id) {
      this.$router.push({
        name: "payQuan",
        query: {
          id: id
        }
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
  mounted() {
    this.getYhqType();
    this.getYhqList();
  }
};
</script>
<style scoped lang="scss" type="text/scss">
body {
  background-color: #efedf2 !important;
}
.banner {
  width: 100%;
  padding: 0.12rem 0.4rem;
}

/* 券包 */
.list .item {
  background: url(../../assets/images/222.png) no-repeat;
  background-size: 100% 100%;
  height: 3.1rem;
  margin-top: 0.14rem;
  .card {
    text-align: center;
    color: #333;
    font-weight: bold;
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
.item{
  position: relative;
}
.item .money {
  font-size: 1.22rem;
  /* color: #fc997e; */
  font-weight: 6rem;
  padding-left: 0.86rem;
  padding-top: 0.62rem;
}
.item .Symbol {
  position: absolute;
  left: 0.58rem;
  top:0.4rem;
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
  background: #5ba1e7;
  margin-left: 0.2rem;
  color: #fff;
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
.van-button {
  height: 0.88rem;
}
.van-row {
  padding-top: 0.38rem;
  padding-left: 0.1rem;
}

.fontSmall {
  font-size: 0.24rem;
  padding: 0.1rem 0;
  color: #999999;
}
.zero {
  margin-top: 1.9rem;
  // margin-bottom: 4rem;
  text-align: center;
  color: #999999;
  font-size: 0.32rem;
}
.guoqi {
  color: #5ba1e7;
  font-size: 0.24rem;
  text-align: center;
  font-weight: 700;
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

  height: 0.06rem;

  border-radius: 0.06rem;
}
/deep/.van-cell {
  padding: 0.2rem 0.32rem;
  margin-top: 0.11rem;
  border-radius: 0.1rem;
  font-size: 0.28rem;
  line-height: 0.48rem;
  background-color: #fff;
}
/*覆盖van默认样式*/
/deep/ {
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
