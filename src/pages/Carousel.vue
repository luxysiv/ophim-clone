<template>
  <div class="row" style="width: 100%; height: 450px">
    <v-carousel
      progress="primary"
      hide-delimiters
      >
    <v-carousel-item
      v-for="(item,i) in videoList.slice(0,4)"
      :key="i"
      :src="urlImage+item.poster_url"
      cover
    >
    <v-sheet
        height="100%"
      >
        <div class="d-flex fill-height justify-center align-center">
          <div class="text-h2">
            {{ item.name }} Slide
          </div>
        </div>
      </v-sheet>
      
    </v-carousel-item>
  </v-carousel>
  </div>
</template>

<script>
import { urlImage } from "@/model/api";
export default {
  name: "CarouselPage",
  data() {
    return {
      urlImage: urlImage
      videoList: [],
    };
  },
  mounted() {
    fetch('https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=1')
      .then(response => response.json())
      .then(data => {
        this.videoList = data.items;
      });
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
