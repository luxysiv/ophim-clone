<template>
  <b-row>
    <b-col v-for="movie in movies" :key="movie.id" cols="12" md="4">
      <movie-card :movie="movie" />
    </b-col>
  </b-row>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'MovieList',
  components: {
    MovieCard
  },
  data() {
    return {
      movies: [
        { id: 1, title: 'Movie 1', description: 'Description 1', poster: 'url-to-poster' },
        { id: 2, title: 'Movie 2', description: 'Description 2', poster: 'url-to-poster' },
        // Thêm dữ liệu phim của bạn tại đây
      ]
    }
  }
}
</script>
