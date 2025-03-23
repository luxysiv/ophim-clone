<template>
  <div class="movie-series container mt-4">
    <h2 class="text-warning">{{ titlePage}}</h2>
    <!-- <b-breadcrumb :items="breadcrumbItems" class="mb-3" /> -->
    <hr/>
    <b-spinner v-if="loading" label="Loading..."></b-spinner>
    <b-row v-else>
      <b-col md="3" v-for="movie in movies" :key="movie.id" class="mb-4">
        <router-link :to="{ name: 'MovieDetail', params: { slug: movie.slug } }" class="text-decoration-none">
          <b-card no-body class="movie-card">
            <b-card-img :src="urlImage+movie.poster_url" alt="Movie Image" class="movie-image" loading="lazy" />
            <div class="overlay">
              <b-badge v-if="movie.episode_current == 'Tập 0'" variant="warning" class="badge-top-left">Full-{{ movie.lang }}</b-badge>
              <b-badge v-else variant="warning" class="badge-top-left">{{ movie.episode_current }}-{{ movie.lang }}</b-badge>
            </div>
            <b-card-body class="p-2 text-center movie-title">
              <b-card-title class="m-0 text-truncate" :title="movie.name">
                {{ movie.name }}
              </b-card-title>
            </b-card-body>
          </b-card>
        </router-link>
      </b-col>
    </b-row>
    
    <b-pagination v-model="currentPage" :total-rows="totalMovies" :per-page="moviesPerPage" class="justify-content-center mt-3" />
  </div>
</template>

<script>
import {urlImage,ListMovieByCate} from '@/model/api'
export default {
  name: 'PhimBo',
  data(){
    return{
      loading: true,
      currentPage:1,
      moviesPerPage:20,
      totalMovies:100,
      movies:[],
      path: 'phim-bo',
      urlImage:urlImage,
      titlePage: '',
    }
  },
  mounted(){
    this.ListMovie();
  },
  methods:{
    ListMovie(){
      ListMovieByCate(this.path+`?page=${this.currentPage}`,(result) =>{
      if(result.status == 'success'){
        this.movies = result.data.items
        this.titlePage = result.data.titlePage
        this.loading = false
      }
      console.log(result)
    }, (err) =>{
      console.log(err)
    })
    }
  },
  watch:{
    currentPage(newpage){
      this.loading = true
      this.currentPage = newpage
      this.ListMovie();
    }
  }

}
</script>

<style scoped>
.movie-card {
  position: relative;
  background-color: #1c1c1e;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 10px;
  left: 10px;
}

.badge-top-left {
  font-size: 14px;
  padding: 5px 8px;
}

.movie-title {
  background: rgba(0, 0, 0, 0.7); /* Làm mờ nền đen */
  color: white;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 5px;
  font-size: 20px;
}
h4{
  font-size: 20px;
}
</style>