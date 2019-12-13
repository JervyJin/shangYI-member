<template>
  <div>
    <!-- 头部 -->
    <heade title="优惠券"></heade>
    <!-- banner -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="banner">
          <div class="box">
                <div class="item" v-for="item in yhqList" :key="item.Id">
                  <div @click="goToDetail(item.Id)">
                    <div :class="['son',
                item.ApplicableType=='通用'?'son1':item.ApplicableType=='分类'?'son2':item.ApplicableType=='商品'?'son3':'son4']">
                      <span class="son-type">{{item.ApplicableType}}</span>
                      <span class="money">{{item.DiscountAmount}}</span>
                      <div class="right">
                        <span class="quan">优惠券</span>
                        <p>{{item.ExpireDateType =='自定义日期' ? item.ExpireBeginDate.substring(0, 10) + '~' +item.ExpireEndDate.substring(0, 10) : item.ExpireDateType}}</p>
                        <p>适用范围：{{item.OrganizationRangeType}}</p>
                      </div>
                    </div>
                  </div>
                  <p class="p1">{{item.Name}}</p>
                  <p class="p2">{{item.NeedIntegral}}积分</p>
                </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
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
      this.$router.go(-1);
    },
    /**
     * 查询可供选择的优惠券
     */
    getChooseYhq() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        loadingType: 'spinner',
        message: '加载中...'
      });
      this.http.get('/api/services/app/CRMIntegralConversionService/GetCRMCoupon',{
        params: {
          page: this.page,
          rows: this.rows
        }
      }).then(res => {
        this.isLoading = false;
        this.loading = false;
        if(res.Result.Code === 0) {
          this.total = res.Result.Total
          if(this.page == 1) this.yhqList = res.Result.Rows
          else this.yhqList.push(...res.Result.Rows)
          if(this.yhqList.length === 0 || Math.ceil(this.total / this.rows) == this.page) {
            this.finished = true;
          } else {
            this.finished = false;
          }
        } 
        // else {
        //   this.$toast({
        //     message: '获取优惠券失败!!',
        //     duration: 2000
        //   });
        // }
        this.$toast.clear();
      })
    },
    /**
     * 优惠券详情
     * @param id 优惠券ID
     */
    goToDetail(id) {
      this.$router.push({
        name: 'quanDetail',
        query: {
          id: id
        }
      })
    },
    onLoad() {
      this.page ++;
      this.getChooseYhq()
    },
    onRefresh() {
      this.page = 1;
      this.getChooseYhq()
    }
  }
};
</script>
<style scoped>
.banner {
  width: 100%;
  padding: 0.12rem 0.4rem;
}
.box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.item {
  /* margin-right: 0.3rem; */
  padding: 0.1rem 0.12rem;
  margin-bottom: 0.2rem;
  width: 3.15rem;
  height: 3.06rem;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
}
.item .right {
  color: #ffffff;
  font-size: 0.22rem;

  line-height: 13px;
}
.item .p1 {
  color: #222;
  font-size: 0.24rem;
  font-weight: bold;
  line-height: 0.6rem;
}
.item .p2 {
  color: #3c6efd;
  font-size: 0.3rem;
}
.item .right .quan {
  font-size: 0.24rem;
  margin-left: 60px;
}
.son {
  position: relative;
}
.son-type {
  position: absolute;
  right: 0.2rem;
  top: 0.2rem;
  font-size: 0.24rem;
  color: white;
}
.son,
.son1 {
  width: 2.96rem;
  /* height: 1.89rem; */
  padding: 0.16rem;
  background: url(../../assets/images/1.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.son2 {
  background: url(../../assets/images/2.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.son3 {
  background: url(../../assets/images/3.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.son4 {
  background: url(../../assets/images/4.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.son .money {
  font-size: 0.86rem;
  color: #ffffff;
  font-weight: bold;
  margin-left: 0.35rem;
}
.son .money::before {
  content: "￥";
  font-size: 0.28rem;
  color: #ffffff;
  font-weight: bold;
  position: absolute;
  left: 10px;
}
</style>
