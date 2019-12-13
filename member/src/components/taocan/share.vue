<template>
  <div>
    <!-- 头部 -->
    <heade title="套餐分享"></heade>
    <van-notice-bar :scrollable="false">将此页面分享给你的亲友，与TA共同使用！</van-notice-bar>
    <!-- banner -->
    <div class="banner">
      <div class="main">
        <p class="text">您的好友【{{info.MemberName}}】分享了【{{info.ComboName}}】，与您一同使用。请结账时出示以 下结账码即可。</p>
        <img :src="qrurl" alt="" class="qrurl" />
        <van-divider dashed></van-divider>
        <img :src="barurl" class="barurl" />
        <p class="code">{{this.$route.query.code}}</p>
      </div>
      <div class="info">
        <h1 class="title">套餐余额</h1>
    
        <van-row v-if="List" type="flex" justify="space-between" v-for="(item,index) in List" :key="index">
          <van-col span="10">
            <p class="p1">{{item.CouponName}}</p>
            <p class="p2">预存：{{item.CouponNum}}</p>
          </van-col>
          <van-col span="6" class="money">剩余{{item.CouponSurplusNum}}</van-col>
        </van-row>
        <van-divider />
        <van-row type="flex" justify="space-between" align="center">
          <van-col span="10">
            <p class="p1">通用金额</p>
            <p class="p2">预存：{{parseFloat(info.RemainAmout)}}</p>
          </van-col>
          <van-col span="10" class="money">剩余 <span style="font-size: 200%;padding-right:2px">{{parseFloat(info.RemainAmout)}}</span>元</van-col>
        </van-row>
      </div>
    </div>
    <!-- 底部 -->
    <!-- <CommonBottom></CommonBottom> -->
  </div>
</template>
<script>
import heade from "../common/heade";
// import JsBarcode from "jsbarcode";
// import QRCode from "qrcodejs2";
import config from '../../config'
import wechatCommon from "@/wechat";
// import CommonBottom from "../common/CommonBottom";

export default {
  components: {
    heade
    // CommonBottom
  },
  data() {
    return {
      barurl:"",
      qrurl:"",
      info:{},
      List:[]
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  
    // 套餐信息
    getInfo() {
      let _this = this
      this.http
        .get(
          "/api/services/app/CRMMemberComboService/GetCRMMemberComboShareCodeInfo",
          {
            params: {
              sharecode: this.$route.query.code
            }
          }
        )
        .then(res => {
          console.log(res);
          this.info = res.Result.Data
          this.List = res.Result.Data.CouponInfoList
           _this.barurl = config.api_base+'/api/imagecode/barcode?value='+this.$route.query.code
          _this.qrurl = config.api_base+'/api/imagecode/qrcode?value='+this.$route.query.code

          /*JsBarcode("#barcode", this.$route.query.code, {
            format: "CODE128", //选择要使用的条形码类型

            text: this.$route.query.code,
            width: 2.2,
            height: 60,
            displayValue: true, //是否在条形码下方显示文字

            textPosition: "bottom" //设置文本的垂直位置
          });

          var qrcode = new QRCode(this.$refs.qrCodeUrl, {
            text: this.$route.query.code,
            width: 150,
            height: 150,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
          });*/
        });
    }
  },
  created() {
    this.getInfo();
    let _this=this;
    wechatCommon.config(_this,function(){
      wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
          wx.updateAppMessageShareData({ 
              title: '您的好友给您分享了一个套餐', // 分享标题
              desc: '点击进去使用', // 分享描述
              link: (window.location.protocol+"//"+window.location.host)+_this.$route.fullPath, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: '', // 分享图标
              success: function () {
                // 设置成功
              }
          })
      });
    });
    // wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
    //     wx.updateAppMessageShareData({ 
    //         title: '您的好友给您分享了一个套餐', // 分享标题
    //         desc: '点击进去使用', // 分享描述
    //         link: (window.location.protocol+"//"+window.location.host)+_this.$route.fullPath, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //         imgUrl: '', // 分享图标
    //         success: function () {
    //           // 设置成功
    //         }
    //     })
    // });

  }
};
</script>
<style scoped lang="scss" type="text/scss">
.banner {
  width: 100%;
  padding: 0.12rem 0.4rem;
}
.main {
  text-align: center;
  padding: 0.2rem;
  border-radius: 0.1rem;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
}
.touxiang {
  width: 0.85rem;
  height: 0.85rem;
}
.text {
  padding: 0.1rem;
  border-radius: 0.1rem;
  background: #f6f3f7;
  font-size: 0.2rem;
  font-weight: bold;
  line-height: 0.4rem;
  text-align: left;
  color: #333333;
  font-family: Microsoft YaHei Light;
}
.ma {
  width: 3.51rem;
  height: 3.51rem;
  margin: auto;
  display: inherit;
  margin-top: 0.27rem;
  margin-bottom: 0.24rem;
}
.info {
  padding: 0 0.2rem;
  border-radius: 0.1rem;
  margin-top: 0.15rem;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  .title {
    font-size: 0.3rem;
    font-weight: bold;
    color: #333;
    height: 0.82rem;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    align-items: center;
  }
  .van-row{
    padding: .24rem 0;
  }
  .money {
    color: #0579cb;
    font-weight: bold;
    font-size: 0.24rem;
    text-align: right;
  }
  .p1 {
    font-size: 0.26rem;
    color: #333333;
  }
  .p2 {
    color: #999999;
    font-size: 0.2rem;
    margin-top: .1rem;
  }
  .van-divider {
    border-width: 0.001rem;
    margin: 0;
  }
}

.van-notice-bar{
  background-color: rgba(137, 141, 231, 0.5);
  color: #fff;
  font-size: 0.24rem;
}
.box .title {
  margin-bottom: 0.3rem;
  font-size: 0.3rem;
  color: #333;
  font-weight: bold;
}
.qrurl {
  display: inline-block !important; 
  width: 3.5rem;
  height: 3.5rem;
  margin-top: 0.34rem;
}
.barurl {
  display: inline-block !important; 
  width: 5.82rem;
  height: 1.29rem;
}
.code{
font-size: 0.24rem;
font-family: Microsoft YaHei Light;
font-weight: bold;
color: rgba(34,34,34,1);
line-height: 0.5rem;
letter-spacing: 0.1rem;
}
</style>