<template>
  <div class="indicator" v-if="indicator">
    <span
      v-for="item in len"
      :key="item"
      :style="{
        backgroundColor: globalIndex === item - 1 ? indicatorActiveColor : indicatorColor,
        width: globalIndex === item - 1 ? '20px' : '',
      }"
      @click="DicatorClick(item - 1)"
    ></span>
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  watch,
  inject,
} from "vue";
export default {
  name: "Indicator",
  emits: ["dicator-click", "before-moving", "after-moving"],
  setup(props, { emit }) {
    const carouselCtxState = inject('carouselCtxState');
    const carouselCtxProps = carouselCtxState.propsStaging;

    const state = reactive({
      len: carouselCtxState.CAROUSEL_ITEM_LEN,
      globalIndex: 0,
      indicator: carouselCtxProps.indicator,
      indicatorColor: carouselCtxProps.indicatorColor,
      indicatorActiveColor: carouselCtxProps.indicatorActiveColor,
    });

    watch(
      () => carouselCtxState.currentIndex,
      (v) => {
        state.globalIndex = v;
      }
    );

    const DicatorClick = (idx) => {
      if (idx !== state.globalIndex) {
        // 当点击的不是同一个所以我就
        let direction = "next";
        idx > state.globalIndex ? (direction = "next") : (direction = "prev");
        emit("before-moving", { index: state.globalIndex, direction }); // 滚动前
        emit("dicator-click", idx); // 开始滚动
        emit("after-moving", { index: idx, direction }); // 滚动后
      }
    };

    return {
      ...toRefs(state),
      DicatorClick,
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
  /* 不会遮挡住 切换按钮 */
  height: 1px;
  bottom: 10px;
  z-index: 2;
}
.indicator span {
  width: 10px;
  height: 3px;
  cursor: pointer;
  transition: all 0.5s;
}
.indicator span + span {
  margin-left: 10px;
}
</style>
