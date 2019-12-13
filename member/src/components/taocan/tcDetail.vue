<template>
  <div id="tc_detail">
    <!-- 头部 -->
    <heade title="套餐详情"></heade>
    <!-- banner -->
    <div class="banner">
      <!-- <van-cell-group>
        <van-field placeholder="输入搜索内容" right-icon="search" @click-right-icon="getDetail" />
      </van-cell-group>-->
      <!-- 优惠券列表 -->
      <div class="list">
        <div class="item">
          
          <p class="quan">{{taocanDetail.Name}}
            <span  class="share" @click="goShare(taocanDetail.Id)" v-show="taocanDetail.IsShare=='是'">分享<i class="iconfont iconfenxiang2"></i></span>
          </p>
          <p class="qixian">有效期：{{taocanDetail.ExpireDate}}</p>
          <!-- <p>适用范围：{{taocanDetail.OrganizationRangeType}}</p> -->
          <p class="code">{{this.code}}</p>
          <van-divider
            dashed
            :style="{margin:'0.08rem 0',padding: '0 0.23rem',borderColor:'#fff' }"
          ></van-divider>
          <van-row type="flex" justify="space-between" class="bottom" align="center">
            <van-col span="6">
              <!-- <van-icon name="shop" size="20px" style="vertical-align:middle;" /> -->
              <i class="iconfont iconweibiaoti--1" v-if="taocanDetail.DepositType=='通用'"></i>
              <i class="iconfont iconliebiaoxingshi" v-if="taocanDetail.DepositType=='商品类别'"></i>
              <i class="iconfont iconkucun" v-if="taocanDetail.DepositType=='商品信息'"></i>
              <i class="iconfont iconpinpai" v-if="taocanDetail.DepositType=='商品品牌'"></i>
              <i class="iconfont icontaocanhuodong" v-if="taocanDetail.DepositType=='券'"></i>
              <span style="vertical-align: middle;">{{taocanDetail.DepositType}}</span>
            </van-col>
            <van-col span="6">
              <span class="duihuan" @click="give(taocanDetail.Name, taocanDetail.Id)" v-show="taocanDetail.IsTransmit=='是'">
                <img
                  src="../../assets/images/liwu2.png"
                  alt
                  style="width: 0.25rem;height: 0.25rem;"
                />
                <span>赠送</span>
              </span>
            </van-col>
          </van-row>
        </div>
      </div>
      <van-dialog v-model="isShow" show-cancel-button :beforeClose="beforeClose" title="套餐转赠">
          <span class="subheading">{{givingName}}转赠</span>
          <van-field class="giving_input" v-model="phone" placeholder="输入会员手机号" />
        </van-dialog>
      <div class="yue">
        <p class="title">套餐余额<span>{{parseInt(taocanDetail.RemainAmout).toFixed(1)}} 元</span></p>
        <div class="main" v-for="(item,index) in List" :key="index">
          <div class="title1">
            <span class="type">{{item.CouponName}}</span>
            <!-- <van-icon name="arrow" /> -->
          </div>
          <p class="qixian">有效期:{{item.CouponExpireDate}}</p>
          <div>
            <div>
              <span class="data">预存: {{item.CouponNum}}张</span>
              <span style="float: right;font-weight: bold;color:blue;">
                剩余
                <b style="font-size: 0.36rem;">{{item.CouponSurplusNum}}</b>张
              </span>
            </div>
          </div>
          <van-divider :style="{ color: '#1989fa', borderColor: '#ccc', }"></van-divider>
        </div>
      </div>
      <div class="door">
        <van-cell is-link @click="showmd()">查看使用门店（{{taocanDetail.Count}}）</van-cell>
      </div>
      <div class="rule">
        <h1>使用规则</h1>
        <div class="flex">
          <span class="hui">预存类型</span>
          <span class="bold">{{taocanDetail.DepositType}}</span>
        </div>
        <div class="flex">
          <span class="hui">是都可以分享其他会员</span>
          <span class="bold">{{taocanDetail.IsShare}}</span>
        </div>
        <div class="flex">
          <span class="hui">是都可以转赠其他会员</span>
          <span class="bold">{{taocanDetail.IsTransmit}}</span>
        </div>
      </div>
      <van-button type="info" size="large" @click="gotoInfo(taocanDetail.Id)">支付</van-button>
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
      show: false,
      taocanDetail: {},
      List: [],
      code: "",
      uuid: "",
      givingName:"",
      isShow: false,
      phone: "",
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    /**
     * 获取套餐详情
     */
    getDetail() {
      this.http
        .get("/api/services/app/CRMMemberComboService/GetCRMComboInfo", {
          params: {
            memberComboId: this.$route.query.id
          }
        })
        .then(res => {
          console.log(res);
          if (res.Result.Code === 0) {
            this.taocanDetail = res.Result.Data;
            this.code = res.Result.Data.MemberComboCode.replace(
              /(.{4})/g,
              "$1 "
            );
            this.List = res.Result.Data.CouponInfoList;
          }
        });
    },
    /**
     * 查看使用门店
     */
    showmd() {
      this.$router.push({
        path: "/TaocanShop",
        query: {
          ComboId: this.$route.query.ComboId
        }
      });
    },
    //  支付
    gotoInfo(id) {
      this.$router.push({
        name: "pay",
        query: { ComboId: id }
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
        /**
     * 赠送
     *  */
    give(val, id) {
      this.givingName = val;
      this.uuid = id;
      this.isShow = !this.isShow;
    },

  },
  created() {
    this.getDetail();
  }
};
</script>
<style scoped lang="scss">
#tc_detail{
  background: #f6f3f7;
  min-height: 100%;
  padding-bottom: 1.2rem;
}
.banner {
  width: 100%;
  padding: 0.12rem 0.4rem;
  margin-bottom: 1rem;
}

