<template>
  <div>
    <!-- 头部 -->
    <heade title="添加纪念日"></heade>
      <div class="wap">
        <van-row type="flex" justify="space-between" v-for="(item,index) in items" :key="index">
          <!-- 称呼类型 -->
          <van-col span="5">
            <div class="van-cell van-field drop-container">
              <van-dropdown-menu>
                <van-dropdown-item v-model="item.Name" :options="sexLis" />
              </van-dropdown-menu>
            </div>
          </van-col>
          <!-- 生日类型 -->
          <van-col span="5">
            <div class="van-cell van-field drop-container">
              <van-dropdown-menu>
                <van-dropdown-item v-model="item.DateType" :options="birthdayTypeLis" />
              </van-dropdown-menu>
            </div>
          </van-col>
          <!-- 纪念日类型 -->
          <van-col span="5">
            <div class="van-cell van-field drop-container">
              <van-dropdown-menu>
                <van-dropdown-item v-model="item.Target" :options="type" />
              </van-dropdown-menu>
            </div>
          </van-col>
          <!-- 日期 -->
          <van-col span="10">
            <van-field v-model="item.Date" disabled clearable is-link @click="showBirthday(index)" />
          </van-col>
          <!-- 删除当前行 -->
          <van-col span="3">
            <van-icon name="cross"  @click="del(index)"/>
          </van-col>
        </van-row>

      <van-button type="default" size="large" @click="add">添加纪念日</van-button>
      </div>

      <!-- 日期弹窗 -->
      <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="new Date('1970/01/01')"
          :max-date="new Date()"
          @confirm="handleConfirm"
          @cancel="handleCancel"
        />
      </van-popup>

    
        <van-button class="button" type="info" @click="save">保存</van-button>
  </div>
</template>

<script>
import heade from "../common/heade";
import dayjs from "dayjs";

export default {
  components: {
    heade
  },
  data() {
    return {
      index:0,
      items:[],
      
      sexLis: [
        { text: "妻子", value: "妻子" },
        { text: "老公", value: "老公" },
        { text: "女儿", value: "女儿" },
        { text: "父亲", value: "父亲" },
        { text: "母亲", value: "母亲" },
        { text: "岳母", value: "岳母" },
        { text: "岳父", value: "岳父" },
        { text: "婆婆", value: "婆婆" },
        { text: "儿媳", value: "儿媳" },
        { text: "哥哥", value: "哥哥" },
        { text: "姐姐", value: "姐姐" },
        { text: "弟弟", value: "弟弟" }
      ],
      birthdayTypeLis: [{ text: "公历", value: 0 }, { text: "农历", value: 1 }],
      type: [
        { text: "生日", value: "生日" },
        { text: "结婚", value: "结婚" },
        { text: "百天", value: "百天" },
        { text: "过寿", value: "过寿" },
        { text: "订婚", value: "订婚" }
      ],
      show: false,
      currentDate: new Date(),
      currentRiqi: dayjs(new Date()).format("YYYY-MM-DD") ,

    };
  },
  methods: {
    // 添加纪念日
    add(){
      this.items.push({DateType:0,Name:"妻子",Target:"生日"})
    },
    del(index){
      this.items.splice(index,1)
    },
    showBirthday(index) {
      this.index = index
      this.show = true;
    },
    handleConfirm(val) {
      // this.userInfo.Birthday = val;
      this.items[this.index].Date = dayjs(val).format("YYYY-MM-DD");
      this.show = false;
    },
    handleCancel() {
    
      this.show = false;
    },
    /**
     * 提交
     */
    save() {
      // console.log(this.items)
      for(let i = 0;i<this.items.length; i++){
        if (!this.items[i].Date) {
        this.$toast({
          message: "选择生日",
          duration: 2000
        });
        return;
        }
      }
      
      this.http
        .post("/api/services/app/CRMMemberMyInfoService/AddCRMMemberImportant", {
          CRMMemberImportantList:this.items
      
        })
        .then(res => {
          if (res.Result.Code === 0) {
            this.$toast({
              message: "修改成功!!",
              duration: 2000
            });
            // this.$store.commit("setToken", res.Result.Data);
            setTimeout(() => {
              this.$router.push({
                name: "index"
              });
            }, 2000);
          } 
        });
    },
    /*
    *获取纪念日信息
    */
    getInfo(){
      this.http
        .get("/api/services/app/CRMMemberMyInfoService/GetCRMMemberImportant", {
           params: {}
        })
        .then(res => {
          console.log(res)
          if (res.Result.Code === 0) {
            this.items = res.Result.Data;
            
          }
        });
    }
  },

  created() {
    this.getInfo()
  },
};
</script>

