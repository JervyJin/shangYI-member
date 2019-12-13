<template>
  <div>
    <!-- 头部 -->
    <heade title="账户余额"></heade>

    <!-- banner -->
    <div class="banner">
      <div class="top">
        <div class="left" @click="onTab(0)">
          <p>账户余额</p>
          <p class="number">{{data.RechargeAmount}}</p>
          <i class="active" v-if="activeTab===0"></i>
        </div>
        <div class="right" @click="onTab(1)">
          <p>账户红包</p>
          <p class="number">{{data.HongBaoAmount}}</p>
          <i class="active" v-if="activeTab===1"></i>
        </div>
      </div>
      <!-- 余额list -->
      <van-pull-refresh v-model="isLoading1" @refresh="onRefresh1" v-if="this.total1>0">
        <van-list
          v-model="loading1"
          :finished="finished1"
          finished-text="没有更多了"
          v-if="this.activeTab===0"
          @load="onLoad1"
        >
          <div class="panel">
            <van-panel
              :title="item.SourceType+''"
              :desc="item.CreatorTime"
              :status="item.Amount+'元'"
              v-for="(item,index) in yueList"
              :key="index"
              
            >
      
            </van-panel>
          </div>
        </van-list>
      </van-pull-refresh>
      <!-- 红包list -->
      <van-pull-refresh v-model="isLoading2" @refresh="onRefresh2" v-if="this.total2>0">
        <van-list
          v-model="loading2"
          :finished="finished2"
          v-if="this.activeTab===1"
          finished-text="没有更多了"
          @load="onLoad2"
        >
          <div class="panelFont">
            <div v-for="(item,index) in hongbaoList" :key="index">
              <div class="content">
                <p class="fl">
                  <span class="type">{{item.HongBaoName}}</span>
                  <span class="status_1" v-if="item.State==='未使用'">未使用</span>
                  <span class="status_2" v-if="item.State==='已使用'">已使用</span>
                  <span class="status_3" v-if="item.State==='已过期'">已过期</span>
                </p>
                <p
                  class="fr"
                  :class="['state',item.State==='未使用' ? 'color1':'color2']"
                >{{item.HongBaoAmount}}</p>
              </div>
              <p class="time">{{item.ExpireDate}}</p>
            </div>
            <van-divider :style="{ color: '#1989fa', margin: '0.1rem 0' }" v-if="hongbaoList.length>1"/>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import heade from "../common/heade";
// import myScroll from "../common/vue-scroll.vue";

export default {
  components: {
    heade
    // myScroll
  },
  data() {
    return {
      data: {},
      yueList: [],
      hongbaoList: [],
      activeTab: 0,
      page1: 1,
      page2: 1,
      rows: 20,
      total1: 0,
      total2: 0,
      loading1: false,
      loading2: false,
      finished1: false,
      finished2: false,
      isLoading1: false,
      isLoading2: false
    };
  },
  methods: {
    onTab(index) {
      this.activeTab = index;
    },
   // 获取余额记录
    getYueList() {
      this.http
        .get("/api/services/app/GetAmountService/GetAmountRecord", {
          params: {
            page: this.page1,
            rows: this.rows,
            sort: "CreatorTime",
            order: "desc"
          }
        })
        .then(res => {
          console.log(res);
          this.isLoading1 = false;
          this.loading1 = false;

          if (res.Result.Code === 0) {
            this.total1 = res.Result.Total;
            // console.log(this.total)
            if (this.page1 == 1) {
              this.yueList = res.Result.Rows;
            } else {
              this.yueList.push(...res.Result.Rows);
            }
            if (
              this.yueList.length === 0 ||
              Math.ceil(this.total1 / this.rows) == this.page1
            ) {
              this.finished1 = true;
            } else {
              this.finished1 = false;
            }
          } else {
            this.$toast({
              message: "获取优惠券失败!!",
              duration: 2000
            });
          }
          this.$toast.clear();
        });
    },
    // 获取红包记录
    getHongbaoList() {
      this.http
        .get("/api/services/app/GetAmountService/GetHongBaoRecord", {
          params: {
            page: this.page2,
            rows: this.rows,
            sort: "Id",
            order: "desc"
          }
        })
        .then(res => {
          console.log(res);
          this.isLoading2 = false;
          this.loading2 = false;

          if (res.Result.Code === 0) {
            this.total2 = res.Result.Total;
            // console.log(this.total)
            if (this.page2 == 1) {
              this.hongbaoList = res.Result.Rows;
            } else {
              this.hongbaoList.push(...res.Result.Rows);
            }
            if (
              this.hongbaoList.length === 0 ||
              Math.ceil(this.total2 / this.rows) == this.page2
            ) {
              this.finished2 = true;
            } else {
              this.finished2 = false;
            }
          } else {
          }
        });
    },

    onLoad1() {     
        this.page1++;
        this.getYueList();
    },
    onLoad2() {
        this.page2++;
        this.getHongbaoList();
    
    },
    onRefresh1() {
        this.page1 = 1;
        this.getYueList();
    },
    onRefresh2() {
        this.page2 = 1;
        this.getHongbaoList();
    }
  },

  created() {
    // 获取账户余额
    this.http
      .get("/api/services/app/GetAmountService/GetAmount", {
        params: {}
      })
      .then(res => {
        // console.log(res);

        this.data = res.Result.Data;
      });
  },
  mounted() {
    this.getYueList();
    this.getHongbaoList();
  }
};
</script>

