import { inject } from 'vue';
import { CarouselContextState } from './../../../types/index';

export function useCarouselDirection(emit) {
  const carouselCtxState = inject('carouselCtxState') as CarouselContextState;
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
    directionColor,
    directionSize,
    prevHandleClick,
    nextHandleClick
  }
}