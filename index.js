import Carousel from "./lib/carousel.vue";
import CarouselItem from "./lib/carItem.vue";


const CarouselInit = {
    install: function (Vue) {
        Vue.component(Carousel.name, Carousel)
        Vue.component(CarouselItem.name, CarouselItem)
    }
}

export default CarouselInit