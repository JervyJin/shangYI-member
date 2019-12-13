<template>
  <div>
    <!-- 头部 -->
    <div class="div">
      <div class="left" @click="back()">
        <img src="../../assets/images/back.png" alt />
      </div>
      <span class="title">订单评价</span>
      <div class="right">
        <img src="../../assets/images/point.png" alt />
      </div>
    </div>
    <div class="cont">
      <p>
        <span>服务态度</span>
        <van-rate v-model="tdRate" />
      </p>
      <p>
        <span>商品质量</span>
        <van-rate v-model="zlRate" />
      </p>
      <p>
        <span>购物环境</span>
        <van-rate v-model="gwRate" />
      </p>
      <div class="input">
        <input type="text" v-model="content" placeholder="亲，您的评价对我们很重要哦~！" />
      </div>
    </div>
    <div class="button" @click="submit()">提交</div>
  </div>
</template>

<script>
import { Dialog } from 'vant';

export default {
  data() {
    return {
      tdRate: 0,
      zlRate: 0,
      gwRate: 0,
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
      }).then(() => {
        this.http.post('/api/services/app/MemberExpendService/AddEvaluate',{
          Attitude: this.tdRate,
          Quality: this.zlRate,
          Environment: this.gwRate,
          Content: this.content,
          MemberConsumptionOrderId: this.$route.query.id,
          OrganizationId: this.$route.query.OrganizationId,
          OrganizationCode: this.$route.query.OrganizationCode,
          OrganizationName: this.$route.query.OrganizationName
        })
        .then(res => {
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
        });
      }).catch(() => {});
    }
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
  margin: 0.15rem auto 0.4rem;
  width: 6.7rem;
  height: 4.98rem;
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
.cont p {
  width: 6.19rem;
  margin: auto;
  line-height: 0.88rem;
  color: rgba(51, 51, 51, 1);
  font-weight: bold;
  font-size: 0.24rem;
}
.input {
  width: 6.19rem;
  margin: auto;
  height: 1.74rem;
  opacity: 1;
  background: rgba(246, 243, 247, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
}
input {
  width: 100%;
  /* word-wrap:break-word;word-break:break-all;white-space:normal; */
  text-indent: 10px;
  box-sizing: border-box;
  padding: 4px 0px;
  font-size: 0.2rem;
  color: #9c9c9c;
  background: rgba(246, 243, 247, 1);
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
</style>
