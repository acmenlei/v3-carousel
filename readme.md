<div align="center">
	<h3>v3-carousel</h3>
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

# introduce
Based on the vue3 composition api written by the wheel diagram plug-in, a variety of attributes adaptation, wheel diagram content 'can be completely customized', basically can meet most of the requirements of the wheel diagram.

Basic functions:
- Whether to enable the automatic rotation graph and customize the rotation graph time
- Pause the rotation after moving the mouse pointer in, and reset the rotation after moving the mouse pointer out
- Click the left/right switch button to switch manually
- Click the bottom wheel cast indicator to switch manually
- Switch button and wheel cast indicator, can set the hover display
- Left toggle left scroll, right toggle right scroll
-...

[online demo](https://acmenlei.github.io/v3-carousel/dist/)

# install

```bash
npm install v3-carousel
```
or
```bash
yarn add v3-carousel
```
# use

`main.js`

```js
import { createApp } from "vue";
import App from "./App.vue";
import Carousel from "v3-carousel"; // import

const app = createApp(App)
app.use(Carousel).mount('#app') // use
```

> Note: Wrap the image you want to display with a 'CarouselItem' (creating a 'CarouselItem' must be done with a 'v-for' loop for now because I need to use 'idx'), Once that's done, you need to wrap the carouselitems in a big Carousel and add the properties you need to the Carousel. Ok, here's an example. You can go to the web page and view the wheel image

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


# props
## Carousel Component（Props）

| property name        | type    | default value | meaning |
| -------------------- | ------- | ------------- | ------- |
| containerWidth       | String  | 100%          | Set the width of the entire carousel container, of course you can also use vw, rem, em and other pixel units |
| containerHeight      | String  | 100%          | Set the height g of the entire carousel container, as above |
| duration             | Number  | 3000          | How often is the rotation interval |
| initIndex            | Number  | 0             | Initializes the display image index |
| autoplay             | Boolean | true          | Whether to automatically start the rotation |
| direction            | Boolean | true          | Need to toggle buttons (i.e. up and down buttons)|
| directionMode        | String  | always        | Toggle the display mode of the button, the options are always and hover |
| directionColor       | String  | white         | Toggle the color of the button |
| directionSize        | Number  | 25            | Size of the toggle button in px |
| indicator            | Boolean | true          | Whether or not a wheelcast indicator is required (currently selected at the bottom) |
| indicatorMode        | String  | always        | Toggle the display mode of the button, the options are always and hover |
| indicatorColor       | String  | #FFFFFF80     | Indicator color when not checked |
| indicatorActiveColor | String  | #FFFFFF       | Indicator color when selected |

## Carousel Events

| event Name     | parmas | meaning |
| -------------- | ------ | ------- |
| @before-moving | The hook function has an object argument that you can retrieve: the direction of the rotation (**direction**) and the index of the current rotation (**index**). | The hook function that is executed before the view is moved. You can use this hook if you want to do some logic before the wheel cast diagram |
| @after-moving  | Same as above... | The hook function that is executed after the view has been moved. You can use this hook if you want to do some logic after the wheel cast graph is finished |

## CarouselItem Component（Props）
| property name | type    | default value | meaning |
| ------------- | ------- | ------------- | ------- |
| idx           | Number  | 0             | The index corresponding to each subinstance is usually the second parameter in 'v-for' |


# contact

>  If you have any problems, please feel free to discuss it. Click 'star' if you find it useful. o(*￣▽￣*)o 
> 
> Any suggestions are welcome to submit 'pr', thank you!

# wechat
- WeChat: x972761675

# contributors
[磊磊](https://github.com/acmenlei)
[淳淳同学](https://github.com/LeeDebug)

# package & repo

- [npm package](https://www.npmjs.com/package/v3-carousel)
- [github repo](https://github.com/Acmenlei/v3-carousel)

