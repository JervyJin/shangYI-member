<template>
  <!--复兴性高，数据交互比较频繁-->
  <div id="wx-header" v-show="$route.path==='/fellow'">
    <!--右上角图标-->
    <div class="other" v-show="$route.path==='/fellow'">
      <!--只在“微信”页显示 更多图标-->
      <!-- &#xe609 -->
      <img src="../../../public/image/seach.png" class="iconfont icon-search" v-show="$route.path==='/fellow'" v-on:click="$router.push('/wechat/search-friend')"/>
      <img src="../../../public/image/addhao.png" class="iconfont icon-tips-jia" v-show="$route.path==='/fellow'" v-on:click="$router.push('/wechat/add-friend')"/>
      
      <!--<div class="tips-masker" v-show="tips_isOpen"></div>-->
    </div>
    <div class="center">
      <!--显示当前页的名字-->
      <!-- <span>{{$store.state.currentPageName}}</span> -->
      <img src="../../../public/image/friend.png" alt="">
      <!--微信群 显示群名以及成员人数 好像和 dialogue 组件 写重了 sad -->
      <span class="parentheses" v-show='$route.query.group_num&&$route.query.group_num!=1'>{{$route.query.group_num}}</span>
    </div>
  </div>
</template>
<script>
    export default {
        props: ["pageName"],
        data() {
            return {
                // 暂且用不到
                chatCount: true
            }
        },
        methods: {
            // 暂且用不到 先留着
            goBack() {
                this.$router.go(-1)
                    //保证返回操作后正确显示页面名称
                    // this.$store.commit("setPageName", this.$store.state.backPageName)
            }
        }
    }
</script>
<style>
</style>