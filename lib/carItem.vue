<template>
  <div class="CarouselItem leeTestBeta2">
    <!-- <transition> -->
      <div
        v-show="globalIndex === idx"
        class="container"
      >
        <slot></slot>
      </div>
    <!-- </transition> -->
  </div>
</template>

<script>
import {
  getCurrentInstance,
  watch,
  computed,
  reactive,
  ref,
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
    // console.log('======= ctx.slots.default()[0].children:', ctx1.slots.default()[0]);

    const { idx } = toRefs(props);
    let carouselImgIndex = inject('carouselImgIndex');
    console.log('======= carouselImgIndex:', carouselImgIndex);
    watch(
      () => carouselImgIndex,
      (v) => {
        console.log('======= carouselItem v:', v);
        // state.globalIndex = v;
      }
    );
    const cantOperate = computed({
      get: (g = inject('carouselImgIndex')) => {
        console.log('======= g: ', g);
      },
      set: (s) => {
        // console.log('======= s: ', s)
      },
    });
    // const cantOperate = computed(() => inject('carouselImgIndex'));
    console.log('======= cantOperate:', cantOperate);

    const instance = getCurrentInstance();
    const ctx = instance.parent.ctx;
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
