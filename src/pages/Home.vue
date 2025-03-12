<template>
    <default-layout>
      <template #default>
        <div class="container mt-4">
          <h2>Danh sách Phim</h2>
          <movie-list />
        </div>
      </template>
    </default-layout>
  </template>
  
  <script>
  import DefaultLayout from '@/components/Layout.vue'
  import MovieList from '@/components/MovieList.vue'
  
  export default {
    name: 'HomePage',
    components: {
      DefaultLayout,
      MovieList
    }
  }
  </script>
  