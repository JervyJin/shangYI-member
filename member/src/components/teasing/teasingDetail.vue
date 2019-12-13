<template>
  <div>
    <heade title="吐槽详情"></heade>
    <div class="banner">
      <div class="toushustore">
        <span class="left">投诉门店</span>
        <span class="right">{{getData.ComplaintOrganizationName}}</span>
      </div>

      <div class="wap">
        <!-- <van-cell
          :title="getData.MemberName"
          :value="getData.CreatorTime"
          label="sss"
        />-->
        <div class="van_cell">
          <span class="title">
            {{getData.MemberName}}
            <img src="../../assets/images/huiyuan.png" v-if="getData.MemberName"/>
          </span>
          <span class="value">{{getData.CreatorTime}}</span>
          <p class="label">{{getData.Content}}</p>
        </div>
        <div class="cont" v-if="getData.DisposeContent">
          <i class="active"></i>
          <span class="chuliren">{{getData.UserName}}</span>
          <span style="color:#9C9C9C;">{{getData.DisposeTime}}</span>
          <p class="req">{{getData.DisposeContent}}</p>
        </div>
        <!-- 追加列表 -->
        <div class="cont_zui" v-for="(item,index) in getAppendList" :key="index">
          <!-- <van-cell
            :title="getData.MemberName"
            :value="item.CreatorTime"
            :label="item.AppendContent"
            v-if="item.AppendContent"
          />-->
          <div class="van_cell" v-if="item.AppendContent">
            <span class="title">{{getData.MemberName}}<img src="../../assets/images/huiyuan.png" v-if="getData.MemberName"/></span>
            <span class="value">{{item.CreatorTime}}</span>
            <p class="label">{{item.AppendContent}}</p>
          </div>
          <div class="cont" v-if="item.DisposeContent">
            <i class="active"></i>
            <span class="chuliren">{{item.UserName}}</span>
            <span style="color:#9C9C9C;">{{item.DisposeTime}}</span>
            <p class="req">{{item.DisposeContent}}</p>
          </div>
        </div>

        <div class="input_zui">
          <input v-model="value" placeholder="请输入追评内容" />
        </div>
      </div>
      <van-button type="info" size="large" @click="set">提交</van-button>
    </div>

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
      getData: {},
      getAppendList: [],
      value: ""
    };
  },
  methods: {
    /**
     * 获取投诉信息
     */
    get() {
      this.http
        .get(
          "/api/services/app/MemberComplaintService/GetMemberComplaintDefault",
          {
            params: {
              id: this.$route.query.id
            }
          }
        )
        .then(res => {
          console.log(res);
          if (res.Result.Code === 0) {
            this.getData = res.Result.Data;
          }
          // else {
          //   this.$toast({
          //     message: "获取失败!!",
          //     duration: 2000
          //   });
          //   this.$toast.clear();
          // }
        });
    },
    /**
     * 获取追加投诉信息
     */
    getZui() {
      this.http
        .get("/api/services/app/MemberComplaintService/GetAppendComplaint", {
          params: {
            Id: this.$route.query.id
          }
        })
        .then(res => {
          console.log(res);
          if (res.Result.Code === 0) {
            this.getAppendList = res.Result.Data.ListAppend;
          }
          //  else {
          //   this.$toast({
          //     message: "获取失败!!",
          //     duration: 2000
          //   });
          //   this.$toast.clear();
          // }
        });
    },
    /**
     * 追加吐槽
     */
    set() {
      // debugger
      if (!this.value) {
        this.$toast({
          message: "请填写内容",
          duration: 2000
        });
        return;
      }

      this.http
        .post("/api/services/app/MemberComplaintService/AddAppendComplaint", {
          MemberComplaintOrderId: this.$route.query.id,
          AppendContent: this.value
        })
        .then(res => {
          if (res.Result.Code === 0) {
            this.$toast({
              message: "提交成功!!",
              duration: 2000
            });
            this.value = "";
            setTimeout(() => {
              this.$router.push({ name: "myTeasing" });
            }, 2000);
          }
        });
    }
  },
  created() {
    this.get();
    this.getZui();
  }
};
</script>

