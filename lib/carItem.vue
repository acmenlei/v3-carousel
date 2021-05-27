<template>
  <div class="CarouselItem leeTestBeta2">
    <transition>
      <div
        v-show="globalIndex === idx"
        class="container"
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import {
  watch,
  reactive,
  toRefs,
  inject,
} from "vue";

export default {
  name: "CarouselItem",
  props: {
    idx: {
      type: Number,
      default: 0,
    },
  },
  setup(props, ctx1) {
    // 获取每个子组件图片的索引
    const { idx } = toRefs(props);

    const state = reactive({
      globalIndex: 0,
    });

    // 获取当前展示图片的索引
    const carouselCtxState = inject('carouselCtxState');
    watch(
      () => carouselCtxState.currentIndex,
      (v) => {
        state.globalIndex = v;
      }
    );

    return {
      ...toRefs(state),
      idx,
    };
  },
};
</script>

<style scoped>
.CarouselItem {
  position: absolute;
  height: 100%;
  width: 100%;
}
.container {
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 1;
}
.container >>> img {
  height: 100%;
  width: 100%;
}
</style>
