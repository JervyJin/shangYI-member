<template>
  <div id="app">
    <div class="outter">
      <!--通用头部-->
      <header class="app-header" :class="{'header-hide':!$store.state.headerStatus}">
        <wx-header :pageName="pageName"></wx-header>
      </header>
      <!--搜索框 只在“微信”和“通讯录”页面下显示-->
      <!--四个门面页 “微信” “通讯录” “发现” “我”-->
      <section class="app-content">
        <transition
          name="custom-classes-transition"
          :enter-active-class="enterAnimate"
          :leave-active-class="leaveAnimate"
        >
          <router-view />
        </transition>
      </section>
      <!--底部导航 路由 -->
      <footer class="app-footer" v-if="$store.state.footstatus">
        <wx-nav></wx-nav>
      </footer>
    </div>
  </div>
</template>
<script>
import mixin from "./mixin"; // 混合被单独放在 mixin.js 中管理
window.mixin = mixin; // 将 混合/mixin 暴露在窗口对象中，某些组件需要时，直接提取 window.mixin
import WxHeader from "@/components/common/wx-header";
import WxNav from "@/components/common/wx-nav";

export default {
  name: "app",
  components: {
    WxHeader,
    WxNav
  },
  data() {
    return {
      pageName: "",
      routerAnimate: false,
      enterAnimate: "", //页面进入动效
      leaveAnimate: "" //页面离开动效
    };
  },
  created() {},
  methods: {},
  watch: {
    // 监听 $route 为店内页设置不同的过渡效果
    $route(to, from) {
      const toDepth = to.path.length;
      const fromDepth = from.path.length;
      if (toDepth === 2) {
        this.$store.commit("setPageName", to.name);
      }
      //同一级页面无需设置过渡效果
      if (to.meta.Athesamelevel) {
        return;
      }
      // this.enterAnimate =
      //   toDepth > fromDepth ? "animated fadeInRight" : "animated fadeInLeft";
      // this.leaveAnimate =
      //   toDepth > fromDepth ? "animated fadeOutLeft" : "animated fadeOutRight";
    }
  },
  updated() {
    // 只要组件发生变化都会触发可用于切换组件时公共数据的刷新
    // this.$store.dispatch('newbalance')
  }
};
</script>


<style lang="scss">
// .action-block{
//   display: none !important;
// }
$material-icons-font-path: "~material-icons/iconfont/";
@import "material-icons/iconfont/material-icons.scss";
@import "./assets/css/toast.css";
@import "assets/css/base.css";
@import "assets/css/common.css";
@import "assets/css/wx-header.css";
@import url("//at.alicdn.com/t/font_1224355_e2h6nseuquj.css");
// 直接覆盖van默认样式，使各个页面van样式都适配pad端p
.app-content {
  min-height: 100%;
}
.van-overlay {
  background-color: rgba(0, 0, 0, 0.1) !important;
}





/*阿里 fonticon*/
// @import "assets/css/lib/iconfont.css";
/*过渡效果需要的动画库*/
// @import "assets/css/lib/animate.css";
/*weui 样式库 非常适合高仿微信*/
// @import "assets/css/lib/weui.min.css";
</style>
