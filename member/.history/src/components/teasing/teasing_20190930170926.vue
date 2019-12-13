<template>
  <div>
    <heade title="我要吐槽"></heade>

    <div class="banner">
      <van-field
        readonly
        clickable
        label="投诉门店"
        :value="value"
        left-icon="shop-o"
        placeholder="请选择门店 >"
        @click="handleClick"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>

      <div class="toushucont">
        <div class="titletop">投诉内容</div>
        <div class="input">
          <textarea type="text" v-model="content" placeholder="亲，您的评价对我们很重要哦~！" />
        </div>
        <!-- <textarea ></textarea> -->
      </div>
      <van-button type="info" size="large" @click="myTeasing">提交</van-button>
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
      value: "",
      showPicker: false,
      columns: [],
      content: "",
      org: {}
    };
  },
  methods: {
    myTeasing() {
      if (!this.value) {
        this.$toast({
          message: "请选择门店!!",
          duration: 2000
        });
        return;
      }
      if (!this.content) {
        this.$toast({
          message: "请填写内容!!",
          duration: 2000
        });
        return;
      }
      console.log(this.org);
      this.http
        .post("/api/services/app/MemberComplaintService/AddMemberComplaint", {
          ComplaintOrganizationId: this.org.id,
          ComplaintOrganizationCode: this.org.code,
          ComplaintOrganizationName: this.org.text,
          Content: this.content
        })
        .then(res => {
          if (res.Result.Code === 0) {
            this.$toast({
              message: "吐槽成功!!",
              duration: 2000
            });
            setTimeout(() => {
              this.$router.push({
                name: "myTeasing"
              });
            }, 2000);
          }
        });
    },
    onConfirm(obj) {
      this.value = obj.text;
      this.org = obj;
      this.showPicker = false;
    },
    handleClick() {
      this.showPicker = true;
    }
  },
  created() {
    this.http
      .get("/api/services/app/MemberComplaintService/GetListOrganization")
      .then(res => {
        console.log(res);
        if (res.Result.Code === 0) {
          res.Result.Data.forEach(item => {
            this.columns.push({
              text: item.Name,
              code: item.Code,
              id: item.Id
            });
          });
        }
      });
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/css/globeDialog.css";

.banner {
  width: 100%;
  padding: 0.12rem 0.4rem;
}
.van-field__label {
  font-size: 0.24rem;
  font-family: "Microsoft YaHei Regular";
}
.van-field__body::-webkit-input-placeholder {
  /*WebKit browsers*/
  // color: red;
  font-family: "Microsoft YaHei Light";
  font-size: 0.24rem;
  font-weight: 6rem;
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
  /*font-weight: Regular;*/
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

.coushustore {
  /* margin-left: 0.39rem; */
  margin-top: 0.05rem;
  margin-bottom: 0.06rem;
  width: 6.7rem;
  height: 0.95rem;
  line-height: 0.95rem;
  border-radius: 0.1rem;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
}

.store {
  float: left;
  margin-left: 0.24rem;
  font-size: 0.24rem;
  /*font-weight: Regular;*/
}

.selectstore {
  float: right;
}

.selectstore .text {
  font-size: 0.2rem;
  color: #9c9c9c;
}

.selectstore .img {
  width: 0.13rem;
  height: 0.24rem;
  margin-right: 0.23rem;
}

.toushucont {
  margin-top: 0.15rem;
  height: 2.81rem;
  opacity: 1;
  border-radius: 0.1rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 0px 0 rgba(3, 0, 6, 0.1);
}

.toushucont .titletop {
  /* float: left; */
  height: 0.77rem;
  line-height: 0.77rem;
  margin-left: 0.22rem;
  font-size: 0.3rem;
  color: rgba(0, 0, 0, 1);
  font-weight: 6rem;
}

.input {
  width: 6.19rem;
  margin: auto;
  height: 1.74rem;
  opacity: 1;
  background: rgba(246, 243, 247, 1);
  border-radius: 6px;
  padding: 0.1rem;
  /*box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);*/
}

textarea {
  width: 100%;
  height: 100%;
  /* word-wrap:break-word;word-break:break-all;white-space:normal; */
  box-sizing: border-box;
  font-family: Microsoft YaHei Light !important;
  font-size: 0.2rem;
  color: #9c9c9c;
  background: rgba(246, 243, 247, 1);
}

button {
  /*text-align: center;*/
  /*display: block;*/
  /*margin: 0.4rem auto 0;*/
  /*border-radius: 0.1rem;*/
  /*font-weight: bold;*/
  /*width: 6.7rem;*/
  /*height: 0.74rem;*/
  /*color: rgba(255, 255, 255, 1);*/
  /*font-size: 0.3rem;*/
  /*opacity: 1;*/
  /*background: rgba(91, 161, 231, 1);*/
  /*box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);*/
  margin-top: 10px;
}

.van-dropdown-menu__title {
  position: absolute;
  top: 0;
  box-sizing: border-box;
  max-width: 100%;
  padding: 0 0.08rem;
  color: #323233;
  font-size: 0.15rem;
}

.van-dropdown-menu__item {
  height: 0;
}

.van-dropdown-menu {
  height: 0px;
  background-color: #fff;
  -webkit-user-select: none;
  user-select: none;
}

.van-ellipsis {
  vertical-align: middle;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 0.08rem;
}

/deep/ {
  .van-cell.van-cell--clickable.van-field {
    box-shadow: 0px 1px 0px 0 rgba(3, 0, 6, 0.1);
    border-radius: 4px;
    align-items: center;
  }
  .van-field__body input {
    font-family: Microsoft YaHei Light;
    font-weight: bold;
  }
  .van-field__body {
    input {
      font-size: 0.18rem;
      text-align: right;
    }
  }
  .van-cell {
    padding: 0.2rem 0.32rem;
    font-size: 0.28rem;
    line-height: 0.48rem;
    background-color: #fff;
  }
  .van-field__label {
    width: 1.8rem;
    font-weight: 600;
  }
  .van-icon {
    font-size: 0.32rem;
  }
  .van-button--large {
    height: 0.9rem;
    line-height: 0.88rem;
    border-radius: 0.1rem;
    margin-top: 0.4rem;
    font-size: 0.3rem;
  }
}
</style>
