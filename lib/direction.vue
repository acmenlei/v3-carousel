<template>
  <div class="direction">
    <div class="prev" v-if="dir === 'prev'" @click="prevHandleClick">
      <i
        class="iconfont icon-page-previous"
        :style="{ color: directionColor, fontSize: directionSize + 'px' }"
      ></i>
    </div>
    <div class="next" v-if="dir === 'next'" @click="nextHandleClick">
      <i
        class="iconfont icon-page-next"
        :style="{ color: directionColor, fontSize: directionSize + 'px' }"
      ></i>
    </div>
  </div>
</template>

<script>
import "../icon/iconfont.css";
import {
  inject,
} from "vue";
export default {
  name: "Direction",
  emits: ["prevHandleClick", "nextHandleClick"],
  props: {
    dir: String,
  },
  setup(props, { emit }) {
    const carouselCtxState = inject('carouselCtxState');
    const carouselCtxProps = carouselCtxState.propsStaging;

    // 从父组件的 props 中获取需要的值
    const directionColor = carouselCtxProps.directionColor;
    const directionSize = carouselCtxProps.directionSize;

    // 向左滑动
    const prevHandleClick = () => {
      emit("prevHandleClick");
    };
    // 向右滑动
    const nextHandleClick = () => {
      emit("nextHandleClick");
    };

    return {
      prevHandleClick,
      nextHandleClick,
      directionColor,
      directionSize,
    };
  },
};
</script>

<style scoped>
.direction {
  z-index: inherit;
}
.prev,
.next {
  position: absolute;
  color: white;
  cursor: pointer;
  transform: translateY(-50%);
  top: 50%;
  background: #373d404d;
  height: 40px;
  width: 20px;
  text-align: center;
  z-index: inherit;
}
i {
  font-weight: bold;
  font-size: 16px;
  line-height: 40px;
}
.next {
  right: 0;
}
.prev {
  left: 0;
}
</style>
