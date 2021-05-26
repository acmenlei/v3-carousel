<template>
  <div class="CarouselItem leeTestBeta2">
    <!-- <transition> -->
      <div
        v-show="globalIndex === key"
        class="container"
      >
        <slot></slot>
      </div>
    <!-- </transition> -->
  </div>
</template>

<script>
import { getCurrentInstance, watch, reactive, toRefs } from "vue";

export default {
  name: "CarouselItem",
  setup() {
    const instance = getCurrentInstance();
    const ctx = instance.parent.ctx;
    const key = instance.vnode.key;
    const state = reactive({
      globalIndex: ctx.currentIndex,
    });
    /* 监听父组件索引 */
    watch(
      () => ctx.currentIndex,
      (v) => {
        state.globalIndex = v;
      }
    );

    return {
      ...toRefs(state),
      key,
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
