export interface CarouselContextState {
  CAROUSEL_ITEM_LEN: number,
  propsStaging: any, // 暂存 props 对象，供子组件使用
  currentIndex: number, // 当前展示的索引
  showDirection: boolean, // 是否展示 切换按钮
  showIndicator: boolean, // 是否展示 底部选中圆圈
  leftToRight: boolean, // 从左向右滑动方式
}