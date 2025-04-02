<template>
  <default-layout>
    <template #default>
      <div class="bv-example-row fade-in" style="width: 100%">
        <div>
          <CarouselPage/>
        </div>
        
        <!-- Danh mục phim -->
        <div v-for="(section, sectionIndex) in sections" :key="sectionIndex">
          <b-row align-h="start" class="category-header">
            <b-col cols="auto">
              <h2 class="category-title">{{ section.title }}</h2>
            </b-col>
            <b-col cols="auto">
              <router-link :to="{ name: '', params: { id: section.id } }" class="view-all">
                Xem tất cả >>
              </router-link>
            </b-col>
          </b-row>

          <!-- Hiển thị phim dạng lưới -->
          <div class="movie-grid">
            <b-col
              v-for="(item, index) in isLoading ? Array(12).fill({}) : section.listMovie.slice(0, 12)"
              :key="index"
              class="movie-item"
            >
              <b-skeleton
                v-if="isLoading"
                height="200px"
                width="100%"
              ></b-skeleton>
              <router-link :to="{ name: 'MovieDetail', params: { slug: item.slug } }" v-else>
                <b-card class="movie-card" no-body>
                  <div class="image-container">
                    <b-card-img
                      v-lazy="getOptimizedImage(item.poster_url)"
                      :alt="item.name"
                      class="movie-img"
                    />
                  </div>
                  <div class="overlay">
                    <b-badge v-if="item.episode_current == 'Tập 0'" variant="warning" class="badge-top-left">
                      Full-{{ item.lang }}
                    </b-badge>
                    <b-badge v-else variant="warning" class="badge-top-left">
                      {{ item.episode_current }}-{{ item.lang }}
                    </b-badge>
                  </div>
                  <!-- Tiêu đề phim tối ưu SEO -->
                  <b-card-body class="p-2 text-center">
                    <h3 class="movie-title" aria-label="Tên phim {{ item.name }}">
                      {{ item.name }}
                    </h3>
                  </b-card-body>
                </b-card>
              </router-link>
            </b-col>
          </div>
        </div>
      </div>
    </template>
  </default-layout>
</template>

<script>
import { ListMovieByCateHome, urlImage } from "@/model/api";
import CarouselPage from './Carousel.vue'
export default {
  name: "HomePage",
  metaInfo() {
    return {
      title: "Trang chủ - Phim hay nhất",
      meta: [{ name: "description", content: "Xem phim mới nhất, hot nhất với chất lượng cao." }]
    };
  },
  data() {
    return {
      urlImage: urlImage,
      isLoading: true,
      sections: [
        { title: this.$t('PHIM ĐỀ CỬ'), id: 'danh-sach/moi-nhat', listMovie: [] },
        { title: this.$t('PHIM THỊNH HÀNH'), id: 'danh-sach/thinh-hanh', listMovie: []},
        { title: this.$t('PHIM BỘ'), id: 'danh-sach/phim-bo', listMovie: []},
        { title: this.$t('PHIM LẺ'), id: 'danh-sach/phim-le', listMovie: []},
        { title: this.$t('PHIM HÀN QUỐC'), id: 'quoc-gia/han-quoc', listMovie: []},
        { title: this.$t('PHIM TRUNG QUỐC'), id: 'quoc-gia/trung-quoc', listMovie: []},
      ]
    };
  },
  components: { CarouselPage },
  mounted() {
    this.sections.forEach(item => {
      this.ListMovie(item.id, item);
    });
  },
  methods: {
    ListMovie(sectionId, section) {
      ListMovieByCateHome(
        sectionId,
        (result) => {
          if (result.status === 'success') {
            section.listMovie = result.data.items;
            this.isLoading = false;
          }
        },
        (err) => console.log(err)
      );
    },
    getOptimizedImage(imagePath) {
      return `${this.urlImage + encodeURIComponent(imagePath)}&w=384&q=100`;
    }
  }
};
</script>

<style scoped>
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.8s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.movie-img {
  transition: transform 0.3s ease-in-out;
  object-fit: cover;
}

.image-container:hover .movie-img {
  transform: scale(1.1);
}
</style>
