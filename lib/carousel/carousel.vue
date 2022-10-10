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

const props = withDefaults(defineProps<{
  containerWidth?: string;
  containerHeight?: string;
  duration?: number;
  initIndex?: number,
  autoplay?: boolean;
  direction?: boolean;
  directionMode?: string;
  directionColor?: string;
  directionSize?: number;
  indicator?: boolean;
  indicatorMode?: string;
  indicatorColor?: string;
  indicatorActiveColor?: string;
}>(), {
  containerWidth: '100%',
  containerHeight: '100%',
  duration: 3000,
  initIndex: 0,
  autoplay: true,
  direction: true,
  directionMode: 'always',
  directionColor: 'white',
  directionSize: 25,
  indicator: true,
  indicatorMode: 'always',
  indicatorColor: "rgb(255 255 255 / 50%)",
  indicatorActiveColor: '#FFFFFF'
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
