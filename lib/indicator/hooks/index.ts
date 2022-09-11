import { CarouselContextState } from '../../../types/index';
import { inject, reactive } from "vue";
import { useCarouselIdxWatch } from '../../../utils';

export function useIndicator(emit) {
  const carouselCtxState = inject('carouselCtxState') as CarouselContextState;
  const carouselCtxProps = carouselCtxState.propsStaging;

  const state = reactive({
    len: carouselCtxState.CAROUSEL_ITEM_LEN,
    indicator: carouselCtxProps.indicator,
    indicatorColor: carouselCtxProps.indicatorColor,
    indicatorActiveColor: carouselCtxProps.indicatorActiveColor,
  });

  const { globalIndex } = useCarouselIdxWatch()

  const dicatorClick = (idx: number) => {
    if (idx !== globalIndex.value) {
      // 当点击的不是同一个所以我就
      let direction = "next";
      idx > globalIndex.value ? (direction = "next") : (direction = "prev");
      emit("before-moving", { index: globalIndex.value, direction }); // 滚动前
      emit("DicatorClick", idx); // 开始滚动
      emit("after-moving", { index: idx, direction }); // 滚动后
    }
  };
  return {
    dicatorClick,
    state,
    globalIndex
  }
}