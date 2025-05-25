<template>
  <v-container class="mt-4 movie-series">
    
    <h2 class="text-warning">{{ titlePage }}</h2>
    <v-divider class="my-3" />
    <v-row justify="center" v-if="loading">
      <v-progress-circular indeterminate color="primary" size="40" />
    </v-row>

    <v-row v-else>
     
      <v-col cols="12" md="3" v-for="movie in movies" :key="movie.id" class="mb-4">
        <router-link
          :to="{ name: 'MovieDetail', params: { slug: movie.slug } }"
          class="text-decoration-none"
        >
          <v-card class="movie-card">
            <v-img
              :src="getOptimizedImage(movie.poster_url)"
              alt="Movie Image"
              height="180"
              class="movie-image"
              cover
              lazy-src
            >
              <template #default>
                <div class="overlay">
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
                </div>
              </template>
            </v-img>

            <v-card-text class="text-center movie-title">
              <span class="text-truncate d-block" :title="movie.name">
                {{ movie.name }}
              </span>
              <div class="d-flex justify-center mt-1" style="font-size: 13px; color: #ffc107;">
                {{ movie.year || 'Năm ?' }}
              </div>
            </v-card-text>
          </v-card>
        </router-link>
      </v-col>
      
    </v-row>

    <v-pagination
      v-model="currentPage"
      :length="Math.ceil(totalMovies / moviesPerPage)"
      class="mt-4 d-flex justify-center"
      color="yellow darken-2"
      size="large"
    />
  </v-container>
</template>

<script>
import { urlImage, CategorisDetail } from '@/model/api'

export default {
  name: 'TheLoai',
  props: ['path'],
  data() {
    return {
      loading: true,
      currentPage: 1,
      moviesPerPage: 20,
      totalMovies: 100,
      movies: [],
      urlImage,
      titlePage: '',
    }
  },
  mounted() {
    this.ListMovie(this.path)
  },
  methods: {
    ListMovie(path) {
      CategorisDetail(`${path}?page=${this.currentPage}`, (result) => {
        if (result.status === 'success') {
          this.movies = result.data.items
          this.titlePage = result.data.titlePage
          if (result.data.seoOnPage) {
          this.updateMetaTags(result.data.seoOnPage)
        }
          this.loading = false
        }
        console.log(result)
      }, (err) => {
        console.log(err)
      })
    },
    getOptimizedImage(imagePath) {
      return `${this.urlImage + encodeURIComponent(imagePath)}&w=384&q=100`
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
  }
  },
  watch: {
    currentPage() {
      this.loading = true
      this.ListMovie(this.path)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    path(newPath) {
      this.loading = true
      this.ListMovie(newPath)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  },
}
</script>

<style scoped>
.movie-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-image {
  width: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
}

.badge-top-left {
  font-size: 14px;
  padding: 5px 8px;
}

.movie-title {
  color: white;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 5px;
  font-size: 20px;
}

.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.movie-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
}

.movie-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.3s ease;
}

.movie-card:hover .movie-image {
  filter: brightness(1.1);
}

.overlay {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
}

.badge-top-left {
  font-size: 14px;
  padding: 4px 10px;
  border-radius: 12px;
}

.movie-title {
  color: white;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 8px 12px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  font-size: 18px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
}
.fade-enter-active, .fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
