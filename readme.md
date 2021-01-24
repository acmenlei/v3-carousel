#### 1. v3-carousel 介绍
基于vue3的轮播图插件，多种属性适配，可以满足基本需求。

#### 2.  Carousel 组件属性

`carousel`:

| property name        | type    | default value | meaning                        |
| -------------------- | ------- | ------------- | ------------------------------ |
| autoplay             | Boolean | true          | 是否自动开始轮播               |
| duration             | Number  | 3000          | 轮播间隔是多久一次             |
| initIndex            | Number  | 0             | 初始化显示的图片               |
| direction            | Boolean | true          | 是否需要上、下一张按钮         |
| directionColor       | String  | white         | 上、下一张按钮的颜色           |
| directionSize        | Number  | 25            | 上、下一张按钮的大小，单位(px) |
| indicator            | Boolean | true          | 是否需要轮播图指示器           |
| indicatorColor       | String  | white         | 未选中时的指示器颜色           |
| indicatorActiveColor | String  | red           | 选中时的指示器颜色             |

#### 3. 如何使用它？
##### 安装方式一：
```shell
npm install v3-carousel
```
##### 安装方式二：
```shell
yarn add v3-carousel
```
##### 实例：
`main.js`

```js
import { createApp } from "vue";
import App from "./App.vue";
import V3Carousel from "v3-carousel"; // 引入

const app = createApp(App)
app.use(V3Carousel).mount('#app') // 使用
...
```
**注意点**： 将你需要显示的图片使用`CarouselItem`包裹起来（创建Carousel-item暂时必须使用v-for循环完成，因为我需要使用到`key`来操作），完成之后你还需要将这些`CarouselItem`用一个大的`Carousel`包裹起来，再给`Carousel`添加你需要的属性，好了，到这里一个实例就完成了，你可以去网页上查看轮播图了

`App.vue`

```vue
<template>
  <div class="app">
    <Carousel
        :autoplay="true"
        :duration="2000"
        :initIndex="2"
        :direction="true"
        :directionSize="20"
        directionColor="skyblue"
        :indicator="true"
        indicatorColor="white"
        indicatorActiveColor="skyblue"
    >
      <CarouselItem v-for="(item, index) in data" :key="index">
        <img :src="item" />
      </CarouselItem>
    </Carousel>
  </div>
</template>
<script>
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    const state = reactive({
      data: [
        "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00693-2745.jpg",
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2190440116,1436403087&fm=26&gp=0.jpg",
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3593656793,3600757928&fm=26&gp=0.jpg",
      ],
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>
```

##### 联系方式：

使用如果出现问题欢迎来讨论，觉得好用的话就点个`star`吧，o(*￣▽￣*)o ！

微信(WeChat)： x972761675

前端qq交流群：700785102

