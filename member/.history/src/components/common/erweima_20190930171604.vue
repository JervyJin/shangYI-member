<template>
  <div>
    <!-- 头部 -->
    <heade title="我的二维码"></heade>
    <!-- banner -->
    <div class="banner">
      <div class="box">
        <div class="title">请向营业员出示扫码</div>
        <!-- <div class="qrcode" ref="qrCodeUrl"></div> -->
        <img :src="qrurl" alt="" class="qrurl" />
        <van-divider dashed></van-divider>
        <img :src="barurl" class="barurl" />
        <p class="code">{{this.code}}</p>
      </div>
    </div>
    <!-- 底部 -->
    <CommonBottom></CommonBottom>
  </div>
</template>
<script>
import heade from "./heade";
import config from '../../config'
// import JsBarcode from "jsbarcode";
// import QRCode from "qrcodejs2";
import CommonBottom from "./CommonBottom";

export default {
  components: {
    heade,
    CommonBottom
  },
  data() {
    return {
      code: "",
      barurl:"",
      qrurl:""
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },

    getMa() {
      let _this = this;
      this.http
        .get("/api/services/app/CRMMemberService/GetPaymentCode", {
          params: {}
        })
        .then(res => {
          _this.code = res.Result.Data.PaymentCode;
          _this.barurl = config.api_base+'/api/imagecode/barcode?value='+_this.code
          _this.qrurl = config.api_base+'/api/imagecode/qrcode?value='+_this.code

         /* 
          // 生成一维码
          JsBarcode("#barcode", _this.code, {
            format: "CODE128", //选择要使用的条形码类型

            text: _this.code,
            width: 2.2,
            height: 60,
            displayValue: true, //是否在条形码下方显示文字

            textPosition: "bottom" //设置文本的垂直位置
          });
          // 生成二维码
          var qrcode = new QRCode(this.$refs.qrCodeUrl, {
            text: _this.code,
            width: 150,
            height: 150,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
          });
          */
          
        });
    },

  },
  created() {
    this.getMa();

  }
};
</script>
<style scoped>
.banner {
  width: 100%;
  padding: 0.12rem 0.4rem;
}
.box {
  padding: 0.4rem 0.45rem;
  text-align: center;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  border-radius: 0.1rem;
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