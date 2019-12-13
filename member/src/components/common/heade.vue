<template>
  <div>
    <!-- <div class="div">
      <div class="left" @click="back()">
        <img src="../../assets/images/back.png" alt />
      </div>
      <span class="title">{{title}}</span>
      <div class="right">
        <img src="../../assets/images/point.png" alt />
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  props: {
    title: ""
  },
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style scoped lang="scss">
.div {
  background: #ffffff;
  height: 1.42rem;
  line-height: 1.42rem;
  clear: both;
  text-align: center;
  font-size: 0.36rem;
  font-weight: Regular;
  font-family: Microsoft YaHei Regular;
  .left {
    float: left;
    margin-left: 0.4rem;
    img {
      /* width: 0.22rem; */
      height: 0.32rem;
      opacity: 1;
    }
  }
  .right {
    float: right;
    margin-right: 0.3rem;
    img {
      height: 0.37rem;
    }
  }
}
</style>