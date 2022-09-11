<template>
  <div class="CarouselItem">
    <transition>
      <div v-show="globalIndex === idx" class="container">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useCarouselIdxWatch } from "../../utils";

defineProps({
  idx: {
    type: Number,
    default: 0,
  }
})
// 获取当前展示图片的索引
const { globalIndex } = useCarouselIdxWatch()

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

.container:deep(img) {
  height: 100%;
  width: 100%;
}
</style>
