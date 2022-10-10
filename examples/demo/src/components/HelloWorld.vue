<script setup lang="ts">
import { reactive } from 'vue';

const data = reactive([
  {
    src: "https://img2.baidu.com/it/u=4029214852,4040556744&fm=253&fmt=auto&app=138&f=JPEGw?=889&h=500"
  },
  {
    src: "https://img2.baidu.com/it/u=2248863795,4033026016&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1665507600&t=347d057d7fef0080ebffac383c7065d9"
  }
])
</script>

<template>
  <div class="container" style="width: 500px; height: 300px; margin: 100px auto;">
    <Carousel 
      >
      <CarouselItem v-for="(item, index) in data" :key="index" :idx="index">
        <img :src="item.src" alt="">
      </CarouselItem>
    </Carousel>
  </div>
</template>
