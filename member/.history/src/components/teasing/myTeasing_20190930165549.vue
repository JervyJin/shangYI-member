<template>
  <div>
    <heade title="我的吐槽"></heade>
    <div class="banner">
      <van-tabs @click="handleClick" color="#1989fa">
        <van-tab
          v-for="(item, index) in types"
          :key="index"
          :title="item.name"
        
        >
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <!-- <van-panel
                :title="item.ComplaintOrganizationName"
                :desc="item.Content"
                icon="shop-o"
                :status="item.CreatorTime"
                v-for="(item,index) in list"
                :key="index"
                @click="teasingDetail(item.Id,item.ComplaintOrganizationId)"
              ></van-panel> -->


              <div class="wap" v-for="(item,index) in list" :key="index">
                  <div class="title" @click="teasingDetail(item.Id,item.ComplaintOrganizationId)">
                  <div class="fl">
                    <van-icon name="shop" style="vertical-align: middle;margin-right:0.1rem"/>
                    <span class="name">{{item.ComplaintOrganizationName}}</span>
                  </div>
                  <div class="fr">
                    <span class="time">{{item.CreatorTime}}</span>
                    <van-icon name="arrow" style="vertical-align: middle;margin-left:0.1rem"/>
                  </div>
                </div>
                <p>{{item.Content}}</p>
                <van-divider />
              </div>


            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
      <van-button type="info" size="large"  @click="teasing">我要吐槽</van-button>
      <CommonBottom></CommonBottom>
    </div>
  </div>
</template>

<script>
import heade from "../common/heade";
import CommonBottom from "../common/CommonBottom";
import { debuglog } from "util";
export default {
  components: {
    heade,
    CommonBottom
  },
  data() {
    return {
      types: [
        {
          name: "未处理",
          state: false
        },
        {
          name: "已处理",
          state: true
        }
      ],
      page: 1,
      rows: 15,
      total: 0,
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      state: false
    };
  },
  methods: {
    handleClick(name, title) {
      this.page = 1;
      this.finished = false;
      this.state = name == 1;
      // this.state = name
      //this.getLists();
    },
    teasingDetail(id, uuid) {
      this.$router.push({
        name: "teasingDetail",
        query: {
          id: id,
          uuid: uuid
        }
      });
    },
    teasing() {
      this.$router.push("teasing");
    },
    /**
     * 获取吐槽门店处理详情
     */
    getLists() {
      this.http
        .get("/api/services/app/MemberComplaintService/GetMemberComplaints", {
          params: {
            State: this.state,
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
          if (res.Result.Code === 0) {
            this.total = res.Result.Total;
            var thisPage = this.page;
            if (this.page == 1) {
              this.list = res.Result.Rows;
            } else {
              this.list.push(...res.Result.Rows);
            }
            this.page++;
            var totalPage = Math.ceil(this.total / this.rows);

            if (this.list.length === 0 || totalPage == thisPage) {
              this.finished = true;
            } else {
              this.finished = false;
            }
          }
        });
    },
    onLoad() {
      this.getLists();
    },
    onRefresh() {
      this.page = 1;
      this.getLists();
    }
  },
  created() {}
};
</script>

<style scoped lang="scss">
.banner {
  width: 100%;
  padding: 0.12rem 0.4rem;
}

.wap {
  padding: 0.28rem;
  margin: 0.2rem auto 0;
  border-radius: 0.1rem;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  font-size: 0.28rem;
  color: #333333;
  .title {
  clear: both;
  color: #999999;
  .fl{
    float: left;
    .name{
      font-size: 0.24rem;
    }
  }
  .fr{
    float: right;
    .time{
      font-size: 0.2rem;
    }
  }
}
p{
  margin-top: 0.4rem;
  color: #333;
  font-size: 0.28rem;
  font-family: "Microsoft YaHei Regular";
  font-weight: 6rem !important;
  overflow: hidden;/*超出部分隐藏*/
    text-overflow:ellipsis;/* 超出部分显示省略号 */
    white-space: nowrap;/*规定段落中的文本不进行换行 */
    width: 5rem;/*需要配合宽度来使用*/
}
}





/*覆盖van默认样式*/
/deep/ {
  .van-button--large {
  height: 0.9rem;
  line-height: 0.88rem;
  border-radius: 0.1rem;
  font-size: 0.3rem;
 margin:1rem 0;
}
.van-cell {
   
    padding: 0.3rem 0.3rem;
    overflow: hidden;
    color: #323233;
    font-size: 0.28rem;
    line-height: 0.48rem;
    background-color: #fff;
}
.van-tab{
  padding: 0 0.1rem;
    color: #7d7e80;
    font-size: 0.28rem;
    line-height: 0.88rem;
}
  .van-tabs__nav {
    background: none;

    .van-ellipsis {
      font-size: 0.2rem;
    }
  }
.van-tabs--line .van-tabs__wrap {
    height: 0.88rem;
}
  .van-tab.van-tab--active {
    font-weight: bold;
  }
.van-tabs__nav--line {
   
    padding-bottom:0.3rem;
}
.van-tabs__line {
    // background-color: #5a83fb;
    width: 0.84rem;
    bottom: 0.3rem;
    height: 0.06rem;
  }
  .van-panel__header-value {
    color: #999;
    font-size: 0.2rem;
  }
  .van-cell__title span {
    color: #999;
  }

}
</style>
