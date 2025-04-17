<template>
  
      <div style="width: 100%">
        <CarouselPage />

        <!-- Danh mục phim -->
        <div v-for="(section, sectionIndex) in sections" :key="sectionIndex" >
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
          
            <v-row no-gutters >
              <v-col
                v-for="(item, index) in isLoading ? Array(12).fill({}) : section.listMovie.slice(0, 12)"
                :key="index"
                cols="12"
                sm="6"
                md="4"
                lg="2"
                style="padding: 10px;"
              >
              <v-skeleton-loader
                v-if="isLoading"
                type="image"
                height="250"
              />
              <router-link :to="{ name: 'MovieDetail', params: { slug: item.slug } }" v-else>
                <v-card
                  class="mx-auto bg-dark text-white"
                  max-width="344"
                >
                <v-img
                :src="getOptimizedImage(item.poster_url)"
                :alt="`Poster phim ${item.name}`"
                class="movie-img"
                height="250"
                cover
                lazy-src
                />
                <v-card-subtitle style="color: #ffcc00;">
                  {{item.episode_current === 'Tập 0' ? `Full-${item.lang}` : `${item.episode_current}-${item.lang}`}}
                </v-card-subtitle>
                <v-card-title class="movie-title">
                  {{ item.name }}
                </v-card-title>


              </v-card>
              </router-link>
                
              </v-col>
            </v-row>
         
        </div>
      </div>
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
    },
    onImageLoad(index) {
      this.$nextTick(() => {
        const imgRef = this.$refs['img_' + index];
        if (imgRef && imgRef.$el) {
          imgRef.$el.classList.add('loaded');
        }
      });
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
  white-space: nowrap;             
  overflow: hidden;                
  text-overflow: ellipsis;       
}
a{
  text-decoration: none;
  list-style: none;
}
.v-card:hover {
  transform: scale(1.03);
  transition: transform 0.3s ease;
  box-shadow: 0 4px 20px rgba(255, 204, 0, 0.2);
}

</style>
