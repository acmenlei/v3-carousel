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
import { getCurrentInstance } from "vue";
export default {
  name: "Direction",
  emits: ["prevHandleClick", "nextHandleClick"],
  props: {
    dir: String,
  },
  setup(props, { emit }) {
    const directionColor = getCurrentInstance().parent.ctx.directionColor;
    const directionSize = getCurrentInstance().parent.ctx.directionSize;
    const prevHandleClick = () => {
      emit("prevHandleClick");
    };
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
