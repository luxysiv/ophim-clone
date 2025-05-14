<template>
  <v-container class="search-page" fluid>
    <v-row justify="center" class="mb-6">
      <v-col cols="12">
        <h2 class="text-center ">
          {{ $t('Kết quả tìm kiếm cho') }} "{{ $route.query.keyword }}"
        </h2>
        <v-divider class="my-4" />
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" class="text-center" v-if="loading">
        <v-progress-circular indeterminate color="primary" size="50" />
      </v-col>

      <v-col cols="12" v-else>
        <v-alert v-if="movies.length === 0"  class="text-center">
          Không tìm thấy phim nào với từ khóa "<strong>{{ $route.query.keyword }}</strong>".
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
        <v-card
        
          class="mb-5 overflow-hidden movie-card"
        >
            <v-row>
              <v-col cols="12" md="4">
                <v-img
                  :src="getOptimizedImage(movie.poster_url)"
                  :alt="movie.name"
                  aspect-ratio="16/9"
                  class="movie-image"
                  cover
                />
              </v-col>
              <v-col cols="12" md="8" class="pa-4">
                <h3 >{{ movie.name }}</h3>
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
                  <v-rating v-model="valueRate" readonly size="20" class="me-3" />
                  <span class="me-3">{{ movie.year }}</span>
                </div>

                <p class=" text-body-2 description-text">
                  {{ movie.description }}
                </p>

                <div class="action-buttons mt-4">
                  <v-btn variant="outlined" color="primary" class="me-2">
                    <v-icon start>mdi-play</v-icon>{{ $t('Xem') }}
                  </v-btn>
                  <v-btn variant="outlined" color="primary">
                    <v-icon start>mdi-share</v-icon>{{ $t('Chia sẻ') }}
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
        />
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import {Search,urlImage} from '@/model/api'
export default {
  name: 'SearchMovie',
  data(){
    return{
        movies: [],
        loading: true,
        urlImage: urlImage,
        currentPage:1,
        moviesPerPage:20,
        totalMovies:100,
        valueRate: 5,
        path: ''
    }
  },
  watch: {
    "$route.query.keyword": {
      immediate: true,
      handler(query) {
        document.title = `Kết quả tìm kiếm: ${query}`;
        this.loading = true
        this.path = query
        this.SearchMovie(query);
      },

    },
    currentPage(newpage){
        this.loading = true
        this.currentPage = newpage
        this.SearchMovie(this.path);
      },
  },
  methods:{
    SearchMovie(query){
        Search({keyword: query,page: this.currentPage}, (result) =>{
          if(result.status == 'success'){
            if(result.data.items.length == 0){
              this.movies =[]
              this.loading = false
              
            }
            else{
              this.movies = result.data.items.sort((a, b) => {
                return parseInt(b.year) - parseInt(a.year); // Sắp xếp giảm dần theo năm
              });
              this.loading = false
            }
          }
          
        console.log(result)
      },(err) =>{
        console.log(err)
      })
    },
    getOptimizedImage(imagePath) {
      return `${this.urlImage+encodeURIComponent(imagePath)}&w=384&q=100`;
    },
  },
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
</style>
