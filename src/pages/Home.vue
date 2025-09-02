<template>
  <div style="width: 100%">
    <CarouselPage />

    <div v-for="(section, sectionIndex) in sections" :key="sectionIndex">
      <v-row class="category-header" align="center" no-gutters>
        <v-col cols="auto">
          <h2 class="category-title">
            <v-icon size="20" color="#ffcc00" class="mr-1">mdi-filmstrip</v-icon>
            {{ section.title }}
          </h2>
        </v-col>
        <v-col cols="auto">
          <router-link
            :to="
              section.name === 'QuocGia' || section.name === 'PhimNew'
                ? {
                    name: section.name,
                    params: { path: section.id.split('/')[1] },
                  }
                : { name: section.name }
            "
            class="view-all"
          >
            {{$t('Xem tất cả')}} >>
          </router-link>
        </v-col>
      </v-row>

      <v-row no-gutters tag="transition-group" name="fade-scale" class="movie-list">
        <v-col
          v-for="(item, index) in isLoading
            ? Array(12).fill({})
            : section.listMovie.slice(0, 12)"
          :key="item.slug || index"
          cols="4"
          xs="4"
          sm="4"
          md="3"
          lg="2"
          xl="2"
          style="padding: 10px"
        >
          <v-skeleton-loader v-if="isLoading" type="image" height="250" />
          <router-link
            :to="{ name: 'MovieDetail', params: { slug: item.slug } }"
            v-else
          >
            <v-card class="mx-auto bg-dark text-white" max-width="344">
              <v-img
                :src="getOptimizedImage(item.poster_url, section.id)"
                :lazy-src="getOptimizedImage(item.poster_url, section.id)"
                :alt="`Poster phim ${item.name}`"
                class="movie-img"
                height="250"
                cover
              >
                <template #default>
                  <v-btn
                    icon
                    size="small"
                    color="red"
                    variant="flat"
                    class="favorite-btn"
                    @click.stop="toggleFavorite(item)"
                  >
                    <v-icon>{{
                      isFavorite(item) ? "mdi-heart" : "mdi-heart-outline"
                    }}</v-icon>
                  </v-btn>
                </template>
              </v-img>

              <v-card-subtitle class="episode-lang">
                {{
                  item.episode_current === "Tập 0"
                    ? `Full - ${item.lang}`
                    : `${item.episode_current} - ${item.lang}`
                }}
              </v-card-subtitle>

              <v-card-title class="movie-title">{{ item.name }}</v-card-title>

              <v-card-text class="movie-info">
                <div class="text-grey text-truncate">
                  <v-icon size="14" class="mr-1" color="grey">mdi-tag</v-icon>
                  {{ item.origin_name }} ({{ item.year }})
                </div>
                
              </v-card-text>
            </v-card>
          </router-link>
        </v-col>
      </v-row>
    </div>
  </div>
</template>


<script>
import { ListMovieByCateHome,ListMovieByCateHome1, urlImage,urlImage1 } from "@/model/api";
import CarouselPage from "./Carousel.vue";

