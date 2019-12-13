<template>
  <div id="package">
    <!-- 头部 -->
    <heade title="我的套餐"></heade>

    <div class="banner">
      <van-cell-group>
        <van-field
          placeholder="输入搜索内容"
          right-icon="search"
          @click-right-icon="getRecordList"
          v-model="searchValue"
        />
      </van-cell-group>
      <div class="main">
        <div class="title" @click="gotoLishi()">
          <span>历史套餐 》</span>
          <span class="fr">共有{{total}}个套餐</span>
        </div>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="box" v-for="(item, index) in recordList" :key="index">
              <div @click="goToDetail(item.Id,item.ComboId)">
                <van-row class="ka1" type="flex" justify="space-between">
                  <van-col span="23">
                    <!-- <van-icon
                      name="shop"
                      size=".3rem"
                      style="vertical-align:middle;margin-left:10px;"
                    />-->
                    <div style="margin-top:0.22rem;" class="item">
                      <!-- <img src="../../assets/images/tcType0.png" v-if="item.DepositType=='通用'" /> -->
                      <i class="iconfont iconweibiaoti--1" v-if="item.DepositType=='通用'"></i>
                      <i class="iconfont iconliebiaoxingshi" v-if="item.DepositType=='分类'"></i>
                      <i class="iconfont iconkucun" v-if="item.DepositType=='商品信息'"></i>
                      <i class="iconfont iconpinpai" v-if="item.DepositType=='商品品牌'"></i>
                      <i class="iconfont icontaocanhuodong" v-if="item.DepositType=='券'"></i>
                    <span>{{item.DepositType}}</span>
                    </div>
                    <p class="tongyong">{{item.ComboName}}</p>
                    <!-- <p class="time">10次洗澡套餐</p> -->
                    <span class="riqi">有效期：{{item.ExpireDate}}</span>
                  </van-col>
                  <van-col span="10" class="span_10">
                    <p class="yuan">{{item.RemainAmout}}</p>
                    <p>元</p>
                  </van-col>
                </van-row>
              </div>

              <div class="buttons">
                <!-- <span>
                                  <img src="../../assets/images/dongjie.png" alt style="width: 60px;"/>
                </span>-->
                <button @click="goShare(item.Id)" v-show="item.IsShare==true">
                  <i class="iconfont iconfenxiang2"></i>分享
                </button>

                <button @click="give(item.ComboName, item.Id)" v-show="item.IsTransmit=='是'">
                  <i class="iconfont iconliwu"></i>赠送
                </button>
                <button @click="gopay(item.ComboId)" class="zifu">
                  <i class="iconfont iconcaigou"></i>支付
                </button>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
        <!-- 转赠弹窗 -->
        <van-dialog v-model="isShow" show-cancel-button :beforeClose="beforeClose" title="套餐转赠">
          <span class="subheading">{{givingName}}转赠</span>
          <van-field class="giving_input" v-model="phone" placeholder="输入会员手机号" />
        </van-dialog>
        <!-- 绑定新套餐 -->
        <van-button
          type="info"
          @click="submit"
          size="large"
          style="margin-top:0.4rem;border-radius: 0.1rem;"
        >绑定新套餐</van-button>
      </div>
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
      rows: 10,
      total: 0,
      loading: false,
      finished: false,
      isLoading: false,
      uuid: "",
      CBname: "",
      hisNum: {},
      isShow: false,
      phone: "",
      code: "",
      DepositType: 1,
      searchValue: "",
      givingName: ''
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },

    //获取历史套餐个数
    getNum() {
      this.http
        .get("/api/services/app/CRMMemberComboService/GetHisMemberComboCount", {
          params: {
            Name: this.CBname
          }
        })
        .then(res => {
          console.log(res);
          if (res.Result.Code === 0) {
            this.hisNum = res.Result.Data;
          }
        });
    },
    //获取套餐列表
    getRecordList() {
      // this.$toast.loading({
      //   duration: 0,
      //   forbidClick: true,
      //   loadingType: "spinner",
      //   message: "加载中..."
      // });\
      this.http
        .get("/api/services/app/CRMMemberComboService/GetMemberCombo", {
          params: {
            page: this.page,
            rows: this.rows,
            IsUse: false,
            Name: this.searchValue
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
    /**
     * 套餐详情
     * @param id 套餐ID
     */
    goToDetail(id, ComboId) {
      this.$router.push({
        path: "/tcDetail",
        query: {
          id: id,
          ComboId: ComboId
        }
      });
    },
    /**
     * 跳转到历史套餐页面
     */
    gotoLishi() {
      this.$router.push({
        path: "/lisiTaocan"
      });
    },

    // 赠送弹窗
    beforeClose(action, done) {
      if (action === "confirm") {
        if (!this.phone) {
          this.$toast("请输入手机号");

          done(false); //不关闭弹框
          return;
        } else if (!/^1[3456789]\d{9}$/.test(this.phone)) {
          this.$toast("手机号格式不正确");

          done(false); //不关闭弹框
          return;
        }

        this.http
          .put("/api/services/app/CRMMemberComboService/UpdateMemberCombo", {
            Id: this.uuid,
            Phone: this.phone
          })
          .then(res => {
            console.log(res);
            if (res.Result.Code === 0) {
              this.getRecordList();
              this.$toast({
                message: " 转赠成功!!",
                duration: 2000
              });
              this.phone = "";
              done();
            } else if (res.Result.Code === 2) {
              this.isShow = !this.isShow;
              setTimeout(() => {
                this.$router.push({
                  name: "give",
                  query: {
                    id: this.uuid
                  }
                });
              }, 2000);
            } else {
              this.phone = "";
            }
          })
          .catch(err => {});
      } else if (action === "cancel") {
        done(); //关闭
        this.phone = "";
      }
    },

    /**支付 */
    gopay(id) {
      this.$router.push({
        name: "pay",
        query: {
          ComboId: id
        }
      });
    },
    /**分享
     * 点击分享获取分享吗跳转路由并把分享码通过路由传参
     */
    goShare(id) {
      this.http
        .get("/api/services/app/CRMMemberService/GetComboShareCode", {
          params: {
            MemberComboId: id
          }
        })
        .then(res => {
          console.log(res);
          this.code = res.Result.Data.PaymentCode;

          this.$router.push({
            name: "share",
            query: {
              code: res.Result.Data.PaymentCode
            }
          });
          console.log(res);
        });
    },
    /**
     * 赠送
     *  */
    give(val, id) {
      this.givingName = val;
      this.uuid = id;
      this.isShow = !this.isShow;
    },
    //赠送
    // confirmEvent () {
    //     this.$dialog.alert({
    //       title: '套餐转赠',

    //     // message: '您确定要转赠当前优惠券吗?'

    //   }).then(() => {
    //     this.$toast.loading({
    //       duration: 0,
    //       forbidClick: true,
    //       loadingType: 'spinner',
    //       message: '加载中...'
    //     });
    //     this.http.put('/api/services/app/CRMMemberComboService/UpdateMemberCombo', {
    //       Id: this.uuid,

    //     }).then(res => {
    //       if(res.Result.Code === 0) {
    //         this.$toast({
    //           message: ' 转赠成功!!',
    //           duration: 2000
    //         });
    //         setTimeout(() => {
    //           this.$router.push({
    //             name: 'quanbao'
    //           })
    //         }, 2000)
    //       } else {
    //         this.$toast({
    //           message: res.Result.Message,
    //           duration: 2000
    //         });
    //       }
    //     }).catch((err) => {

    //     })
    //   }).catch(() => {
    //     this.$toast({
    //       message: '赠送失败!!',
    //       duration: 2000
    //     });
    //     this.$toast.clear();
    //   });
    // },
    /**
     * 绑定新套餐
     *  */
    submit() {
      this.$router.push({
        name: "new"
      });
    }
  },

  created() {
    this.getRecordList();
    this.getNum();
  }
};
</script>
<style scoped lang="scss">
#package{
  background: #f6f3f7;
  min-height: 100%;
}
.banner {
  width: 100%;
  padding: 0.12rem 0.4rem;
}
.van-cell-group{
  box-shadow: 0 0 4px 2px rgba($color: #000000, $alpha: .04);
      border-radius: 0.1rem;
}
.main {
  margin-top: 0.2rem;
}

.main .title {
  clear: both;
  color: #999999;
  font-size: 0.24rem;
  margin-bottom: 0.2rem;
}

.main .title .fr {
  float: right;
}

.box {
  background: url(../../assets/images/taocan2.png) no-repeat;
  background-size: 100% 100%;
  height: 3.06rem;
  opacity: 1;
  border-radius: 0.1rem;
}

.box .ka1 {
  width: 100%;
  height: 100%;
  position: relative;
}

.ka1 .tongyong {
  padding-left: 0.12rem;
  width: 3.7rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-align: center;
  font-size: 0.3rem;
  height: 1.16rem;
  padding-top: 0.34rem;
}
.ka1 img {
  width: 0.32rem;
  height: 0.32rem;
  margin-left: 0.3rem;
  margin-right: 0.05rem;
}
.ka1 .riqi {
  padding-left: 0.3rem;
  font-size: 0.22rem;
}

.ka1 .time {
  text-align: center;
  font-size: 0.3rem;
  margin: 0.37rem 0 0.6rem;
}

.ka1 .fr {
  float: right;
  margin-right: 10%;
  margin-top: 10%;
  color: #333333;
  font-size: 0.6rem;
  text-align: center;
}

.ka1 .yuan {
  font-size: 0.6rem;
  color: #333;
}

.buttons {
  padding-top: 0.35rem;
  display: flex;
  justify-content: flex-end;
  position: relative;
  .iconfont{
    font-size: 0.26rem;
    color: #5BA1E7;
    margin-right: 0.06rem;
    &.iconcaigou{
      color: #fff;
    }
  }
}

.buttons button {
  width: 1.18rem;
  height: 0.54rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #5ba1e7;
  border-radius: 0.1rem;
  margin-right: 0.2rem;
  color: #333;
  font-size: 0.24rem;
  background: none;
}

.buttons .zifu {
  background: #5ba1e7;
  color: #fff;
}

.van-col {
  color: #fff;
  .item{
    padding-left: 0.4rem;
    font-size: 0.24rem;
    .iconfont{
      font-size: 0.24rem;
      color: #fff;
      margin-right: 0.14rem;
    }
  }
}

.span_10 {
  color: #333;
  margin-top: 0.6rem;
  font-size: 0.3rem;
  text-align: right;
  margin-right: 0.7rem;

  .yuan {
    font-size: 0.6rem;
    color: #333;
  }
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
  .van-field__label {
    -webkit-box-flex: 0;
    -webkit-flex: none;
    flex: none;
    width: 0.9rem;
}
.van-button--info{
  background: #fff;
  font-size: 0.3rem;
  color: #333;
  border: none;
  box-shadow: 0 0 4px 2px rgba($color: #000000, $alpha: .02);
}
/deep/.van-dialog{
  .van-dialog__content{
    padding: 0 .5rem;
  }
  
.subheading{
  font-size: 0.24rem;
  color: #333;
  display: flex;
  margin-bottom: 0.14rem;
}
.van-dialog__header{
  font-size: 0.32rem;
  color: #000;
  padding-top: 0.22rem;
  margin-bottom: 0.4rem;
}
.giving_input{
  height: 0.74rem;
  background: #F6F3F7;
  border-radius: .05rem;
  font-size: 0.24rem;
  margin-bottom: 0.4rem;
  padding: 0 0 0 .18rem;
  display: flex;
  align-items: center;
  &::placeholder{
    color: #999;
  }
}
.van-dialog__cancel{
  background: #F6F3F7;
  border-radius: .05rem 0 0 .05rem;
}
.van-dialog__confirm{
  background: #5BA1E7;
  color: #fff;
  border-radius: 0 .05rem .05rem 0;
}
}
}

</style>