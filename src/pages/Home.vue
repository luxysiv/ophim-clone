<template>
  <default-layout>
    <template #default>
      <div class="bv-example-row" style="width: 100%">
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
                      :src="getOptimizedImage(item.poster_url)"
                      :alt="item.name"
                      class="movie-img"
                      loading="lazy"
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
import { ListMovieByCateHome,urlImage } from "@/model/api";
import CarouselPage from './Carousel.vue'
export default {
  name: "HomePage",
  data() {
    return {
      urlImage: urlImage,
      imageLoading: 'https://trailer.vieon.vn/Teaser_TuCam_mkt.mp4',
      
      isLoading: true,
      page: 1,
      
      imageMove: [],
      listMovie: [],
      //showControls: false,
      showControls: [],
      sections: [
        { title: this.$t('PHIM ĐỀ CỬ'),id: 'danh-sach/moi-nhat',listMovie: [] },
        { title: this.$t('PHIM THỊNH HÀNH'), id: 'danh-sach/thinh-hanh',listMovie: []},
        { title: this.$t('PHIM BỘ'), id: 'danh-sach/phim-bo',listMovie: []},
        { title: this.$t('PHIM LẺ'), id: 'danh-sach/phim-le',listMovie: []},
        { title: this.$t('PHIM HÀN QUỐC'), id:'quoc-gia/han-quoc',listMovie: []},
        { title: this.$t('PHIM TRUNG QUỐC'), id:'quoc-gia/trung-quoc',listMovie: []},
      ]
    };
  },
  components:{
    CarouselPage
  },
  mounted() {
    this.sections.forEach(item => {
      this.ListMovie(item.id, item)

    console.log(this.listMovie)
    })
  },
  methods: {
    ListMovie(sectionId,section){
      ListMovieByCateHome(
      sectionId ,
      (result) => {
        if (result.status === 'success') {
          section.listMovie = result.data.items;
          this.imageMove = result.data.items.poster_url;
          this.isLoading = false;
        }
        console.log(result);
      },
      (err) => {
        console.log(err);
      }
    );
    },
    getOptimizedImage(imagePath) {
      return ${this.urlImage+encodeURIComponent(imagePath)}&w=384&q=100;
    },

    scrollLeft(index) {
      this.$refs[scrollContainer${index}][0].scrollBy({ left: -300, behavior: "smooth" });
    },
    scrollRight(index) {
      this.$refs[scrollContainer${index}][0].scrollBy({ left: 300, behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
.movie-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 15px;
  margin-top: 15px;
}

.movie-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.movie-card {
  position: relative;
  background-color: #1c1c1e;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  width: 100%;
  max-width: 280px;
}

.movie-card:hover {
  transform: scale(1.05);
}

.image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.movie-img {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-in-out;
  object-fit: cover;
}

.image-container:hover .movie-img {
  transform: scale(1.1);
}

.movie-title {
  font-size: 14px; /* Giảm kích thước chữ */
  font-weight: 600;
  color: white;
  text-align: center;
  margin-top: 5px;
  line-height: 1.2;
  
  /* Giới hạn 2 dòng, nếu dài hơn sẽ hiển thị ... */
  display: -webkit-box;
  -webkit-line-clamp: 2;  /* Chỉ hiển thị tối đa 2 dòng */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal; /* Cho phép xuống dòng nhưng vẫn bị giới hạn */
  max-width: 100%;
}

/* Responsive */
@media (max-width: 1024px) {
  .movie-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .movie-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 480px) {
  .movie-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
.category-header {
  display: flex;
  align-items: center;
  gap: 10px; /* Khoảng cách giữa tiêu đề và "Xem tất cả" */
  margin: 20px 0;
}

.category-title {
  font-size: 20px; /* Chuẩn SEO */
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  text-transform: capitalize; /* Giúp hiển thị đẹp hơn */
}

.view-all {
  font-size: 16px; /* Không quá nhỏ, vẫn dễ đọc */
  font-weight: 600;
  color: #ffcc00; /* Màu nổi bật */
  text-decoration: none;
}

.view-all:hover {
  text-decoration: underline;
  color: #ff9900;
}

/* Responsive */
@media (max-width: 768px) {
  .category-title {
    font-size: 18px;
  }
  .view-all {
    font-size: 14px;
  }
}




</style>
