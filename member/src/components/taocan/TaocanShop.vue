<template>
  <div>
    <heade title="门店列表"></heade>
    <div class="banner">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          :immediate-check="false"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="md-item" v-for="item in mdList" :key="item.Id">
            <div class="md-name">
              <i class="iconfont iconweibiaoti--1"></i>
              <span class="name">{{item.Name}}</span>
            </div>
            <div class="md-address">
              <span>{{item.Address===null? '测试地址' : item.Address}}</span>
              <span>
                <i class="iconfont icondingweiweizhizuobiaoxianxing"></i>
                <span class="distance">{{item.Distance}}km</span>
              </span>
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
  name: "TaocanShop",
  components: {
    heade
  },
  data() {
    return {
      mdList: [],
      page: 1,
      rows: 15,
      total: 0,
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
    };
  },
  methods: {
    getMdList() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        loadingType: "spinner",
        message: "加载中..."
      });

      this.http
        .get(
          "/api/services/app/CRMMemberComboService/GetCRMComboOrganizationRange",
          {
            params: {
              ComboId: this.$route.query.ComboId,
              page: this.page,
              rows: this.rows
            }
          }
        )
        .then(res => {
          console.log(res);
          this.isLoading = false;
          this.loading = false;
          // this.finished = true;
          if (Math.ceil(this.total / this.rows) == this.page) {
            this.finished = true;
          }
          if (res.Result.Code === 0) {
            this.total = res.Result.Total;
            if (res.Result.Total <= this.rows) this.finished = true;
            if (this.page == 1) this.mdList = res.Result.Rows;
            else this.mdList.push(...res.Result.Rows);
          }
          this.$toast.clear();
        });
    },
    onLoad() {
      this.page ++;
      this.getMdList();
    },
    onRefresh() {
      this.page = 1;
      this.getMdList();
    }
  },
  created() {
    this.getMdList()
  }
};
</script>

<style scoped lang="scss" type="text/scss">
.banner {
  width: 100%;
  padding: 0.12rem 0.4rem;
}
.van-pull-refresh{
  overflow: initial;
}
.md-item {
  padding: 0.12rem 0.16rem;
  background-color: white;
  border-radius: 0.06rem;
  box-shadow: 0 0 4px 2px rgba($color: #000000, $alpha: .04);
  .md-name {
    display: flex;
    align-items: center;
    .iconfont{
      font-size: 0.32rem;
      color: #3C6EFD;
      margin-right: 0.08rem;
    }
    span {
      font-size: 0.28rem;
      color: #333;
    }
  }
  .md-address {
    margin-top: 0.1rem;
    font-size: 0.24rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span:first-child {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    span:last-child {
      display: flex;
      align-items: center;
      width: 1.4rem;
    }
    .iconfont, .distance{
      font-size: 0.2rem;
      color: #999;
    }
  }
  img {
    width: 0.4rem;
    height: 0.4rem;
  }
}
.md-item:not(:first-child) {
  margin-top: 0.2rem
}
</style>
