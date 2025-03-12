<template>
  <b-card :title="movie.title" img-src="movie.poster" img-alt="movie.title" img-top>
    <b-card-text>
      {{ movie.description }}
    </b-card-text>
    <b-button href="#" variant="primary">Xem Phim</b-button>
  </b-card>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movie: Object
  }
}
</script>
