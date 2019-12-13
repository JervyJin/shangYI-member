<template>
  <div>
    <!-- 头部 -->
    <heade title="套餐赠送"></heade>
    <van-notice-bar :scrollable="false">您的好友未注册会员，请点击右上角分享给他</van-notice-bar>
    <!-- banner -->
    <div class="banner">
      <div class="main">
        <van-row type="flex" justify="space-between">
          <van-col span="4">
            <img class="touxiang" :src="data.HeadPortrait" alt />
          </van-col>
          <van-col span="20">
            <span>{{data.RealName}}</span>
            <p class="text">您的好友【{{data.RealName}}】赠送给您一个套餐，关注【{{hisNum}}】公众号，长按二维码领取！</p>
          </van-col>
        </van-row>

        <!-- <div class="qrcode" ref="qrCodeUrl"></div> -->
        <img width="200" height="200" :src="code" class="qrcode" />
        <van-divider dashed />
        <div class="prosess">
          <p class="title">领取流程</p>
          <p class="prosess_text">1.长按二维码关注公众号</p>
          <p class="prosess_text">2.在下方菜单中点击进入【会员中心】</p>
          <p class="prosess_text">3.在首页点击【我的套餐】即可查看</p>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <CommonBottom></CommonBottom>
  </div>
</template>
<script>
import heade from "../common/heade";
import CommonBottom from "../common/CommonBottom";
import QRCode from "qrcodejs2";
import wechatCommon from "@/wechat";
export default {
  components: {
    heade,
    CommonBottom
  },
  data() {
    return {
      data: {},
      hisNum: "",
      code: ""
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    /**
     * 获取用户信息
     */
    getUserinfo() {
      this.http
        .get("/api/services/app/CRMMemberService/GetMyInfo", {
          params: {}
        })
        .then(res => {
          console.log(res);
          this.data = res.Result.Data;
        })
        .catch(function(error) {});
    },
    // 获取公众号码
    getWeixin() {
      this.http
        .get("/api/services/app/CRMMemberService/GetPublicNumberInfo", {
          params: {
            MemberComboId: this.$route.query.id
          }
        })
        .then(res => {
          console.log(res);
          if (res.Result.Code === 0) {
            this.hisNum = res.Result.Data.PublicNumberName;
            this.code = res.Result.Data.PublicNumberQrCode;

            // var qrcode = new QRCode(this.$refs.qrCodeUrl, {
            //   text: this.code,
            //   width: 130,
            //   height: 130,
            //   colorDark: "#000000",
            //   colorLight: "#ffffff",
            //   correctLevel: QRCode.CorrectLevel.H
            // });
          }
        });
    }
  },
  created() {
    this.getUserinfo();
    this.getWeixin();
    let _this = this;
    wechatCommon.config(_this, function() {
      wx.ready(function() {
        //需在用户可能点击分享按钮前就先调用
        wx.updateAppMessageShareData({
          title: "您的好友给您赠送了一个套餐", // 分享标题
          desc: "点击立即注册会员并领取", // 分享描述
          link:
            window.location.protocol +
            "//" +
            window.location.host +
            _this.$route.fullPath, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: "", // 分享图标
          success: function() {
            // 设置成功
          }
        });
      });
    });
  }
};
</script>
<style scoped lang="scss">
.banner {
  width: 100%;
  padding: 0.12rem 0.35rem;

  .main {
    padding: 0.3rem 0.4rem;
    border-radius: 0.1rem;
    opacity: 1;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  }
}

.touxiang {
  width: 0.85rem;
  height: 0.85rem;
}
.text {
  padding: 0.1rem;
  margin-top: 5px;
  margin-bottom: 20px;
  border-radius: 0.1rem;
  background: #f6f3f7;
  font-size: 0.24rem;
  line-height: 0.4rem;
  text-align: left;
}
.qrcode {
  display: block;
  margin: 0 auto;
}
.van-notice-bar {
  background-color: rgba(137, 141, 231, 0.5);
  color: #fff;
  font-size: 0.24rem;
}
.prosess {
  .title {
    font-size: 0.3rem;
    margin-bottom: 0.12rem;
    color: #333;
  }
  .prosess_text{
    margin-bottom: 0.18rem;
    font-size: 0.2rem;
  }
}
</style>