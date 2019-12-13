<template>
    <pull-to 
    :top-load-method="topload" 
    :bottom-load-method="bottomload" 
    :is-top-bounce="topbounce" 
    :is-bottom-bounce="bottombounce"
    :bottom-block-height=0
    @infinite-scroll="emitEvent('infinite-scroll')">
        <slot></slot>
    </pull-to>
</template>
<script>
import PullTo from "./PullTo";
export default {
  components: {
    PullTo
  },
  props: {
      topload: null,
      bottomload: null,
      topbounce: true,
      bottombounce:true,
  },
  methods: {
    emitEvent(event) {
        this.$emit(event)
    },
  }
};
</script>

<style scoped>
.all {
  height: 12.5rem;
  padding-bottom: 1rem;
  overflow-y: auto;
  background: #f2f2f2;
}
</style>