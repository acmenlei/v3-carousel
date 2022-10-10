import { CarouselContextState } from './../types/index';
import { inject, ref } from 'vue';
import { watch } from 'vue';

export function useCarouselIdxWatch() {
  const carouselCtxState = inject('carouselCtxState') as CarouselContextState;
  const globalIndex = ref(0);
  watch(
    () => carouselCtxState.currentIndex,
    (v: number) => {
      globalIndex.value = v;
    }
  );

  return {
    globalIndex
  };
}