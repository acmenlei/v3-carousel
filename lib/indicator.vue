<template>
  <div class="indicator" v-if="indicator">
    <span
      v-for="item in len"
      :key="item"
      :style="{
        backgroundColor: currentIndex === item - 1 ? activeColor : globalColor,
      }"
      @click="DicatorClick(item - 1)"
    ></span>
  </div>
</template>

<script>
import { ref, getCurrentInstance, watch } from "vue";
export default {
  name: "Indicator",
  emits: ["DicatorClick"],
  setup(props, { emit }) {
    const instance = getCurrentInstance().parent;
    const len = instance.slots.default()[0].children.length;
    const globalColor = instance.props.indicatorColor;
    const activeColor = instance.props.indicatorActiveColor;
    const indicator = instance.props.indicator;

    const DicatorClick = (idx) => {
      emit("DicatorClick", idx);
    };

    const currentIndex = ref(instance.ctx.currentIndex);

    watch(
      () => instance.ctx.currentIndex,
      (v) => {
        currentIndex.value = v;
      }
    );
    return {
      len,
      DicatorClick,
      globalColor,
      currentIndex,
      activeColor,
      indicator,
    };
  },
};
</script>

<style scoped>
.indicator {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 100%;
}
.indicator span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 10px 2px;
  cursor: pointer;
}
</style>
