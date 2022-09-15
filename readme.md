<div align="center">
	<h2>V3-Carousel</h2>
	<p align="center">
	    <a href="https://vuejs.org/" target="_blank">
	        <img src="https://img.shields.io/badge/vue.js-vue3.x-green" alt="vue">
	    </a>
		<a href="https://www.tslang.cn/" target="_blank">
	        <img src="https://img.shields.io/badge/typescript-%3E4.0.0-blue" alt="typescript">
	    </a>
	</p>
	<p>&nbsp;</p>
</div>

# 介绍

基于 vue3 composition api 编写的轮播插件，多种属性适配，轮播内容 `可完全自定义`，基本可以满足大部分的轮播需求。

基本功能介绍：
- 是否开启自动轮播，自定义轮播时间
- 鼠标移入后暂停轮播，鼠标移出后重置轮播
- 点击 左侧/右侧 切换按钮，手动切换
- 点击 底部轮播指示器，手动切换
- 切换按钮 与 轮播指示器，可设置 hover 展示
- 左侧切换向左滚动，右侧切换向右滚动
- ...

在线Demo：正在制作...


# 安装

```bash
npm install v3-carousel
```
or
```bash
yarn add v3-carousel
```
# 使用

`main.js`

```js
import { createApp } from "vue";
import App from "./App.vue";
import Carousel from "v3-carousel"; // 引入

const app = createApp(App)
app.use(Carousel).mount('#app') // 使用
```

> 注意点：将你需要显示的图片使用`CarouselItem`包裹起来（创建`CarouselItem`暂时必须使用`v-for`循环完成，因为我需要使用到`idx`来操作），完成之后你还需要将这些`CarouselItem`用一个大的`Carousel`包裹起来，再给`Carousel`添加你需要的属性，好了，到这里一个实例就完成了，你可以去网页上查看轮播图了

`App.vue`

```html
<script setup lang="ts">
import { reactive } from 'vue';

const state = reactive({
  data: [
    "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00693-2745.jpg",
    "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2190440116,1436403087&fm=26&gp=0.jpg",
    "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3593656793,3600757928&fm=26&gp=0.jpg",
  ],
});
function beforeMoving(dir: { index: number, direction: string }) {
  // console.log("before", dir);
}
function afterMoving(dir: { index: number, direction: string }) {
  // console.log("after", dir);
}
</script>

<template>
  <div style="width: 400px; height: 300px">
    <Carousel
        :autoplay="true" 
        :duration="2000" 
        :initIndex="2" 
        :direction="true" 
        directionMode="hover" 
        :directionSize="20"
        directionColor="skyblue" 
        :indicator="true" 
        indicatorMode="always" 
        indicatorColor="white"
        indicatorActiveColor="skyblue" 
        @before-moving="beforeMoving" 
        @after-moving="afterMoving">
    <CarouselItem v-for="(item, index) in state.data" :key="index" :idx="index">
      <img :src="item" />
    </CarouselItem>
  </Carousel>
  </div>
</template>
```


# 参数
## Carousel 组件选项（Props）

| property name        | type    | default value | meaning |
| -------------------- | ------- | ------------- | ------- |
| containerWidth       | String  | 100%          | 设置整个carousel容器的宽度,当然你也可以使用vw，rem，em等像素单位 |
| containerHeight      | String  | 100%          | 设置整个carousel容器的g高度,同上 |
| duration             | Number  | 3000          | 轮播间隔是多久一次 |
| initIndex            | Number  | 0             | 初始化显示的图片索引 |
| autoplay             | Boolean | true          | 是否自动开始轮播 |
| direction            | Boolean | true          | 是否需要切换按钮（即 上、下一张按钮） |
| directionMode        | String  | always        | 切换按钮的展示方式，可选 always、hover |
| directionColor       | String  | white         | 切换按钮的颜色 |
| directionSize        | Number  | 25            | 切换按钮的大小，单位(px) |
| indicator            | Boolean | true          | 是否需要轮播图指示器（底部当前选中标识） |
| indicatorMode        | String  | always        | 切换按钮的展示方式，可选 always、hover |
| indicatorColor       | String  | #FFFFFF80     | 未选中时的指示器颜色 |
| indicatorActiveColor | String  | #FFFFFF       | 选中时的指示器颜色 |



## Carousel 事件（Event）

| event Name     | parmas | meaning |
| -------------- | ------ | ------- |
| @before-moving | 该钩子函数拥有一个对象参数，你可以获取到它们：轮播的方向(**direction**)以及当前轮播的索引(**index**) | 视图移动前会执行的钩子函数，如果您想在轮播图轮播前做一些逻辑可以使用该钩子 |
| @after-moving  | 同上... | 视图移动完成后会执行的钩子函数，如果您想在轮播图轮播完成之后做一些逻辑可以使用该钩子 |

## CarouselItem 组件选项（Props）
| property name | type    | default value | meaning |
| ------------- | ------- | ------------- | ------- |
| idx           | Number  | 0             | 每个子实例对应的索引，一般用 `v-for` 中的第二个参数即可 |



# 联系方式

>  使用如果出现问题欢迎来讨论，觉得好用的话就点个 `star` 吧，o(*￣▽￣*)o 
> 
> 有什么建议欢迎大佬们提交 `pr`，谢谢！

### repo归属者
- WeChat: x972761675
- 前端qq交流群: 700785102

### 目前维护者: 淳淳同学
- [个人博客](https://leedebug.github.io/)
- [Github](https://github.com/LeeDebug)
- [掘金](https://juejin.cn/user/2189882894323975/posts)
- [语雀](https://www.yuque.com/LeeDebug)
- [简书](https://www.jianshu.com/u/fc47eb26e53c)
- [开源中国](https://my.oschina.net/LeeDebug)
- [博客园](https://www.cnblogs.com/LeeDebug/)
- 微信二维码:
<table>
  <tr>
    <td>
      <img src="https://cdn.jsdelivr.net/gh/LeeDebug/PicGo/img/20210527113237.png" width="200px" title="微信" alt="WeChat:lcc961150665">
    </td>
  </tr>
</table>



# 相关链接

- [npm package](https://www.npmjs.com/package/v3-carousel)
- [github repo](https://github.com/Acmenlei/v3-carousel)

