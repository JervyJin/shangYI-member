<template>
  <div id="wx-nav">
	<nav id="nav">
        <router-link to="/home">
            <img src="../../../public/image/Homepagenotselected.png" alt="">
            <img src="../../../public/image/Homepageselected.png" alt="">
            <span>首页</span>
        </router-link>
        <router-link to="/fellow" exact>
            <img src="../../../public/image/Friendsnotselected.png" alt="">
            <img src="../../../public/image/Friendsselected.png" alt="">
            <span>好友</span>
        </router-link>
		<router-link to="/redpacket" > 
         <img src="../../../public/image/Redenvelopeswerenotselected.png" alt="">
              <img src="../../../public/image/Redenvelopeswereselected.png" alt="">
              <span class="redpacket">抢红包</span>
        </router-link>
		<router-link to="/market">
             <img src="../../../public/image/Marketnotselected.png" alt=""> 
             <img src="../../../public/image/Marketselected.png" alt="">  
              <span>市场</span> 
        </router-link>
		<router-link to="/personal">
            <img src="../../../public/image/Individualnotselected.png" alt="">
            <img src="../../../public/image/Individualselection.png" alt="">
            <span>个人</span>
        </router-link>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style>
@import "../../assets/css/wx-nav.css";
#wx-nav{
    width: 100%;
    height: 1rem;
}
</style>
