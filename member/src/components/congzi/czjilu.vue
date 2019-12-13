<template>
  <div>
    <!-- 头部 -->
    <heade title="充值记录"></heade>
    <!-- banner -->
    <div class="banner">
      <div class="box" style="border-radius: 0.1rem;">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-row
              class="item"
              type="flex"
              justify="space-between"
              v-for="(item,index) in recordList"
              :key="index"
              
            >
              <van-col span="12">
                <div class="left">
                  <p>我的消费记录</p>
                  <p class="times">{{item.CreatorTime}}</p>
                </div>
              </van-col>
              <van-col span="6">
                <div class="right">
                  <p>{{item.Amount}}</p>
                  <p class="times">{{item.SourceType}}</p>
                </div>
              </van-col>

              <van-col span="1">
                <van-icon name="arrow" @click="goDetail(item.Id)"/>
              </van-col>
            </van-row>

            <van-divider />
          </van-list>
          <!-- <van-divider /> -->
        </van-pull-refresh>
      </div>
    </div>

    <!-- 底部 -->
    <!-- <CommonBottom></CommonBottom> -->
  </div>
</template>
<script>
import heade from "../common/heade";
// import CommonBottom from "../common/CommonBottom";

export default {
  components: {
    heade
  },
  data() {
    return {
      recordList: [],
      isLoading: false,
      loading: false,
      finished: false,
      page: 1,
      rows: 10,
      total: 0,
      data: {}
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    onLoad() {
      this.page++;
      this.getList();
    },
    onRefresh() {
      this.page = 1;
      this.getList();
    },

    // 充值记录
    getList() {
      this.http
        .get("/api/services/app/MemberAmountService/GetRechargeRecord", {
          params: {
            page: this.page,
            rows: this.rows,
            sort: "CreatorTime",
            order: "desc"
          }
        })
        .then(res => {
          console.log(res);
          this.isLoading = false;
          this.loading = false;
          if (Math.ceil(this.total / this.rows) == this.page) {
            this.finished = true;
          }
          if (res.Result.Code === 0) {
            this.total = res.Result.Total;
            // console.log(res.Result.Rows);
            if (res.Result.Total <= this.rows) this.finished = true;
            if (this.page == 1) this.recordList = res.Result.Rows;
            else this.recordList.push(...res.Result.Rows);
          }
          this.$toast.clear();
        });
    },

    /**查看详情 */
    goDetail(id){
      console.log(2222222222)
      this.$router.push({
        path:"/czDetail",
        query:{id:id}
      })
    }
  },
  created() {
    this.getList();
  }
};
</script>
<style scoped>
.banner {
  width: 100%;
  padding: 0.12rem 0.4rem;
}
.box {
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
}
.box .item {
  padding: 0.23rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 0.38rem;
}
.times {
  font-size: 0.22rem;
  color: #999999;
}
</style>