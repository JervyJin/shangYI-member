<template>
  <div>
    <van-field
      v-model="result"
      v-bind="$attrs"
      readonly
      is-link
      @click="show = !show"
    />
    <van-popup v-model="show" position="bottom">
      <van-picker
        :columns="columns"
        show-toolbar
        :title="$attrs.label"
        @cancel="show = !show"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>

export default {
  model: {
    prop: "selectValue"
  },
  props: {
    columns: {
      type: Array
    },
    selectValue: {
      type: String
    }
  },
  data() {
    return {
      show: false,
      result: this.selectValue
    };
  },
  methods: {
    onConfirm(value) {
      this.result = value;
      this.show = !this.show;
    }
  },
  watch: {
    selectValue: function(newVal) {
      this.result = newVal;
    },
    result(newVal) {
      this.$emit("input", newVal);
    }
  }
};
</script>

<style></style>