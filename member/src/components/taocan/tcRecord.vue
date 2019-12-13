<template>
  <div>
    <!-- 头部 -->
    <heade title="历史套餐记录"></heade>
    <div class="banner">
      <div class="box">
        <div class="title">
          <img src="../../assets/images/record.png" alt />
          <span>使用记录</span>
        </div>
        <van-divider />
        <div class="main">
          <div class="left">
            <p>套餐名称</p>
            <p>套餐账号</p>
            <p>支付金额</p>
            <p>使用时间</p>
            <p>交易流水号</p>
          </div>
          <div class="right">
            <p>套餐名称</p>
            <p>套餐账号</p>
            <p>支付金额</p>
            <p>使用时间</p>
            <p>交易流水号</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import heade from "../common/heade";
export default {
  components: {
    heade
  },
  methods:{
    gotoJili(){
     this.http.get('/api/services/app/CRMMemberComboService/GetCRMHisComboInfo',{
       params:{
         comboId:this.$route.query.id,
         page:this.$route.query.page,
         rows:this.$route.query.rows
       }
     }).then(res=>{
       console.log(res)
       this.lishiJilu = res.Result.Data
     })
   }
  },
  created(){
    this.gotoJili()
  }
};
</script>

<style scoped>
.banner {
  width: 100%;
  padding: 0.12rem 0.4rem;
}
.box {
  /* height: 386px; */
  padding: 0.3rem;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
}
.box img {
  width: 0.3rem;
  height: 0.3rem;
  vertical-align: middle;
  margin-right: 0.15rem;
}
.box span {
  font-size: 0.3rem;
  color: #000;
  font-weight: bold;
}
.main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 0.4rem;
}
.left {
  font-size: 0.24rem;
  color: #999;
  font-weight: bold;
}
.right {
  font-size: 0.24rem;
  color: #333;
  font-weight: bold;
}
</style>