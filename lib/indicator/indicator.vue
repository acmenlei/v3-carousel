<template>
  <div class="indicator" v-if="state.indicator">
    <span
      v-for="item in state.len"
      :key="item"
      :style="{
        backgroundColor: globalIndex === item - 1 ? state.indicatorActiveColor : state.indicatorColor,
        width: globalIndex === item - 1 ? '20px' : '',
      }"
      @click="dicatorClick(item - 1)"
    ></span>
  </div>
</template>

<script setup lang="ts">
import { useIndicator } from "./hooks"
  
const emit = defineEmits(["DicatorClick", "before-moving", "after-moving"]);
    
const { state, globalIndex, dicatorClick} = useIndicator(emit)
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
