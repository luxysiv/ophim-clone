<template>
  <div class="row" style="width: 100%; height: 450px">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="450"
      style="text-shadow: 1px 1px 2px #333"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
      v-if="videoList.length > 0"
    >
      <!-- Lặp qua videoList và tạo mỗi b-carousel-slide -->
      <b-carousel-slide
        v-for="(item, key) in videoList"
        :key="key"
        :caption="'Slide ' + (key + 1)"
        :text="'Description for slide ' + (key + 1)"
        :img-src="item.url"
      />
    </b-carousel>
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