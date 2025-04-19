<template>
  <v-container fluid class="pa-0">
    <v-carousel
      height="450"
      hide-delimiters
      progress="primary"
      cycle
      interval="6000"
    >
      <v-carousel-item
        v-for="(item, i) in videoList"
        :key="i"
        :src="urlImage + item.poster_url"
        cover
      >
        <!-- Overlay thông tin -->
        <v-sheet
          color="rgba(0, 0, 0, 0.5)"
          height="100%"
          class="d-flex flex-column justify-end px-6 pb-6"
        >
          <div class="text-white">
            <h2 class="text-h4 font-weight-bold mb-2">{{ item.name }}</h2>
            <p class="mb-1"><strong>Năm:</strong> {{ item.year }}</p>
            <p class="mb-1"><strong>Thể loại:</strong> {{ item.category.map(cat => cat.name).join(', ') }}</p>

            <div class="d-flex align-center mb-3">
              <strong class="mr-2">Đánh giá:</strong>
              <v-rating
                :model-value="4"
                readonly
                density="compact"
                size="20"
                active-color="amber"
              />
            </div>

            <v-btn
              color="red-accent-3"
              variant="flat"
              @click="goToDetail(item.slug)"
            >
              Xem ngay
            </v-btn>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
import { urlImage, ListMovieByCate } from "@/model/api";

export default {
  name: "CarouselPage",
  data() {
    return {
      urlImage: urlImage,
      videoList: [],
      path: "phim-moi-cap-nhat",
    };
  },
  created() {
    this.ListMovie();
  },
  methods: {
    ListMovie() {
       ListMovieByCate(`${this.path}?page=1`, (result) => {
          console.log(result)
        if (result.status === 'success') {
          this.videoList = result.items
        }
      }, (err) => {
        console.log(err)
      })
    },
    goToDetail(slug) {
      this.$router.push({ name: 'movie-detail', params: { slug } });
    },
  },
};
</script>

<style scoped>
.text-h4 {
  font-weight: bold;
}
</style>
