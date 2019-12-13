<template>
  <div class="div">
    <lg-header></lg-header>
    <!-- <img class="img" src="../../assets/img/logo.png" alt> -->
    <lc-conent></lc-conent>
  </div>
</template>

<script>
import LgHeader from "./components/LoginHeader";
import LcConent from "./components/LoginContent";
import {mapState, mapGetters, mapMutations} from 'vuex'
export default {
  components: {
    LgHeader,
    LcConent
  },
  created() {
    this.$store.state.headerStatus = false;
  },

};
</script>

<style scoped>
.div {
  background: #f6f3f7;
  margin: 0 auto;
  min-height: 100%;
  /* padding-top: 3.23rem; */
  overflow-y: auto;
}
</style>