.list .item {
  background: url(../../assets/images/111.png) no-repeat;
  background-size: 100% 100%;
  color: #fff;
  height: 3.2rem;
  .quan {
    padding-top: 0.52rem ;
    padding-left: 0.36rem;
    font-size: 0.42rem;
  }
  .share{
    position: absolute;
    right: 10%;
    top: 3%;
    font-size: 0.24rem;
    font-family: Microsoft YaHei Regular;
  }
  .qixian{
    padding-left: 0.36rem;
    padding-top: 0.09rem;
    font-size: 0.24rem;
  }
  .code {
  // text-align: center;
  padding: 0.26rem 0.36rem;
  font-size: 0.36rem;
  
}
}



.item > .main .data {
  padding: 0.12rem 0;
  color: #999;
}

.item .bottom {
  /* display: flex;
        justify-content: space-between; */
  font-size: 0.24rem;
}

.item .bottom img {
  width: 0.36rem;
  height: 0.36rem;
  margin-right: 0.1rem;
}

.item .bottom .duihuan {
  width: 1.18rem;
  height: 0.54rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.1rem;
  border: 1px solid #fff;
  color: #fff;

}
.iconfont {
    font-family: "iconfont" !important;
    font-size: 0.26rem;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.main {
  margin-top: 0.2rem;
}

.main .type {
  color: #000;
  font-weight: bold;
  font-size: 0.26rem;
}

.yue {
  margin-top: 0.08rem;
  padding: 0.3rem 0.3rem .3rem .36rem;
  border-radius: 0.1rem;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
}

.yue .title {
  font-size: 0.3rem;
  color: #000000;
  margin-bottom: 0.15rem;
  display: flex;
  justify-content: space-between;
}

.title1 {
  display: flex;
  justify-content: space-between;
}

.door {
  padding: 0.1rem 0;
  margin: 0.14rem 0;
  border-radius: 0.1rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
}
.door .van-cell__value{
    font-size: 0.28rem;
    color: #333;
    font-weight: normal;
  }

.flex {
  display: flex;
  justify-content: space-between;
}

.flex .bold {
  font-size: 0.24rem;
  color: #333;
  font-weight: normal;
}

.rule {
  padding: 0.36rem;
  opacity: 1;
  border-radius: 0.1rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  margin-bottom: 0.4rem;
}

.rule h1 {
  font-size: 0.3rem;
  color-adjust: #333;
  margin-bottom: 0.16rem;
}
.rule .hui {
  color: #999;
  font-size: 0.24rem;
}
.rule .flex {
  line-height: 0.4rem;
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
/deep/ {
  .van-row {
    padding: .1rem .36rem 0;

  }
  .van-col{
    width: auto;;
    display: flex;
    align-items: center;
    .iconfont{
      font-size: 0.4rem;
      margin-right: 0.12rem;
    }
  }
  .van-cell.van-field {
    border-radius: 6px;
    box-shadow: 1px 1px 1.8px 0px #ccc;
  }

  .van-field__control {
    font-size: 0.24rem;
    font-family: unset;
  }

 .van-cell {
    
    padding: 0.2rem 0.36rem;
 
    font-size: 0.28rem;
    line-height: 0.28rem;
  
}
.van-cell__right-icon{
  height: 0.48rem;
    font-size: 0.32rem;
    line-height: 0.48rem;
}
.van-cell__value--alone {
    line-height: 0.48rem;
}
  .van-button--large {
    height: 0.74rem;
    line-height: 0.74rem;
    border-radius: 0.1rem;
    font-size: 0.3rem;
    width: 6.7rem;
    opacity: 1;
    background: rgba(91,161,231,1);
    box-shadow: 0px 2px 6px 0px rgba(3,0,6,0.1);
    border: none;
  }
  
}
</style>