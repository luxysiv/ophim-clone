<template>
  <div class="row" style="width: 100%; height: 450px">
    <v-carousel
    height="450"
    show-arrows="hover"
    cycle
    hide-delimiter-background
  >
    <v-carousel-item
      v-for="(item,i) in videoList"
      :key="i"
      :src="item.url"
      cover
    ></v-carousel-item>
  </v-carousel>
  </div>
</template>

<script>
export default {
  name: "CarouselPage",
  data() {
    return {
      slide: 0,
      videoList: [
        { url: "https://picsum.photos/1024/480/?image=52" },
        { url: "https://picsum.photos/1024/480/?image=54" },
        { url: "https://picsum.photos/1024/480/?image=58" },
      ],
    };
  },
  methods: {
    onSlideStart() {
      console.log("Slide starting...");
    },
    onSlideEnd() {
      console.log("Slide ended...");
    },
  },
};
</script>

<style scoped>
.carousel-inner {
  position: relative;
  overflow: hidden;
}

.carousel-item {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease;
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>