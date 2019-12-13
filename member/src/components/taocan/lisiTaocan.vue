<template>
  <div>
    <!-- 头部 -->
    <heade title="历史套餐"></heade>
    <!-- banner -->
    <div class="banner">
      <van-cell-group>
        <van-field placeholder="输入搜索内容" right-icon="search" @click-right-icon="getRecordList" />
      </van-cell-group>
      <!-- 历史套餐列表 -->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="false"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="box" v-for="(item, index) in recordList" :key="index">
            <div class="ka1">
              <img class="red" src="../../assets/images/chuo.png" alt />
              <div class="fl">
                <p class="tongyong">{{item.ComboName}}</p>
                <p class="time">{{item.SourceType}}</p>
                <span class="riqi"></span>
              </div>
              <div class="fr">
                <p>{{item.RemainAmout}}</p>
                <p class="yuan">元</p>
              </div>
            </div>

            <span class="more" @click="gotoJili">查看使用记录</span>
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
      recordList: [],
      page: 1,
      rows: 10,
      total: 0,
      loading: false,
      finished: false,
      isLoading: false,
      comId: ""
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },

    //获取历史套餐
    getRecordList() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        loadingType: "spinner",
        message: "加载中..."
      });
      this.http
        .get("/api/services/app/CRMMemberComboService/GetMemberCombo", {
          params: {
            IsUse: true,
            page: this.page,
            rows: this.rows
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
            console.log(res.Result.Rows);
            if (res.Result.Total <= this.rows) this.finished = true;
            if (this.page == 1)
              (this.recordList = res.Result.Rows),
                res.Result.Rows.map(item => {
                  this.comId = item.ComboId;
                });
            else this.recordList.push(...res.Result.Rows);
          }
          this.$toast.clear();
        });
    },
    /**
     * 查看使用记录
     */
    gotoJili() {
      this.$router.push({
        name: "tcRecord",
        query: {
          id: this.comId,
          page: this.page,
          rows: this.rows
        }
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
.box {
  background: url(../../assets/images/taocan2.png) no-repeat;
  background-size: 100% 100%;
  height: 3.06rem;
  opacity: 1;
  border-radius: 0.1rem;
}
.box .ka1 .red {
  width: 1.6rem;
  height: 1.6rem;
  position: absolute;
  left: 40%;
  margin-top: 0.3rem;
}
.box .ka1 {
  width: 100%;
  height: 100%;
}
.ka1 .img {
  display: inline-block;
  position: absolute;
  width: 1.85rem;
  height: 1.85rem;
}
.ka1 .tongyong {
  padding: 0.5rem 0.48rem;
}
.ka1 .riqi {
  padding-left: 0.28rem;
  font-size: 0.12rem;
}
.ka1 .time {
  text-align: center;
  font-size: 0.3rem;
  margin: 0.37rem 0 0.6rem;
}
.ka1 .fl {
  float: left;
  color: #fff;
}
.ka1 .fr {
  float: right;
  margin-right: 0.5rem;
  margin-top: 10%;
  color: #333333;
  font-size: 0.6rem;
  text-align: center;
}
.ka1 .fr .yuan {
  font-size: 0.3rem;
  margin-top: 0.15rem;
}
.buttons {
  /* margin: 0.18rem auto; */
  text-align: center;
  line-height: 0.35rem;
  font-size: 0.28rem;
  color: #333;
}
.more {
  position: relative;
  bottom: 0.5rem;
  left: 40%;
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
    background: rgba(255,255,255,1);
    box-shadow: 0px 2px 6px 0px rgba(3,0,6,0.1);
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
}
</style>