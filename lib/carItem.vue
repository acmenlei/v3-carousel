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
.container img {
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
}
.v-enter-active,
.v-leave-active {
  transition: transform 0.4s linear;
}
.v-enter-active {
  transform: translateX(-100%);
}
.v-enter-to {
  transform: translateX(0);
}
.v-leave-active {
  transform: translateX(0);
}
.v-leave-to {
  transform: translateX(100%);
}
</style>