<style scoped lang="scss" type="text/scss">
.banner {
  width: 100%;
  padding: 0.12rem 0.4rem;
}
.info {
  padding: 0.38rem 0.25rem;
  /* height: 5.12rem; */
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  font-size: 0.24rem;
  font-weight: bold;
  color: #333333;
}
.info .flex {
  display: flex;
  justify-content: space-between;
}
.info div > span {
  margin-right: 0.1rem;
}
.send {
  padding: 0.1rem;
  border: #5ba1e7 1px solid;
  color: #5ba1e7;
  border-radius: 0.05rem;
}
/* list */
.list {
  margin-top: 0.12rem;
  padding: 0.3rem;
  border-radius: 0.1rem;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
  font-size: 0.25rem;
  color: #000000;
  font-weight: bold;
}
.list img {
  width: 0.3rem;
  height: 0.3rem;
  margin-right: 0.11rem;
}
.list .title {
  font-size: 0.3rem;
}
.list .text {
  margin-left: 0.37rem;
  color: #333333;
}
.list .son {
  margin-left: 0.4rem;
  line-height: 0.6rem;
}
.son span {
  display: inline-block;
}
.son a {
  display: inline-block;
  width: 3.63rem;
  color: #3c6efd;
}
.tip {
  text-align: center;
  margin-top: 0.43rem;
  color: #c0bfbf;
}
.button {
  width: 100%;
  height: 0.9rem;
  line-height: 0.88rem;
  border-radius: 0.1rem;
  margin-top: 0.3rem;
  font-size: 0.28rem;
}
.drop-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  .van-dropdown-menu.van-hairline--top-bottom {
    height: auto !important;
    background-color: white;
  }
}
.zc-label {
  display: flex;
  align-items: center;
  margin-bottom: 0.2rem;
}
.van-col--3{
  margin-left: 0.1rem;
  vertical-align: middle;
  line-height: 0.45rem;
}
.van-cell{
  padding: 0.1rem 0.12rem;
}
// .van-button--large{
//   height: 45px;
//   line-height: 44px;
//   border-radius: 0.1rem;
// }
/deep/{


  .van-cell {
    // padding: 0.2rem 0.32rem;
    margin-top: 0.11rem;
    border-radius: 0.1rem;
    font-size: 0.28rem;
    line-height: 0.48rem;
    background-color: #fff;
    background: rgba(255,255,255,1);
    // box-shadow: 0px 2px 6px 0px rgba(3,0,6,0.1);
  }

.van-dropdown-menu__title {
  
    padding: 0 0.16rem;
    color: #323233;
    font-size: 0.3rem;
}
.van-dropdown-menu__title::after{
    top: 0.15rem;
    border: 0.06rem solid;
    border-color: transparent transparent currentColor currentColor;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  .van-field__control {
    font-size: 0.24rem;
    font-family: unset;
  }

  .van-button--large {
    height: 0.9rem;
    line-height: 0.88rem;
    border-radius: 0.1rem;
    font-size: 0.28rem;
  }
}
.wap{
background: #fff;
    width: 90%;
    margin: auto;
    border-radius: 0.1rem;
    margin-top: 10px;
}
</style>
