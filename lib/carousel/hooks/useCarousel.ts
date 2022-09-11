import { CarouselContextState } from './../../../types';
import { onBeforeUnmount, onMounted, provide, reactive, toRefs, useSlots } from "vue";

export function useCarousel(props, emit) {
  const slots = useSlots();
  let timer;

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

  onBeforeUnmount(clearTimer);
  //#endregion
  const state: CarouselContextState = reactive({
    CAROUSEL_ITEM_LEN: (slots.default()[0].children?.length) as number,
    propsStaging: props, // 暂存 props 对象，供子组件使用
    currentIndex: props.initIndex, // 当前展示的索引
    showDirection: true, // 是否展示 切换按钮
    showIndicator: true, // 是否展示 底部选中圆圈
    leftToRight: false, // 从左向右滑动方式
  });

  // 其实子组件只需要 currentIndex 字段，但单独 provide 一个字段是非响应式的
  // 所以，将整个响应式对象传下去，在子组件内 inject 时是响应式的，配合 watch 食用即可
  provide('carouselCtxState', state);

  const isDirection = props.direction, { directionMode, indicatorMode, duration } = toRefs(props);

  function autoplayFunc() {
    timer = setInterval(() => {
      start("next");
    }, duration.value);
  };

  function beforeEmit(data) {
    emit("before-moving", data);
  };
  function afterEmit(data) {
    emit("after-moving", data);
  };

  function changeLeftTranslate() {
    state.leftToRight = true;
    setTimeout(() => {
      state.leftToRight = false;
    }, 500);
  }

  function start(direction: string) {
    beforeEmit({ index: state.currentIndex, direction });
    switch (direction) {
      case "prev":
        changeLeftTranslate();
        state.currentIndex -= 1;
        if (state.currentIndex <= -1) {
          state.currentIndex = state.CAROUSEL_ITEM_LEN - 1;
        }
        break;
      case "next":
        state.currentIndex += 1;
        if (state.currentIndex >= state.CAROUSEL_ITEM_LEN) {
          state.currentIndex = 0;
        }
        break;
    }
    afterEmit({ index: state.currentIndex, direction });
  };

  function dicatorClick(idx: number) {
    // 如果是从 右 换到 左
    if (idx < state.currentIndex) {
      changeLeftTranslate();
    }
    state.currentIndex = idx;
  };

  function mouseEnterEvent() {
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

  function mouseLeaveEvent() {
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
  function prevHandleClick() {
    start("prev");
  };
  // 向右滑动
  function nextHandleClick() {
    start("next");
  };

  function clearTimer() {
    clearInterval(timer);
    timer = null;
  }

  return {
    prevHandleClick,
    nextHandleClick,
    start,
    dicatorClick,
    mouseEnterEvent,
    mouseLeaveEvent,
    beforeEmit,
    afterEmit,
    isDirection,
    state
  }
}