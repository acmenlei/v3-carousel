import Carousel from "./lib/carousel/carousel.vue";
import CarouselItem from "./lib/carousel-item/carItem.vue";

const CarouselInit = {
    install: function (Vue: any) {
        Vue.component("Carousel", Carousel)
        Vue.component("CarouselItem", CarouselItem)
    }
}

export default CarouselInit
export * from "./types"