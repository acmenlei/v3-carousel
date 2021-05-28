<template>
  <div
    class="Carousel"
    @mouseenter="mouseEnterEvent"
    @mouseleave="mouseLeaveEvent"
    :style="{ width: containerWidth, height: containerHeight }"
    :class="{ leftToRight: leftToRight }"
  >
    <slot></slot>

    <div
      v-show="isDirection && showDirection"
      class="direction-container"
    >
      <Direction
        @prevHandleClick="prevHandleClick"
        dir="prev"
      />
      <Direction
        @nextHandleClick="nextHandleClick"
        dir="next"
      />
    </div>

    <Indicator
      v-show="showIndicator"
      @before-moving="beforeEmit"
      @after-moving="afterEmit"
      @dicator-click="DicatorClick"
    />
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  onMounted,
  onBeforeUnmount,
  provide,
} from "vue";
import Indicator from "./indicator.vue";
import Direction from "./direction.vue";

export default {
  name: "Carousel",
  emits: ["before-moving", "after-moving"],
  props: {
    containerWidth: { // 宽度
      type: String,
      default: "100%",
    },
    containerHeight: { // 高度
      type: String,
      default: "100%",
    },
    duration: { // 轮播延迟时间
      type: Number,
      default: 3000,
    },
    initIndex: { // 初始化 展示轮播的 index
      type: Number,
      default: 0,
    },
    autoplay: { // 是否自动播放
      type: Boolean,
      default: true,
    },
    direction: { // 是否展示 切换按钮
      type: Boolean,
      default: true,
    },
    directionMode: { // 切换按钮 展示方式
      type: String,
      default: "always", // always || hover
    },
    directionColor: { // 切换按钮 颜色
      type: String,
      default: "white",
    },
    directionSize: { // 切换按钮 大小
      type: Number,
      default: 25,
    },
    indicator: { // 是否展示 底部选中圆圈
      type: Boolean,
      default: true,
    },
    indicatorMode: { // 底部选中圆圈 展示方式
      type: String,
      default: "always", // always || hover
    },
    indicatorColor: { // 底部选中圆圈 颜色
      type: String,
      default: "rgb(255 255 255 / 50%)",
    },
    indicatorActiveColor: { // 底部选中圆圈 活跃颜色
      type: String,
      default: "#FFFFFF",
    },
  },
  components: {
    Indicator,
    Direction,
  },
  setup(props, { slots, emit }) {
    const state = reactive({
      CAROUSEL_ITEM_LEN: slots.default()[0].children.length,
      propsStaging: props, // 暂存 props 对象，供子组件使用
      currentIndex: props.initIndex, // 当前展示的索引
      showDirection: true, // 是否展示 切换按钮
      showIndicator: true, // 是否展示 底部选中圆圈
      leftToRight: false, // 从左向右滑动方式
    });

    // 其实子组件只需要 currentIndex 字段，但单独 provide 一个字段是非响应式的
    // 所以，将整个响应式对象传下去，在子组件内 inject 时是响应式的，配合 watch 食用即可
    provide('carouselCtxState', state);

    let timer = null;
    const isDirection = props.direction;
    const {
      directionMode,
      indicatorMode,
      duration,
    } = toRefs(props);

    const autoplayFunc = () => {
      timer = setInterval(() => {
        start("next");
      }, duration.value);
    };

    //#region 声明周期
    onMounted(() => {
      // 如果 autoplay 为真，自动轮播
      if (props.autoplay) {
        autoplayFunc();
      }
      // 如果 hover 模式，默认隐藏 切换按钮
      if (directionMode.value === 'hover') {
        state.showDirection = false;
      }
      // 如果 hover 模式，默认隐藏 底部选中圆圈
      if (indicatorMode.value === 'hover') {
        state.showIndicator = false;
      }
    });

    onBeforeUnmount(() => {
      clearTimer();
    });
    //#endregion

    const beforeEmit = (data) => {
      emit("before-moving", data);
    };
    const afterEmit = (data) => {
      emit("after-moving", data);
    };

    const changeLeftTranslate = () => {
      state.leftToRight = true;
      setTimeout(() => {
        state.leftToRight = false;
      }, 500);
    }

    const start = (direction) => {
      beforeEmit({ index: state.currentIndex, direction });
      switch (direction) {
        case "prev":
          changeLeftTranslate();
          state.currentIndex -= 1;
          if (state.currentIndex === -1) {
            state.currentIndex = state.CAROUSEL_ITEM_LEN - 1;
          }
          break;
        case "next":
          state.currentIndex += 1;
          if (state.currentIndex === state.CAROUSEL_ITEM_LEN) {
            state.currentIndex = 0;
          }
          break;
      }
      afterEmit({ index: state.currentIndex, direction });
    };

    const DicatorClick = (idx) => {
      // 如果是从 右 换到 左
      if (idx < state.currentIndex) {
        changeLeftTranslate();
      }
      state.currentIndex = idx;
    };

    const mouseEnterEvent = () => {
      clearTimer();
      // 如果 hover 模式，鼠标移入后，展示 切换按钮
      if (directionMode.value === 'hover') {
        state.showDirection = true;
      }
      // 如果 hover 模式，鼠标移入后，展示 底部选中圆圈
      if (indicatorMode.value === 'hover') {
        state.showIndicator = true;
      }
    };

    const mouseLeaveEvent = () => {
      autoplayFunc();
      // 如果 hover 模式，鼠标移出后，隐藏 切换按钮
      if (directionMode.value === 'hover') {
        state.showDirection = false;
      }
      // 如果 hover 模式，鼠标移出后，隐藏 底部选中圆圈
      if (indicatorMode.value === 'hover') {
        state.showIndicator = false;
      }
    };

    // 向左滑动
    const prevHandleClick = () => {
      start("prev");
    };
    // 向右滑动
    const nextHandleClick = () => {
      start("next");
    };

    function clearTimer() {
      clearInterval(timer);
      timer = null;
    }

    return {
      ...toRefs(state),
      DicatorClick,
      mouseEnterEvent,
      mouseLeaveEvent,
      prevHandleClick,
      nextHandleClick,
      isDirection,
      beforeEmit,
      afterEmit,
    };
  },
};
</script>

<style scoped>
.Carousel {
  position: relative;
  overflow: hidden;
}
.direction-container {
  z-index: 2;
}
/* 轮播方向 */
.Carousel >>> .v-enter-active,
.Carousel >>> .v-leave-active {
  transition: transform 0.5s linear;
}
/* 从右向左 */
.Carousel >>> .v-enter-active {
  transform: translateX(100%);
}
.Carousel >>> .v-enter-to {
  transform: translateX(0);
}
.Carousel >>> .v-leave-active {
  transform: translateX(0);
}
.Carousel >>> .v-leave-to {
  transform: translateX(-100%);
}
/* 从左向右 */
.leftToRight >>> .v-enter-active {
  transform: translateX(-100%) !important;
}
.leftToRight >>> .v-enter-to {
  transform: translateX(0) !important;
}
.leftToRight >>> .v-leave-active {
  transform: translateX(0) !important;
}
.leftToRight >>> .v-leave-to {
  transform: translateX(100%) !important;
}
</style>