export default {
  name: "HomePage",
  data() {
    return {
      urlImage: urlImage,
      urlImage1: urlImage1,
      isLoading: true,
      favoriteMovies: [],
      sections: [
        
        {
          title: this.$t('PHIM THỊNH HÀNH'),
          id: "danh-sach/thinh-hanh",
          name: "PhimNew",
          listMovie: [],
          content: ''
        },
        {
          title: this.$t("PHIM ĐỀ CỬ"),
          id: "danh-sach/phim-moi-cap-nhat?page=2",
          name: "PhimNew",
          listMovie: [],
          content: ''

        },
        {
          title: this.$t("PHIM VIỆT NAM"),
          id: "quoc-gia/viet-nam?page=1&limit=20",
          name: "QuocGia",
          listMovie: [],
          content: ''

        },
        {
          title: this.$t("PHIM BỘ"),
          id: "danh-sach/phim-bo",
          name: "PhimBo",
          listMovie: [],
          content: ''

        },
        {
          title: this.$t("PHIM LẺ"),
          id: "danh-sach/phim-le",
          name: "PhimLe",
          listMovie: [],
          content: ''

        },
        {
          title: this.$t("PHIM HÀN QUỐC"),
          id: "quoc-gia/han-quoc",
          name: "QuocGia",
          listMovie: [],
          content: ''

        },
        {
          title: this.$t("PHIM TRUNG QUỐC"),
          id: "quoc-gia/trung-quoc",
          name: "QuocGia",
          listMovie: [],
          content: ''

        },
      ],
      link: ''
    };
  },
  components: {
    CarouselPage,
  },
  async mounted() {
    await Promise.all(
      this.sections.map(item => this.ListMovie(item.id, item))
  );
    // this.sections.forEach((item) => {
    //   await this.ListMovie(item.id, item);
    // });
  },
  methods: {
    ListMovie(sectionId, section) {
      if(section.id == "quoc-gia/viet-nam?page=1&limit=20"){
        return new Promise((resolve, reject) =>{
          ListMovieByCateHome1(
          sectionId,
          (result) => {
            if (result.status === "success") {
              section.listMovie = result.data.items;
                this.link = 'link2';
              if (result.data.seoOnPage) {
                  this.updateMetaTags(result.data.seoOnPage)
                }
              this.isLoading = false;
              resolve(true)
            }
            else{
              resolve(false)
            }
          },
          (err) => {
            console.error(err);
            reject(err)
          }
        );
        })
        
      }
      else{
        return new Promise((resolve, reject) =>{
          ListMovieByCateHome(
            sectionId,
            (result) => {
              if (result.status === "success") {
                this.link = '';
                section.listMovie = result.data.items;
                
                if (result.data.seoOnPage) {
                    this.updateMetaTags(result.data.seoOnPage)
                  }
                this.isLoading = false;
                resolve(true);
              }
              else{
                resolve(false)
              }
            },
            (err) => {
              console.error(err);
              reject(err)
            }
          );
      
        })
        
      }
      

    },
    getOptimizedImage(imagePath,sectionID) {
      if(sectionID != "quoc-gia/viet-nam?page=1&limit=20"){
        return `${this.urlImage + encodeURIComponent(imagePath)}&w=384&q=100`;

      }
      else{
        return `${this.urlImage1 + "https://phimimg.com/"+ encodeURIComponent(imagePath)}`;

      }
    },
    // Chuan SEO
    updateMetaTags(seo) {
    document.title = seo.titleHead || 'Phim hay'

    const removeOldMeta = (key, attr = 'name') => {
      const old = document.querySelectorAll(`meta[${attr}="${key}"]`)
      old.forEach(tag => tag.remove())
    }

    const setMeta = (key, content, attr = 'name') => {
      if (!content) return
      const meta = document.createElement('meta')
      meta.setAttribute(attr, key)
      meta.setAttribute('content', content)
      document.head.appendChild(meta)
    }

    // Xóa cũ
    removeOldMeta('description')
    removeOldMeta('og:title', 'property')
    removeOldMeta('og:description', 'property')
    removeOldMeta('og:type', 'property')
    removeOldMeta('og:image', 'property')

    // Thêm mới
    setMeta('description', seo.descriptionHead)
    setMeta('og:title', seo.titleHead, 'property')
    setMeta('og:description', seo.descriptionHead, 'property')
    setMeta('og:type', seo.og_type || 'website', 'property')

    if (Array.isArray(seo.og_image)) {
      seo.og_image.forEach(img => {
        setMeta('og:image', img, 'property')
      })
    }
  },
    onImageLoad(index) {
      this.$nextTick(() => {
        const imgRef = this.$refs["img_" + index];
        if (imgRef && imgRef.$el) {
          imgRef.$el.classList.add("loaded");
        }
      });
    },
    isFavorite(movie) {
    return this.favoriteMovies.some(fav => fav.slug === movie.slug);
  },

  // Thêm/bỏ yêu thích
  toggleFavorite(movie) {
    const index = this.favoriteMovies.findIndex(fav => fav.slug === movie.slug);
    if (index !== -1) {
      this.favoriteMovies.splice(index, 1); // Bỏ yêu thích
    } else {
      this.favoriteMovies.push(movie); // Thêm yêu thích
    }
  },
  },
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
a {
  text-decoration: none;
  list-style: none;
}
.v-card:hover {
  transform: scale(1.03);
  transition: transform 0.3s ease;
  box-shadow: 0 4px 20px rgba(255, 204, 0, 0.2);
}
.favorite-btn {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
}
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.4s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.v-img img {
  transition: opacity 0.5s ease-in-out;
  
}
.v-img img[lazy='loaded'] {
  opacity: 1 !important;
}
.v-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.v-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(255, 204, 0, 0.35);
}
.movie-info {
  font-size: 13px;
  color: #ccc;
}

.episode-lang {
  color: #ffcc00;
  font-size: 13px;
  font-weight: 600;
}

.movie-title {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* hiện 2 dòng */
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 40px;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.2;
  color: white;
  margin-top: -8px;
  text-overflow: ellipsis;
  white-space: normal;
}
@media (max-width: 400px) {
  .v-img {
    height: 180px !important;
  }

  .movie-title {
    font-size: 12px;
  }

  .movie-info {
    font-size: 11px;
  }

  .episode-lang {
    font-size: 11px;
  }
}
.v-img {
  height: 250px;
}

@media (max-width: 600px) {
  .v-img {
    height: 180px;
  }
}
</style>
