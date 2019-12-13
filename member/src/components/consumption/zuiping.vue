<template>
  <div>
    <!-- 头部 -->
    <div class="div">
      <div class="left" @click="back()">
        <img src="../../assets/images/back.png" alt />
      </div>
      <span class="title">评价详情</span>
      <div class="right">
        <img src="../../assets/images/point.png" alt />
      </div>
    </div>
    <div class="cont">
      <h3>评价信息</h3>
      <van-divider />
      <p>
        <span>服务态度</span>
        <van-rate v-model="pjInfo.Attitude" readonly />
      </p>
      <p>
        <span>商品质量</span>
        <van-rate v-model="pjInfo.Quality" readonly />
      </p>
      <p>
        <span>购物环境</span>
        <van-rate v-model="pjInfo.Environment" readonly />
      </p>
    </div>
    <!--<div class="dashang">-->
      <!--<span class="text">打赏积分</span>-->
      <!--<span class="num">11</span>-->
    <!--</div>-->

    <div class="list">
      <div class="users" v-for="(item,index) in pjInfo.ListEvaluate" :key="index">
        <span class="name">{{item.RealName}}</span>
        <span class="icon">
          <img src="../../assets/images/huiyuan.png" alt />
        </span>
        <span class="time">{{item.CreatorTime}}</span>
        <p class="speak">{{item.Content}}</p>
      </div>
      <div class="input">
        <input type="text" v-model="content" placeholder="追加评价" />
      </div>
    </div>

    <div class="button" @click="submit()">提交追评</div>
  </div>
</template>

<script>
import { Dialog } from "vant";

export default {
  components: {},
  data() {
    return {
      pjInfo: {},
      content: ''
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    submit() {
      if(!this.content) {
        this.$toast({
          message: '请先填写评价!!',
          duration: 2000
        });
        return
      }
      Dialog.confirm({
        // title: "标题",
        message: "您确定提交此次评价么？"
      })
        .then(() => {
          this.http.post('/api/services/app/MemberExpendService/AddAppendEvaluate', {
            "MemberConsumptionOrderEvaluateId": this.pjInfo.Id,
            "MemberConsumptionOrderId": this.$route.query.id,
            "Content": this.content
          }).then(res => {
            if(res.Result.Code === 0) {
              this.$toast({
                message: res.Result.Message,
                duration: 2000
              });
              setTimeout(() => {
                this.$router.push({
                  name: 'Record'
                })
              }, 2000)
            }
          })
        })
        .catch(() => {
          // on cancel
        });
    },
    getPj() {
      this.http.get('/api/services/app/MemberExpendService/GetEvaluate', {
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        console.log(res)
        if(res.Result.Code === 0) {
          this.pjInfo = res.Result.Data
        }
      })
    }
  },
  created() {
    this.getPj()
  }
};
</script>

<style scoped>
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
  /* width: 0.22rem; */
  height: 0.39rem;
  opacity: 1;
}
.div .right {
  float: right;
  margin-right: 0.3rem;
}
.div .right img {
  height: 0.42rem;
}
.cont {
  margin: 0.15rem auto 0.14rem;
  width: 6.7rem;
  height: 3.7rem;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  border-radius: 0.1rem;
}

.van-rate {
  display: inline;
  vertical-align: middle;
  margin-left: 0.89rem;
}
.cont h3 {
  padding: 0.3rem 0.24rem;
  font-weight: bold;
  font-size: 0.3rem;
}
.van-divider {
  margin: 0;
}
.cont p {
  width: 6.19rem;
  margin: auto;
  line-height: 0.88rem;
  color: rgba(51, 51, 51, 1);
  font-weight: bold;
  font-size: 0.24rem;
}

.dashang {
  margin: auto;
  width: 6.7rem;
  height: 0.95rem;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  border-radius: 0.1rem;
  font-size: 0.24rem;
  font-weight: bold;
  color: #333;
  padding: 0.36rem 0.24rem;
  clear: both;
}
.dashang .num {
  float: right;
  color: #3c6efd;
  font-size: 0.3rem;
  font-weight: bold;
}
.list {
  margin: 0.14rem auto 0;
  padding: 0.21rem 0.24rem;
  clear: both;
  width: 6.7rem;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  border-radius: 0.1rem;
  font-size: 0.25rem;
  font-weight: bold;
  color: #333;
}
.list .icon img {
  width: 0.34rem;
  height: 0.29rem;
  opacity: 1;
  margin-left: 0.05rem;
  vertical-align: middle;
}
.list .time {
  float: right;
  font-size: 0.19rem;
  color: #9c9c9c;
}
.list .speak {
  padding: 0.13rem 0 0.28rem;
  font-size: 0.2rem;
}
.list input{
    display: inline-block;
    width: 6.19rem;
height: 0.60rem;
opacity: 1;
background: rgba(246,243,247,1);
border-radius: 0.08rem;
text-indent: 0.1rem;
}
.button {
  margin: 0.34rem auto;
  width: 6.7rem;
  height: 0.74rem;
  opacity: 1;
  border-radius: 0.1rem;
  background: rgba(91, 161, 231, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  font-size: 0.3rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  line-height: 0.74rem;
}
.input {
  width: 6.19rem;
  margin: auto;
  height: 1.74rem;
  opacity: 1;
  background: rgba(246, 243, 247, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
}
</style>
