<template>
  <div class="CarouselItem">
    <transition>
      <div class="container" v-if="globalIndex === key">
        <slot></slot>
      </div>
    </transition>
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
.container {
  position: relative;
}
.container >>> img {
  height: 100%;
  width: 100%;
}
</style>
