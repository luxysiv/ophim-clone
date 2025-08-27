<template>
  <v-container class="search-page" fluid>
    <v-row justify="center" class="mb-6">
      <v-col cols="12">
        <h2 class="text-center">{{ titlePage }}</h2>
        <v-divider class="my-4" />
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" class="text-center" v-if="loading">
        <v-progress-circular indeterminate color="primary" size="50" />
      </v-col>

      <v-col cols="12" v-else>
        <v-alert v-if="movies.length === 0" class="text-center">
          Không tìm thấy phim nào.
          <br />
          <router-link to="/home">
            <v-btn variant="outlined" class="mt-2">Về trang chủ</v-btn>
          </router-link>
        </v-alert>

        <router-link
          v-for="movie in movies"
          :key="movie.id"
          :to="{ name: 'MovieDetail', params: { slug: movie.slug } }"
          class="text-decoration-none"
        >
          <v-card class="mb-5 overflow-hidden movie-card" elevation="4" hover>
            <v-row>
              <v-col cols="12" md="4">
                <v-img
                  :src="getOptimizedImage(movie.poster_url)"
                  :alt="movie.name"
                  aspect-ratio="16/9"
                  class="movie-image"
                  transition="fade-transition"
                  cover
                >
                  <template #default>
                    <v-chip
                      size="small"
                      color="warning"
                      class="badge-top-left"
                      label
                      text-color="black"
                    >
                      {{
                        movie.episode_current === 'Tập 0'
                          ? 'Full-' + movie.lang
                          : movie.episode_current + '-' + movie.lang
                      }}
                    </v-chip>
                  </template>
                </v-img>
              </v-col>
              <v-col cols="12" md="8" class="pa-6">
                <h3 class="text-left title">{{ movie.name }}</h3>
                <div class="genre-section mb-3">
                  <v-chip
                    v-for="(genre, index) in movie.category"
                    :key="index"
                    class="ma-1"
                    label
                  >
                    {{ genre.name }}
                  </v-chip>
                </div>

                <div class="meta-info mb-2 d-flex align-center flex-wrap">
                  <v-chip color="warning" size="small" label>
                    {{ movie.episode_current }} - {{ movie.lang }}
                  </v-chip>
                  <v-icon size="18" class="me-1 text-grey ms-3">mdi-calendar</v-icon>
                  <span class="me-4">{{ movie.year }}</span>
                </div>

                <p class="text-body-2 description-text">
                  Miêu tả: {{ movie.origin_name }}
                </p>

                <div class="action-buttons mt-4">
                  <v-btn
                    variant="flat"
                    color="primary"
                    class="me-2"
                    prepend-icon="mdi-play-circle"
                  >
                    Xem ngay
                  </v-btn>
                  <v-btn
                    color="secondary"
                    variant="outlined"
                    prepend-icon="mdi-share-variant"
                  >
                    Chia sẻ
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </router-link>

        <v-pagination
          v-model="currentPage"
          :length="Math.ceil(totalMovies / moviesPerPage)"
          class="my-4 justify-center"
          color="warning"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { urlImage,urlImage1, CityDetail,CityDetail1 } from '@/model/api'

