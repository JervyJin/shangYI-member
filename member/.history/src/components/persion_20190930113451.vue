<template>
  <div>
    <!-- 头部 -->
    <heade title="个人中心"></heade>

    <div class="banner">
      <div class="user">
        <img :src="data.HeadPortrait" alt v-if="data.HeadPortrait" />
        <img class="touxiang" src="../assets/images/touxiang.png" alt v-else />
        <div class="right">
          <p class="name">{{data.RealName}}</p>
          <p class="phone">{{data.Phone}}</p>
        </div>
      </div>

      <div class="list">
        <!-- <p>
        <img class="icon" src="../assets/images/shop.png" alt />
        <span class="title">消费记录</span>
        <img class="arrow" src="../assets/images/arrow.png" alt />
      </p>
      <p>
        <img class="icon" src="../assets/images/shop.png" alt />
        <span class="title">充值记录</span>
        <img class="arrow" src="../assets/images/arrow.png" alt />
        </p>-->
        <!-- <van-divider /> -->
        <router-link to="/endmoney" tag="span">
          <p>
            <!-- <img class="icon" src="../assets/images/yuer.png" alt /> -->
            <i class="iconfont iconyue icon"></i>
            <span class="title">账户余额</span>
            <img class="arrow" src="../assets/images/arrow.png" alt />
          </p>
        </router-link>
        <van-divider />
        <router-link to="/jifen" tag="span">
          <p>
            <!-- <img class="icon" src="../assets/images/jifen.png" alt /> -->
            <i class="iconfont iconjifen icon"></i>
            <span class="title">我的积分</span>
            <img class="arrow" src="../assets/images/arrow.png" alt />
          </p>
        </router-link>
        <van-divider />
        <router-link to="/peopleForm" tag="span">
          <p>
            <!-- <img class="icon" src="../assets/images/ziliao.png" alt /> -->
            <i class="iconfont iconhuiyuan2 icon"></i>
            <span class="title">个人资料</span>
            <img class="arrow" src="../assets/images/arrow.png" alt />
          </p>
        </router-link>
        <van-divider />
        <router-link to="/changePhone" tag="span">
          <p>
            <!-- <img class="icon" src="../assets/images/souji.png" alt /> -->
            <i class="iconfont iconbangdingshouji icon"></i>
            <span class="title">修改绑定手机</span>
            <img class="arrow" src="../assets/images/arrow.png" alt />
          </p>
        </router-link>
        <van-divider />
        <p @click="memberUntying">
          <img class="icon" src="../assets/images/jiebang.png" alt />
          <span class="title">会员解绑</span>
          <img class="arrow" src="../assets/images/arrow.png" alt />
        </p>
        <van-divider />
        <router-link to="/myTeasing" tag="span">
          <p>
            <img class="icon" src="../assets/images/tucao.png" alt />
            <span class="title">我要吐糟</span>
            <img class="arrow" src="../assets/images/arrow.png" alt />
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { Toast } from "vant";
import heade from "./common/heade";
export default {
  components: {
    heade
  },
  data() {
    return { data: {} };
  },
  created() {
    this.http
      .get("/api/services/app/CRMMemberService/GetMyInfo", {
        params: {}
      })
      .then(response => {
        console.log(response);
        this.data = response.Result.Data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    memberUntying() {
      Dialog.confirm({
        title: "温馨提示",
        message: "您确定要进行会员解绑吗?"
      })
        .then(() => {
          this.http
            .post("/api/services/app/CRMMemberMyInfoService/WeChatUnBound")
            .then(res => {
              if (res.Result.Code === 0) {
                Toast({
                  message: res.Result.Message,
                  duration: 2000
                });

                this.$store.commit("setToken", "");
                // this.$toasted.success(1500).goAway(1500);
                setTimeout(() => {
                  this.$router.push({
                    name: "login"
                  });
                }, 2000);
              } 
            });
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped>
@import "../assets/css/globeDialog.css";
.banner {
  width: 100%;
  padding: 0.12rem 0.4rem;
}
.iconyue{
  color: #3C6EFD;
  font-size: 0.38rem;
}
.iconjifen{
  color: #898DE7;
  font-size: 0.38rem;
}
.iconhuiyuan2{
  color: #4ACE8C;
  font-size: 0.38rem;
}
.iconbangdingshouji{
  
}
.user {
  clear: both;
  /* width: 6.7rem; */
  height: 1.34rem;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  border-radius: 0.1rem;
  margin: 0.13rem auto;
  padding: 0.17rem 0.25rem;
  line-height: 0.89rem;
  font-size: 0.3rem;
  color: #000000;
  font-weight: bold;
}
.user img {
  float: left;
  width: 1rem;
  height: 1rem;
  margin-right: 0.25rem;
  border-radius: 6px;
  overflow: hidden;
}
.user .right {
  line-height: 0.5rem;
}
.user .right .name {
  margin-top: 0.38rem;
}
.user .right .phone {
  font-size: 0.24rem;
}

/* list */
.list {
  margin: auto;
  padding: 0 0.28rem;
  border-radius: 0.1rem;
  /*height: 5.34rem;*/
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  font-size: 0.24rem;
  /*font-weight: bold;*/
  color: rgba(51, 51, 51, 1);
}
.list p {
  padding: 0.2rem 0;
  /* line-height: 0.88rem; */
}
.list .icon {
  width: 0.36rem;
  height: 0.36rem;
  margin-right: 0.21rem;
}
.list .title {
  font-weight: 6rem;
}
.list .arrow {
  float: right;
  height: 0.26rem;
}
.van-divider {
  margin: 0;
}
</style>
