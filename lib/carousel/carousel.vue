<template>
  <div class="Carousel" @mouseenter="mouseEnterEvent" @mouseleave="mouseLeaveEvent"
    :style="{ width: containerWidth, height: containerHeight }" :class="{ leftToRight: state.leftToRight }">
    <slot></slot>

    <div v-show="isDirection && state.showDirection" class="direction-container">
      <Direction @prevHandleClick="prevHandleClick" dir="prev" />
      <Direction @nextHandleClick="nextHandleClick" dir="next" />
    </div>

    <Indicator v-show="state.showIndicator" @before-moving="beforeEmit" @after-moving="afterEmit"
      @DicatorClick="dicatorClick" />
  </div>
</template>

<script setup lang="ts">
import Indicator from "../indicator/indicator.vue";
import Direction from "../direction/direction.vue";
import { useCarousel } from "./hooks/useCarousel";

const props = defineProps({
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
})
const emit = defineEmits(["before-moving", "after-moving"])

const {
  prevHandleClick,
  nextHandleClick,
  mouseEnterEvent,
  mouseLeaveEvent,
  beforeEmit,
  afterEmit,
  isDirection,
  state,
  dicatorClick
} = useCarousel(props, emit);
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
.Carousel:deep(.v-enter-active),
.Carousel:deep(.v-leave-active) {
  transition: transform 0.4s linear;
}

/* 从右向左 */
.Carousel:deep(.v-enter-active) {
  transform: translateX(100%);
}

.Carousel:deep(.v-enter-to) {
  transform: translateX(0);
}

.Carousel:deep(.v-leave-active) {
  transform: translateX(0);
}

.Carousel:deep(.v-leave-to) {
  transform: translateX(-100%);
}

/* 从左向右 */
.leftToRight:deep(.v-enter-active) {
  transform: translateX(-100%) !important;
}

.leftToRight:deep(.v-enter-to) {
  transform: translateX(0) !important;
}

.leftToRight:deep(.v-leave-active) {
  transform: translateX(0) !important;
}

.leftToRight:deep(.v-leave-to) {
  transform: translateX(100%) !important;
}
</style>
