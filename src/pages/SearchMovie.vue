<template>
  <div class="search-page">
    <h2 class="text-center text-light mb-4">{{$t('Kết quả tìm kiếm cho')}} "{{ $route.query.keyword }}"</h2>
    <hr/>
    <b-spinner v-if="loading" label="Loading..."></b-spinner>
    <div v-else>
      <b-card no-body class="overflow-hidden" v-for="movie in movies" :key="movie.id" style="margin: 15px 0;">
        <router-link :to="{ name: 'MovieDetail', params: { slug: movie.slug } }" class="text-decoration-none">
          <b-row no-gutters>
            <b-col md="4">
              <b-card-img 
                :src="getOptimizedImage(movie.poster_url)"
                :alt="movie.name"
                class="movie-image rounded-0"
                loading="lazy"
                style="width: 100%; height: 100%;border-radius: 5px;">
                
                </b-card-img>
            </b-col>
            <b-col md="8">
              <b-card-body :title="movie.name" style="color: white; float:left;">
                <b-card-text>
                  <div>
                    <div class="genre-section mb-2">
                      <div v-for="(genre, index) in movie.category" :key="index" class="text-light genre-item">
                        {{ genre.name }}
                      </div>
                    </div>

                    <div class="meta-info mb-3">
                      <el-rate class="text-dark" v-model="valueRate" disabled />
                      <span class="text-light me-3">{{ movie.year }}</span>
                      <!-- <span class="text-light">{{ movie.episode_current }} tập</span> -->
                    </div>
                    <p class="text-muted description-text">{{ movie.description }}</p>
                  </div>
                  <div class="action-buttons mt-3">
                    <b-button variant="outline-light" class="me-2">
                      <i class="fas fa-play me-2"></i>{{$t('Xem')}}
                    </b-button>
                    <b-button variant="outline-light">
                      <i class="fas fa-share me-2"></i>{{$t('Chia sẻ')}}
                    </b-button>
                  </div>

                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
          
        </router-link>
      </b-card>
      <b-pagination
        v-model="currentPage"
        :total-rows="totalMovies"
        :per-page="moviesPerPage"
        class="justify-content-center mt-3"
        @change="fetchMovies"
      />

    <b-alert v-if="movies.length < 0" variant="warning" show class="text-center text-dark">
      Không tìm thấy phim nào khớp với từ khóa "<strong>{{ $route.query.keyword }}</strong>".
    </b-alert>
    </div>
    <!--<b-row v-else>
      <b-col v-for="movie in movies" :key="movie.id" md="12" class="mb-4">
        <router-link :to="{ name: 'MovieDetail', params: { slug: movie.slug } }" class="text-decoration-none">
          <b-card no-body class="movie-card d-flex flex-row">
            <div class="position-relative">
              <b-card-img
                :src="getOptimizedImage(movie.poster_url)"
                alt="Movie Image"
                class="movie-image"
                loading="lazy"
                @error="setDefaultImage"
              ></b-card-img>
              <div class="rating-badge bg-warning text-dark">
                {{ movie.quality }}
              </div>
            </div>
            
            <b-card-body class="d-flex flex-column justify-content-between">
              <div>
                <h3 class="text-light mb-3">{{ movie.name }}</h3>
                
                <div class="genre-section mb-2">
                  <div v-for="(genre, index) in movie.category" :key="index" class="text-light genre-item">
                    {{ genre.name }}
                  </div>
                </div>

                <div class="meta-info mb-3">
                  <el-rate class="text-light" v-model="valueRate" disabled />
                  <span class="text-light me-3">{{ movie.year }}</span>
                </div>

                <p class="text-muted description-text">{{ movie.description }}</p>
              </div>

              <div class="action-buttons mt-3">
                <b-button variant="outline-light" class="me-2">
                  <i class="fas fa-play me-2"></i>Xem
                </b-button>
                <b-button variant="outline-light">
                  <i class="fas fa-share me-2"></i>Chia sẻ
                </b-button>
              </div>
            </b-card-body>
          </b-card>
        </router-link>
      </b-col>
    </b-row> -->

      <!-- Phân trang -->
      
  </div>
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
            this.movies = result.data.items.sort((a, b) => {
              return parseInt(b.year) - parseInt(a.year); // Sắp xếp giảm dần theo năm
            });
            this.loading = false
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
  background-color: #1a1a1a;
  min-height: 100vh;
  padding: 2rem 0;
}

.movie-card {
  background-color: #2d2d2d;
  border: none;
  border-radius: 8px;
  transition: transform 0.2s;
}

.movie-card:hover {
  transform: translateY(-3px);
}

.movie-image {
  width: 440px;
  height: 250px;
  object-fit: cover;
  border-radius: 8px 0 0 8px;
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
  background-color: #837676;
  border-radius: 5px;
  font-size: 0.9rem;
  opacity: 0.8;
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
