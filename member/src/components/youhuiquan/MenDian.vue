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
              <img src="../../assets/images/mendian.png" alt />
              <span>{{item.Name}}</span>
            </div>
            <div class="md-address">
              <span>123123123123123</span>
              <span>
                <img src="../../assets/images/mendian.png" alt />
                <span>1.03km</span>
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
  name: "MenDian",
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
      isLoading: false
    };
  },
  methods: {
    getMdList() {
      this.http
        .get(
          "/api/services/app/CRMIntegralConversionService/GetCRMMarketingOrganizationRange",
          {
            params: {
              CouponId: this.$route.query.id,
              page: this.page,
              rows: this.rows
            }
          }
        )
        .then(res => {
          this.isLoading = false;
          this.loading = false;
          if (Math.ceil(this.total / this.rows) == this.page) {
            this.finished = true;
          }
          if (res.Result.Code === 0) {
            this.total = res.Result.Total;
            if (res.Result.Total <= this.rows) this.finished = true;
            if (this.page == 1) this.mdList = res.Result.Rows;
            else this.mdList.push(...res.Result.Rows);
          }
        });
    },
    onLoad() {
      this.page++;
      this.getMdList();
    },
    onRefresh() {
      this.page = 1;
      this.getMdList();
    }
  },
  created() {
    this.getMdList();
  }
};
</script>

<style scoped lang="scss" type="text/scss">
.banner {
  width: 100%;
  padding: 0.12rem 0.4rem;
}
.md-item {
  padding: 5px 10px;
  background-color: white;
  border-radius: 5px;
  .md-name {
    display: flex;
    align-items: center;
    span {
      font-size: 16px;
      margin-left: 5px;
      color: black;
    }
  }
  .md-address {
    margin-top: 5px;
    font-size: 14px;
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
      width: 70px;
    }
  }
  img {
    width: 20px;
    height: 18px;
  }
}
.md-item:not(:first-child) {
  margin-top: 10px;
}
</style>
