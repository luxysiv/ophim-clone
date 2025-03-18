<template>
  <div class="search-page container mt-4">
    <!-- Tiêu đề trang tìm kiếm -->
    <h2 class="text-left">Kết quả tìm kiếm cho: "{{ $route.query.keyword }}"</h2>
    <hr>
    <!-- Kiểm tra nếu có kết quả -->
    <b-row v-if="movies.length > 0">
      <b-col v-for="movie in movies" :key="movie.id" md="12" class="mb-4">
        <router-link :to="{name: 'MovieDetail', params:{slug: movie.slug}}" class="text-decoration-none">
          <b-card no-body class="movie-card d-flex flex-row align-items-center">
            <b-card-img
              :src="`${urlImage}${movie.poster_url}`"
              alt="Movie Image"
              class="movie-image"
            ></b-card-img>
            <b-card-body>
              <b-card-title class="text-dark">{{ movie.name }}</b-card-title>
              <b-card-text class="text-muted">{{ movie.type }}</b-card-text>
            </b-card-body>
          </b-card>
        </router-link>
      </b-col>
      <b-pagination v-model="currentPage" :total-rows="totalMovies" :per-page="moviesPerPage" class="justify-content-center mt-3" />
    </b-row>

    <!-- Hiển thị thông báo nếu không có kết quả -->
    <b-alert v-else variant="warning" show class="text-center">
      Không tìm thấy phim nào khớp với từ khóa "{{ $route.query.keyword }}".
    </b-alert>
  </div>
</template>

<script>
import {Search,urlImage} from '@/model/api'
export default {
  name: 'SearchMovie',
  data(){
    return{
        movies: [],
        urlImage: urlImage,
        currentPage:1,
      moviesPerPage:20,
      totalMovies:100,
    }
  },
  watch: {
    "$route.query.keyword": {
      immediate: true,
      handler(query) {
        this.SearchMovie(query);
      },
    },
  },
  methods:{
    SearchMovie(query){
        Search({keyword: query}, (result) =>{
          if(result.status == 'success'){
            this.movies = result.data.items
          }
        console.log(result)
      },(err) =>{
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.movie-card {
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  text-align: left;
  /* background-color: #f8f9fa; */
  border-radius: 8px;
  padding: 10px;
  transition: transform 0.2s;
}

.movie-card:hover {
  transform: scale(1.02);
}

.movie-image {
  width: 150px;
  height: 180px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 15px;
}
</style>