<style scoped lang="scss">
.banner {
  width: 100%;
  padding: 0.12rem 0.4rem;
}
.div {
  /* position: fixed; */
  top: 0;
  background: #ffffff;
  height: 1.42rem;
  line-height: 1.42rem;
  clear: both;
  text-align: center;
  font-size: 0.36rem;
  font-weight: Regular;
  font-family: Microsoft YaHei Regular;
}
.div .left {
  float: left;
  margin-left: 0.4rem;
}
.div .left img {
  width: 0.22rem;
  height: 0.39rem;
}
.div .right {
  float: right;
  margin-right: 0.3rem;
}
.div .right img {
  width: 8px;
  height: 42px;
}
.toushustore {
  width: 6.7rem;
  height: 0.95rem;
  line-height: 0.95rem;
  margin: 0.13rem auto 0.13rem;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  border-radius: 0.1rem;
}
.toushustore .left {
  float: left;
  opacity: 1;
  font-size: 0.24rem;
  font-family: Microsoft YaHei Light;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  letter-spacing: 0px;
  margin-left: 0.24rem;
}
.toushustore .right {
  float: right;
  opacity: 1;
  font-size: 0.3rem;
  font-family: Microsoft YaHei Regular;
  font-weight: 500;
  color: rgba(60, 110, 253, 1);
  letter-spacing: 0px;
  margin-right: 0.19rem;
}
.van_cell {
  padding: 0.33rem 0.28rem 0;
  clear: both;
  .title {
    float: left;
    // font-size: 0.24rem;
    font-family: Microsoft YaHei Light;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    img {
      display: inline-block;

      width: 0.32rem;
      height: 0.32rem;
      background-size: cover;
      vertical-align: middle;
      margin-left: 0.05rem;
    }
  }
  .value {
    float: right;
    font-size: 0.2rem;
    font-family: Microsoft YaHei Light;
    font-weight: bold;
    color: rgba(156, 156, 156, 1);
  }
  .label {
    padding: 0.31rem 0;
    font-size: 0.2rem;
    font-family: Microsoft YaHei Light;
    font-weight: 600;
    line-height: 0.3rem;
    color: rgba(51, 51, 51, 1);
  }
}
.storecont {
  margin: auto;
  width: 6.7rem;
  height: 2.05rem;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
}
.van-button--large {
  margin: 0.4rem auto 0;
  display: block;
  width: 6.7rem;
  height: 0.74rem;
  line-height: 0.74rem;
  font-size: 0.3rem;
  opacity: 1;
  background: rgba(91, 161, 231, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  border-radius: 0.1rem;
}
.cont {
  padding: 0.2rem;
  border-radius: 0.1rem;
  width: 90%;
  margin: 0.1rem auto;
  opacity: 1;
  background: rgba(246, 243, 247, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  font-family: Microsoft YaHei Light;
  position: relative;
  .req {
    margin: 0.13rem 0;
    font-size: 0.2rem;
    font-weight: bold;
  }
  .append {
    padding-left: 0.1rem;
    line-height: 0.4rem;
  }
}
.cont .active {
  position: absolute;
  top: -15px;
  left: 7%;
  border-right: none;
  border-bottom: none;
  transform: translate(-50%);
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 15px solid rgba(246, 243, 247, 1);
}
.cont > .chuliren {
  font-size: 0.25rem;
  font-weight: bold;
}
.cont > .chuliren::after {
  content: "";
  display: inline-block;
  background: url(../../assets/images/admin.png);
  width: 0.32rem;
  height: 0.32rem;
  background-size: cover;
  vertical-align: bottom;
  margin: 0 0.05rem;
}

.van-cell__value--alone {
  color: #9c9c9c;
  font-size: 0.2rem;
  text-align: right;
}
.wap {
  border-radius: 0.1rem;
  background: #fff;
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  input {
    width: 90%;
    padding: 0.24rem 0.21rem;
    opacity: 1;
    font-size: 0.2rem;
    color: #9c9c9c;
    font-family: Microsoft YaHei Light;
    background: rgba(246, 243, 247, 1);
    box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  }
}
.input_zui {
  text-align: center;
  vertical-align: middle;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
}
</style>