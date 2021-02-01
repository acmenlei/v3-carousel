<template>
  <div
    class="Carousel"
    @mouseenter="mouseEnterEvent"
    @mouseleave="mouseLeaveEvent"
    :style="{ width: containerWidth, height: containerHeight }"
  >
    <slot></slot>
    <Indicator
      class="indicator"
      @before-moving="beforeEmit"
      @after-moving="afterEmit"
      @DicatorClick="DicatorClick"
    />
    <div class="direction-container" v-if="isDirection">
      <Direction
        @prevHandleClick="prevHandleClick"
        class="direction"
        dir="prev"
      />
      <Direction
        @nextHandleClick="nextHandleClick"
        class="direction"
        dir="next"
      />
    </div>
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  getCurrentInstance,
  watch,
  onMounted,
  onBeforeUnmount,
} from "vue";
import Indicator from "./indicator.vue";
import Direction from "./direction.vue";

export default {
  name: "Carousel",
  emits: ["before-moving", "after-moving"],
  props: {
    autoplay: {
      type: Boolean,
      deafult: true,
    },
    duration: {
      type: Number,
      default: 3000,
    },
    initIndex: {
      type: Number,
      default: 0,
    },
    direction: {
      type: Boolean,
      default: true,
    },
    indicator: {
      type: Boolean,
      default: true,
    },
    indicatorColor: {
      type: String,
      default: "white",
    },
    indicatorActiveColor: {
      type: String,
      default: "orangered",
    },
    directionColor: {
      type: String,
      default: "white",
    },
    directionSize: {
      type: Number,
      default: 25,
    },
    containerWidth: {
      type: String,
      default: "1200px",
    },
    containerHeight: {
      type: String,
      default: "500px",
    },
  },
  components: {
    Indicator,
    Direction,
  },
  setup(props, { slots, emit }) {
    const state = reactive({
      currentIndex: props.initIndex,
    });
    let timer = null;
    const CAROUSEL_ITEM_LEN = slots.default()[0].children.length;
    const isDirection = props.direction;

    const autoplay = () => {
      timer = setInterval(() => {
        start("next");
      }, props.duration);
    };

    onMounted(() => {
      if (props.autoplay) {
        autoplay();
      }
    });
    onBeforeUnmount(() => {
      clearTimer();
    });

    const beforeEmit = (data) => {
      emit("before-moving", data);
    };
    const afterEmit = (data) => {
      emit("after-moving", data);
    };

    const start = (direction) => {
      beforeEmit({ index: state.currentIndex, direction });
      switch (direction) {
        case "prev":
          state.currentIndex -= 1;
          if (state.currentIndex === -1) {
            state.currentIndex = CAROUSEL_ITEM_LEN - 1;
          }
          break;
        case "next":
          state.currentIndex += 1;
          if (state.currentIndex === CAROUSEL_ITEM_LEN) {
            state.currentIndex = 0;
          }
          break;
      }
      afterEmit({ index: state.currentIndex, direction });
    };

    const DicatorClick = (idx) => {
      state.currentIndex = idx;
    };

    const mouseEnterEvent = () => {
      clearTimer();
    };

    const mouseLeaveEvent = () => {
      autoplay();
    };

    const prevHandleClick = () => {
      start("prev");
    };
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
</style>
