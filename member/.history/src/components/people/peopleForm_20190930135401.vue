<template>
  <div>
    <!-- 头部 -->
    <heade title="个人资料"></heade>
    <!-- banner -->
    <div class="banner">
      <van-cell-group class="border">
        <van-field
          v-model="info.RealName"
          type="string"
          clearable
          label="真实姓名"
          placeholder="请输入真实姓名"
        />
        <div class="van-cell van-field drop-container">
          <label>性别</label>
          <van-dropdown-menu>
            <van-dropdown-item v-model="info.Sex" :options="sexLis" />
          </van-dropdown-menu>
        </div>
        <div class="van-cell van-field drop-container">
          <label>生日类型</label>
          <van-dropdown-menu>
            <van-dropdown-item disabled v-model="info.BirthdayType" :options="birthdayTypeLis" />
          </van-dropdown-menu>
        </div>
        <!-- 生日 -->
        <van-field v-model="birth" disabled clearable label="生日" />
        <!-- 地区 -->
        <!-- <van-field v-model="address" disabled clearable label="地区" is-link @click="showAddress" />   -->

        <van-field
          v-model="info.Address"
          type="string"
          clearable
          label="详细地址"
          placeholder="请输入详细地址"
        />
        <van-field v-model="info.IDCardNo" center clearable label="证件号码" placeholder="请输入证件号码" />
      </van-cell-group>
      <!-- 生日弹窗 -->
      <!-- <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="new Date('1970/01/01')"
          :max-date="new Date()"
          @confirm="handleConfirm"
          @cancel="handleCancel"
        />
      </van-popup>-->
      <!-- 地区弹窗 -->
      <!-- <van-popup v-model="showAddr" position="bottom" :style="{ height: '40%' }">
        <van-area 
          :area-list="areaList" 
          :columns-num="2" 
          title="标题" 
          @confirm="addrConfirm"
          @cancel="addrleCancel"
        />
      </van-popup>-->

      <div class="jinian">
        <!-- <van-field placeholder="输入搜索内容" right-icon="arrow" @click-right-icon="gotojinianri" /> -->
        <img src="../../assets/images/liwu.png" alt />
        <van-cell
          title="纪念日"
          @click="gotojinianri"
          style="border-radius: 0.1rem;padding-left: 0.8rem;"
        >
          <van-icon slot="right-icon" name="arrow" style="line-height: inherit;" />
        </van-cell>
      </div>
      <!-- 提交按钮 -->
      <van-button class="button" type="info" @click="save">提交</van-button>
    </div>
  </div>
</template>

<script>
import heade from "../common/heade";
import dayjs from "dayjs";
import addressInfo from "../common/area.js";

export default {
  components: {
    heade
  },
  data() {
    return {
      Sex: 0,
      BirthdayType: 0,
      DateType: [{ text: "公历", value: 0 }, { text: "农历", value: 1 }],

      sexLis: [{ text: "男", value: 0 }, { text: "女", value: 1 }],
      birthdayTypeLis: [{ text: "公历", value: 0 }, { text: "农历", value: 1 }],
      showAddr: false,
      currentDate: new Date(),
      info: {},
      birth: ""
    };
  },
  computed: {},
  methods: {
    showAddress() {
      this.showAddr = true;
    },
    handleConfirm(val) {
      this.info.Birthday = val;
      this.info.Birthday = dayjs(val).format("YYYY-MM-DD");
      this.show = false;
    },
    handleCancel() {
      this.info.Birthday = "";
      this.show = false;
    },
    addrConfirm(val) {
      this.address = val;
      this.showAddr = false;
    },
    addrleCancel() {
      this.showAddr = false;
    },
    /**
     * 查询个人资料
     */
    getInfo() {
      this.http
        .get("/api/services/app/CRMMemberMyInfoService/GetCRMMember", {
          params: {}
        })
        .then(res => {
          console.log(res);

          this.info = res.Result.Data;
          this.birth = res.Result.Data.Birthday.substring(0, 10);
        });
    },

    /**
     * 提交
     */
    save() {
      // if (!this.info.Birthday) {
      //   this.$toast({
      //     message: "请选择生日!!",
      //     duration: 2000
      //   });
      //   return;
      // }

      this.http
        .put("/api/services/app/CRMMemberMyInfoService/UpdateCRMMember", {
          RealName: this.info.RealName,
          Sex: this.info.Sex,

          IDCardNo: this.info.IDCardNo,
          Address: this.info.Address
        })
        .then(res => {
          console.log(res);
          if (res.Result.Code === 0) {
            this.$toast({
              message: "修改成功",
              duration: 2000
            });
            setTimeout(() => {
              this.$router.push({
                name: "login"
              });
            }, 2000);
          }
        });
    },
    gotojinianri() {
      this.$router.push("day");
    }
  },
  created() {
    this.getInfo();
  }
};
</script>

<style scoped lang="scss" type="text/scss">
.banner {
  width: 100%;
  padding: 0.12rem 0.4rem;
}
.border {
  font-size: 0.24rem;
  font-weight: 6rem;
  color: rgba(51, 51, 51, 1);
}
.border label{
font-family:"Microsoft YaHei Light";
}
.border label{
font-family:"Microsoft YaHei Light";
}
.drop-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  .van-dropdown-menu.van-hairline--top-bottom {
    height: auto !important;
  }
}
.zc-label {
  display: flex;
  align-items: center;
  margin-bottom: 0.2rem;
}
.jinian {
  margin-top: 0.2rem;
  position: relative;
  font-size: 0.3rem;
  font-weight: 500;
}
.jinian img {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  left: 0.2rem;
  top: 0.22rem;
  z-index: 122;
}
.wap {
  margin-top: 0.12rem;
  padding-bottom: 0.1rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
}
.main {
  padding-top: 0.1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  span {
    font-size: 0.24rem;
    color: #333333;
  }
}

/deep/ {
  .van-cell {
    font-size: 0.24rem;
    font-weight: 600;
    border-radius: 0.1rem;
    padding: 0.2rem 0.32rem;
    line-height: 0.48rem;
  }

  .van-cell-group {
    border-radius: 0.1rem;
    // box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  }
  .van-field__label {
    width: 1.8rem;
  }

  .van-hairline--top-bottom::after {
    border-width: 0;
  }
  .van-dropdown-menu__title {
    position: relative;
    box-sizing: border-box;
    max-width: 100%;
    padding: 0 8px;
    color: #323233;
    font-size: 0.25rem;
  }
  .van-dropdown-menu__title::after {
    top: 0.14rem;
  }

  .van-dropdown-menu__title::after {
    right: -0.1rem;
    border: 0.06rem solid;
    border-color: transparent transparent currentColor currentColor;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  .van-button--normal {
    height: 0.9rem;
    width: 100%;
    line-height: 0.88rem;
    border-radius: 0.1rem;
    margin-top: 0.3rem;
    font-size: 0.3rem;
  }
}
</style>
