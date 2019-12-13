<template>
  <div>
    <!-- 头部 -->
    <heade title="会员信息"></heade>

    <div class="user">
      <img class="touxiang" :src="data.HeadPortrait" alt v-if="data.HeadPortrait" />
      <img class="touxiang" src="../../assets/images/touxiang.png" alt v-else />
      <div class="right">
        <p class="name">{{data.Name}}</p>
        <p class="phone">{{data.Phone}}</p>
      </div>

      <van-row>
        <van-col span="6" class="li" v-for="(item,index) in lstFeature" :key="index">
          <!-- <img :src="item.Image" alt /> -->
          <img src="../../assets/images/jiangli.png" alt @click="quanyi(item.Id)" />
          <p class="zekou">{{item.Name}}</p>
        </van-col>
      </van-row>
    </div>

    <!-- 进度 -->
    <div class="process">
      <h1>您的成长进度</h1>
      <p class="num">当前成长值：{{data.Growth}}</p>
      <!-- <van-progress :percentage="data.Schedule" /> -->
      <div class="progress_wrap">
        <span class="progress" :style="{'width': `${data.Schedule}%`}" :class="{'has_progress': data.Schedule > 10}"></span>
      </div>
      <div class="shenfen">
        <span>{{data.CurrentName}}</span>
        <span>{{data.NextName}}</span>
      </div>
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
      data: {
        Schedule: 0
      },
      lstFeature: []
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    quanyi(id) {
      console.log(11211);
      this.$router.push({
        path: "/quanyi",
        query: { id: id }
      });
    },
    getList() {
      let that = this;
      this.http
        .get("/api/services/app/MemberGradeService/GetMemberGradeFeature", {
          params: {}
        })
        .then(res => {
          console.log(res);

          this.data = res.Result.Data;
          that.data.Schedule = parseInt(that.data.Schedule * 100);
          this.lstFeature = res.Result.Data.lstFeature;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style scoped lang="scss">
.user {
  clear: both;
  width: 6.7rem;
  /* height: 1.34rem; */
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  border-radius: 0.1rem;
  margin: 0.13rem auto;
  padding: 0.17rem 0.25rem;
  line-height: 0.89rem;
  font-size: 0.24rem;
  color: #000000;
  font-weight: bold;
}
.user .name {
  font-size: 0.3rem;
}
.user .touxiang {
  float: left;
  width: 1rem;
  height: 1rem;
  margin-right: 0.25rem;
}
.user .right {
  line-height: 0.5rem;
  /*margin-bottom: 0.5rem;*/
}
.user .right .phone {
  font-size: 0.24rem;
}
.user .li {
  text-align: center;
}
.user .li img {
  width: 0.8rem;
  height: 0.8rem;
}
.user .li .zekou {
  size: 0.24rem;
  color: rgba(0, 0, 0, 1);
}
.process {
  width: 6.7rem;
  margin: auto;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  -webkit-box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  border-radius: 0.1rem;
  padding: 0.17rem 0.25rem;
  .progress_wrap{
    width: 100%;
    height: 4px;
    background: #e5e5e5;
    border-radius: 0.08rem;
    margin-bottom: 0.18rem;
    position: relative;
    &::before{
      display: block;
      content: '';
      width: 0.12rem;
      height: 0.12rem;
      border-radius: 50%;
      background: #5BA1E7;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(-50%, -50%);
    }
    .progress{
      display: flex;
      height: 100%;
      background: #5BA1E7;
      &.has_progress{
        position: relative;
        &::after{
          display: block;
          content: '';
          width: 0.12rem;
          height: 0.12rem;
          border-radius: 50%;
          background: #5BA1E7;
          position: absolute;
          top: 50%;
          right: -6px;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
.process h1 {
  font-size: 0.3rem;
  color: #000;
  font-weight: bold;
  text-align: center;
  margin-top: 0.06rem;
  margin-bottom: 0.2rem;
}
.process .num {
  color: #666666;
  font-size: 0.2rem;
  font-weight: bold;
  margin-bottom: 0.16rem;
}
.process .shenfen {
  display: flex;
  justify-content: space-between;
  padding: 0 0 0.15rem;
  font-size: 0.24rem;
  color: #000;
}
.van-swipe-item {
  width: 100%;
}
.van-progress {
    position: relative;
    height: 0.08rem;
    width: 100%;
    background: #e5e5e5;
    border-radius: 0.08rem;
}
/deep/.van-progress__pivot {
   
    min-width: 2em;
    padding: 0 0.1rem;
    font-size: 0.2rem;
    line-height: 1.6;
    
}
</style>