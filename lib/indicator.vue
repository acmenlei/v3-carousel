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
  emits: ["DicatorClick", "before-moving", "after-moving"],
  setup(props, { emit }) {
    const instance = getCurrentInstance().parent;
    const len = instance.slots.default()[0].children.length;
    const globalColor = instance.props.indicatorColor;
    const activeColor = instance.props.indicatorActiveColor;
    const indicator = instance.props.indicator;
    const ctx = instance.ctx;

    const DicatorClick = (idx) => {
      if (idx !== ctx.currentIndex) {
        // 当点击的不是同一个所以我就
        let direction = "next";
        idx > ctx.currentIndex ? (direction = "next") : (direction = "prev");
        emit("before-moving", { index: ctx.currentIndex, direction }); // 滚动前
        emit("DicatorClick", idx); // 开始滚动
        emit("after-moving", { index: idx, direction }); // 滚动后
      }
    };

    const currentIndex = ref(ctx.currentIndex);

    watch(
      () => ctx.currentIndex,
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