<style scoped lang="scss">
.banner {
  width: 100%;
  padding: 0.12rem 0.4rem;
}

.top {
  margin-bottom: 32px;
  clear: both;
  padding: 0.25rem 0;
  height: 1.79rem;
  border-radius: 0.1rem;
  opacity: 1;
  background: rgba(91, 161, 231, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  color: #fff;
  display: flex;
  align-items: center;

  .left,
        .right {
            flex: 1;
            text-align: center;
            position: relative;
            .text{
                font-size: 0.2rem;
            }

            .number {
                font-size: .36rem;
            }
        }

        .left {
            position: relative;

            &:after {
                position: absolute;
                content: " ";
                width: 1px;
                height: 50%;
                border-right: 1px dashed white;
                right: 0;
                top: 30%;
            }
        }

        .active {
            position: absolute;
            left: 50%;
            bottom: -.42rem;
            width: 0;
            height: 0;
            transform: translateX(-50%);
            border-left: .4rem solid transparent;
            border-right: .4rem solid transparent;
            border-top: .4rem solid #5ba1e7;
        }
    }

    .left p,
    .right p {
        line-height: 0.7rem;
    }
    .list{
        border-radius: 0.14rem;
        box-shadow: rgba(3, 0, 6, 0.1) 0px 2px 6px 0px;
    }
.panel{
  border-radius: 0.1rem;
  box-shadow: rgba(3, 0, 6, 0.1) 0px 2px 6px 0px;
  background: rgba(255, 255, 255, 1);
  padding: 0 .24rem;
  /deep/.van-cell__title{
    >span{
      display: flex;
      font-size: 0.24rem;
      color: #333;
      margin-bottom: 0.16rem;
    }
  }
}
.panelFont {
  border-radius: 0.1rem;
  box-shadow: rgba(3, 0, 6, 0.1) 0px 2px 6px 0px;
  background: rgba(255, 255, 255, 1);
  padding: 0.31rem 0.22rem;
  .content {
    display: flex;
    justify-content: space-between;
    .fl {
      .type {
        color: #333;
        font-size: 0.24rem;
        font-weight: bold;
        margin-right: 0.03rem;
      }
      .status_1 {
        padding: 0.05rem 0.11rem;
        border: 1px solid #5ba1e7;
        font-size: 0.2rem;
        color: #5ba1e7;
        font-weight: bold;
        border-radius: 0.05rem;
      }
      .status_2 {
        padding: 0.05rem 0.11rem;
        border: 1px solid #c23131;
        font-size: 0.2rem;
        color: #c23131;
        font-weight: bold;
        border-radius: 0.05rem;
      }
      .status_3 {
        padding: 0.05rem 0.11rem;
        border: 1px solid #999999;
        font-size: 0.2rem;
        color: #999999;
        font-weight: bold;
        border-radius: 0.05rem;
      }
    }
    .color1 {
      color: #333333;
      font-size: 0.24rem;
      font-weight: bold;
    }
    .color2 {
      color: #999999;
      font-size: 0.24rem;
      font-weight: bold;
    }
  }
  .time {
    font-size: 0.2rem;
    color: #999999;
    font-weight: bold;
    margin-top: 0.15rem;
  }
}
// 覆盖van默认样式
.panelFont div {
  font-size: 0.23rem;
  line-height: 0.35rem;
  font-weight: 600;
}
.van-cell {
    padding: 0.1rem 0.16rem;
    font-size: 0.24rem;
    font-weight: 500;
    line-height: 0.48rem;
}
.van-cell__label {
    color: #999;
    font-size: 0.2rem;
    line-height: 0.18rem;
    margin-top: 0;
}
.panelFont .van-cell__label {
  font-size: 0.17rem;
}
.van-panel__header-value {
  color: #4ace8c;
}
.van-panel__header{
  padding: .18rem  0;
}
.van-hairline--top-bottom::after {
    border-width: 0;
}
.van-pull-refresh{
  overflow: initial;
}
</style>