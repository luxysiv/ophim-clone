<template>
  <default-layout>
    <template #default>
      <div style="width: 100%">
        <CarouselPage />

        <!-- Danh mục phim -->
        <div v-for="(section, sectionIndex) in sections" :key="sectionIndex">
          <v-row class="category-header" align="center" no-gutters>
            <v-col cols="auto">
              <h2 class="category-title">{{ section.title }}</h2>
            </v-col>
            <v-col cols="auto">
              <router-link
                :to="section.name === 'QuocGia' || section.name === 'PhimNew'
                  ? { name: section.name, params: { path: section.id.split('/')[1] } }
                  : { name: section.name }"
                class="view-all"
              >
                Xem tất cả >>
              </router-link>
            </v-col>
          </v-row>

          <!-- Hiển thị phim dạng lưới -->
          <v-row class="movie-grid" dense>
            <v-col
              v-for="(item, index) in isLoading ? Array(12).fill({}) : section.listMovie.slice(0, 12)"
              :key="index"
              cols="12"
              sm="6"
              md="4"
              lg="2"
              class="movie-item"
            >
              <v-skeleton-loader
                v-if="isLoading"
                type="image"
                height="200"
              />
              <router-link :to="{ name: 'MovieDetail', params: { slug: item.slug } }" v-else>
                <v-card class="movie-card" flat>
                  <div class="image-container">
                    <v-img
                      :src="getOptimizedImage(item.poster_url)"
                      :alt="item.name"
                      class="movie-img"
                      height="200"
                      cover
                      lazy-src
                    ></v-img>
                    <v-badge
                      :content="item.episode_current === 'Tập 0' ? `Full-${item.lang}` : `${item.episode_current}-${item.lang}`"
                      color="warning"
                      class="badge-top-left"
                      floating
                      offset-x="10"
                      offset-y="10"
                    ></v-badge>
                  </div>
                  <v-card-text class="p-2 text-center">
                    <h3 class="movie-title" aria-label="Tên phim {{ item.name }}">
                      {{ item.name }}
                    </h3>
                  </v-card-text>
                </v-card>
              </router-link>
            </v-col>
          </v-row>
        </div>
      </div>
    </template>
  </default-layout>
</template>




<script>
import { ListMovieByCateHome, urlImage } from "@/model/api";
import CarouselPage from './Carousel.vue';

export default {
  name: "HomePage",
  data() {
    return {
      urlImage: urlImage,
      isLoading: true,
      sections: [
        { title: this.$t('PHIM ĐỀ CỬ'), id: 'danh-sach/moi-nhat', name: 'PhimNew', listMovie: [] },
        { title: this.$t('PHIM THỊNH HÀNH'), id: 'danh-sach/thinh-hanh', name: 'PhimNew', listMovie: [] },
        { title: this.$t('PHIM BỘ'), id: 'danh-sach/phim-bo', name: 'PhimBo', listMovie: [] },
        { title: this.$t('PHIM LẺ'), id: 'danh-sach/phim-le', name: 'PhimLe', listMovie: [] },
        { title: this.$t('PHIM HÀN QUỐC'), id: 'quoc-gia/han-quoc', name: 'QuocGia', listMovie: [] },
        { title: this.$t('PHIM TRUNG QUỐC'), id: 'quoc-gia/trung-quoc', name: 'QuocGia', listMovie: [] }
      ]
    };
  },
  components: {
    CarouselPage
  },
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
        (err) => {
          console.error(err);
        }
      );
    },
    getOptimizedImage(imagePath) {
      return `${this.urlImage + encodeURIComponent(imagePath)}&w=384&q=100`;
    }
  }
};
</script>


<style scoped>
.category-header {
  margin: 20px 0;
  gap: 10px;
}

.category-title {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  text-transform: capitalize;
}

.view-all {
  font-size: 16px;
  font-weight: 600;
  color: #ffcc00;
  text-decoration: none;
}
.view-all:hover {
  text-decoration: underline;
  color: #ff9900;
}

.movie-title {
  font-size: 14px;
  font-weight: 600;
  color: white;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}

.movie-grid{
  background-color: #333;
}


</style>