export default {
  name: 'QuocGia',
  props: ['path'],
  data() {
    return {
      loading: true,
      currentPage: 1,
      moviesPerPage: 20,
      totalMovies: 100,
      movies: [],
      urlImage,
      urlImage1,
      titlePage: '',
      link1: ''
    }
  },
  mounted() {
    this.ListMovie(this.path)
  },
  methods: {
    ListMovie(path) {
      if(path.includes("page=1&limit=20")){
        CityDetail1(`${path}`, (result) => {
        if (result.status === 'success') {
          this.link1 = 'link2'
          this.movies = result.data.items
          this.titlePage = result.data.titlePage
          if (result.data.seoOnPage) {
            this.updateMetaTags(result.data.seoOnPage)
          }
          this.loading = false
        }
      }, (err) => {
        console.log(err)
      })
      }
      else{
        CityDetail(`${path}?page=${this.currentPage}`, (result) => {
            if (result.status === 'success') {
              this.movies = result.data.items
              this.titlePage = result.data.titlePage
              if (result.data.seoOnPage) {
                this.updateMetaTags(result.data.seoOnPage)
              }
              this.loading = false
            }
          }, (err) => {
            console.log(err)
          })
        }
      
    },
    getOptimizedImage(imagePath) {
      if(this.link1 == ""){
        return `${this.urlImage + encodeURIComponent(imagePath)}&w=384&q=100`

      }
      else{
        return `${this.urlImage1 + encodeURIComponent(imagePath)}`
      }
    },
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
      removeOldMeta('description')
      removeOldMeta('og:title', 'property')
      removeOldMeta('og:description', 'property')
      removeOldMeta('og:type', 'property')
      removeOldMeta('og:image', 'property')

      setMeta('description', seo.descriptionHead)
      setMeta('og:title', seo.titleHead, 'property')
      setMeta('og:description', seo.descriptionHead, 'property')
      setMeta('og:type', seo.og_type || 'website', 'property')

      if (Array.isArray(seo.og_image)) {
        seo.og_image.forEach(img => {
          setMeta('og:image', img, 'property')
        })
      }
    }
  },
  watch: {
    currentPage() {
      this.loading = true
      this.ListMovie(this.path)
    },
    path(newPath) {
      this.loading = true
      this.ListMovie(newPath)
    }
  }
}
</script>

<style scoped>
.search-page {
  min-height: 100vh;
  padding: 2rem 0;
  padding: 3rem 1rem;
}

.movie-card {
  border: none;
  border-radius: 8px;
  transition: transform 0.2s;
}

.movie-card:hover {
  transform: translateY(-3px);
}
.movie-image-loaded {
  opacity: 1;
}
.movie-image {
  width: 440px;
  height: 250px;
  object-fit: cover;
  border-radius: 8px 0 0 8px;
  transition: opacity 0.5s ease-in;
  opacity: 1;
}

.rating-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 5px 10px;
  border-radius: 4px;
  font-weight: bold;
}

.genre-section {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.genre-item {
  border-radius: 5px;
  font-size: 0.9rem;
  opacity: 0.8;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
}

.meta-info {
  font-size: 0.95rem;
}

.description-text {
  font-size: 0.9rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.action-buttons {
  border-top: 1px solid #444;
  padding-top: 1rem;
}
.d-flex {
  display: flex !important;
  align-items: flex-start;
}
.b-card-body {
  text-align: left;
}

.genre-section,
.meta-info,
.description-text {
  display: flex;
  justify-content: flex-start;
}

.genre-item {
  display: inline-block;
}

.action-buttons {
  display: flex;
  justify-content: flex-start;
}
.overflow-hidden {
  background-color: #111218;
  color: #fff;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
.overflow-hidden:hover {
  transform: scale(1.01);
  box-shadow: 0 5px 12px rgba(255, 255, 255, 0.05);
}
.search-page {
  min-height: 100vh;
  padding: 3rem 1rem;
  background: linear-gradient(to right, #0f0c29, #302b63, #24243e);
  color: #fff;
}

.movie-card {
  border-radius: 12px;
  transition: transform 0.25s ease, box-shadow 0.3s ease;
  background-color: #1e1f29;
}

.movie-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(255, 255, 255, 0.08);
}

.movie-image {
  border-radius: 12px 0 0 12px;
  transition: opacity 0.5s ease;
}

.genre-section {
  flex-wrap: wrap;
}

.genre-section .v-chip {
  background-color: #2e2f3a;
  color: #fff;
  font-size: 0.85rem;
}

.description-text {
  font-size: 0.95rem;
  line-height: 1.6;
  -webkit-line-clamp: 4;
}

.meta-info .v-icon {
  vertical-align: middle;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
.v-btn {
  font-weight: 600;
  text-transform: none;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.v-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.05);
}
.v-list-item-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.title:hover{
  color: orange;
}
</style>
