<template>
  <div>
    <heade title="消费记录"></heade>
    <div class="banner">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="false"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <img v-show="!no_data" src="../../assets/img/No-data.jpg" alt />
          <div class="tradtime" v-for="(item, index) in recordList" :key="index">
            <van-row type="flex" justify="space-between">
              <van-col span="6" vertical-align="middle">
                <!-- <img src="../../assets/images/clock.png" alt /> -->
                <i class="iconfont iconyuyue"></i>
                <span class="time">交易时间</span>
              </van-col>
              <van-col span="12">
                <span class="times">{{item.CreatorTime}}</span>
              </van-col>
            </van-row>
            <van-divider />

            <van-row>
              <van-col span="6">
                <span class="item-label">结算金额</span>
              </van-col>
              <van-col span="10" offset>
                <span class="item-content">{{item.PayAmount}}元</span>
              </van-col>
            </van-row>

            <van-row>
              <van-col span="6">
                <span class="item-label">交易状态</span>
              </van-col>
              <van-col span="10" offset>
                <span
                  :class="item.TransactionState==0?'zhuangtai':'zhuangtai-error'"
                >{{item.TransactionState==0?'交易成功':'交易失败'}}</span>
              </van-col>
            </van-row>

            <van-row>
              <van-col span="6">
                <span class="item-label">交易机构</span>
              </van-col>
              <van-col span="10" offset>
                <span class="item-content">{{item.OrganizationName}}</span>
              </van-col>
            </van-row>

            <van-row>
              <van-col span="6">
                <span class="item-label">交易流水号</span>
              </van-col>
              <van-col span="10" offset>
                <span class="item-content">{{item.ReceiptCode}}</span>
              </van-col>
            </van-row>

            <van-row>
              <van-col span="6">
                <span class="item-label">订单号</span>
              </van-col>
              <van-col span="10" offset>
                <span class="item-content">{{item.OrderCode}}</span>
              </van-col>
            </van-row>

            <van-divider />
            <div class="buttons">
              <button class="button1" @click="xiangqing(item.Id)">详情</button>
              <button class="button2" @click="zuiping(item.Id)" v-if="item.EvaluateState">追评</button>
              <button class="button2" @click="pingjia(item)" v-else>评价</button>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
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
      recordList: [],
      page: 1,
      rows: 15,
      total: 0,
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      no_data:true
    };
  },
  methods: {
    getRecordList() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        loadingType: "spinner",
        message: "加载中..."
      });
      this.http
        .get("/api/services/app/MemberExpendService/GetExpendRecord", {
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
          } else {
            this.finished = false;
          }
          if (res.Result.Code === 0) {
            this.total = res.Result.Total;
            if(this.total){
              this.no_data = false;
            }
            // console.log(this.total);
            // console.log(this.no_data);
            console.log(res.Result.Rows);
            if (res.Result.Total <= this.rows) this.finished = true;
            if (this.page == 1) this.recordList = res.Result.Rows;
            else this.recordList.push(...res.Result.Rows);
          }
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
    },
    xiangqing(id) {
      this.$router.push({
        path: "/detail",
        query: {
          id: id
        }
      });
    },
    pingjia(item) {
      this.$router.push({
        path: "/pingjia",
        query: {
          id: item.Id,
          OrganizationId: item.OrganizationId,
          OrganizationCode: item.OrganizationCode,
          OrganizationName: item.OrganizationName
        }
      });
    },
    zuiping(id) {
      this.$router.push({
        path: "/zuiping",
        query: {
          id: id
        }
      });
    }
  },
  created() {
    this.getRecordList();
  }
};
</script>

<style scoped lang="scss" type="text/scss">
.banner {
  width: 100%;
  padding: 0.12rem 0.4rem;
}
.iconyuyue {
  color: #3c6efd;
  font-size: 0.3rem;
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
  .times {
    display: inline;
    color: #999999;
  }
  .item-label {
    font-size: 0.24rem;
    color: #999;
    font-weight: 6rem;
    font-family: "Microsoft YaHei Light";
  }
  .item-content {
    font-size: 0.24rem;
    color: #333333;
    font-weight: 6rem;
  }
  .zhuangtai {
    color: #49cb8a;
  }
  .zhuangtai-error {
    color: #fc997e;
  }
}

.van-divider {
  margin: 0;
}
.buttons {
  height: 0.98rem;
  line-height: 0.98rem;
}
.button1 {
  color: rgba(51, 51, 51, 1);
  font-size: 0.24rem;
  width: 1.65rem;
  height: 0.61rem;
  line-height: 0.61rem;
  text-align: center;
  opacity: 1;
  background: #ffffff;
  border: 1px solid #5ba1e7;
  margin-left: 2.3rem;
  margin-right: 0.1rem;
  border-radius: 10px 10px 10px 10px;
}
.button2 {
  color: #ffffff;
  font-size: 0.24rem;
  width: 1.65rem;
  height: 0.61rem;
  line-height: 0.61rem;
  text-align: center;
  opacity: 1;
  background: #5ba1e7;
  margin-left: 0.08rem;
  border-radius: 10px 10px 10px 10px;
}
</style>
