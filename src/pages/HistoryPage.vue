<template>
  <v-container>
    <v-row class="mt-4 mb-4">
      <v-col cols="12">
        <h2 class="text-h4 font-weight-bold">
          <v-icon large color="primary" class="mr-2">mdi-history</v-icon>
          Lịch sử đã xem
        </h2>
        <v-divider class="my-4"></v-divider>
      </v-col>
    </v-row>

    <v-row v-if="historyMovies.length === 0">
      <v-col cols="12" class="text-center">
        <v-alert
          type="info"
          prominent
          icon="mdi-information-outline"
          color="grey-darken-3"
          text
        >
          Bạn chưa có phim nào trong lịch sử xem. Hãy xem phim ngay để lưu lại!
        </v-alert>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col
        v-for="movie in historyMovies"
        :key="movie.slug"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="mb-4"
      >
        <v-card class="history-card" :to="`/movie/${movie.slug}?tap=${movie.episode?.slug}`" rounded="lg">
          <v-img
            :src="getOptimizedImage(movie.poster_url)"
            class="history-poster"
            height="300"
            cover
          ></v-img>

          <v-card-title class="movie-title text-wrap">{{ movie.name }}</v-card-title>
          <v-card-subtitle class="movie-info text-wrap">
            <span v-if="movie.episode?.name">
              Tập: {{ movie.episode.name }}
            </span>
            <span v-else>
              {{ movie.year }}
            </span>
          </v-card-subtitle>
          
          <v-card-actions class="d-flex justify-space-between align-center">
            <v-btn
              color="orange"
              variant="flat"
              small
              :to="`/movie/${movie.slug}?tap=${movie.episode?.slug}`"
            >
              <v-icon start>mdi-play-circle-outline</v-icon>
              Tiếp tục
            </v-btn>

            <v-btn
              icon
              variant="text"
              color="red"
              @click.stop.prevent="confirmDelete(movie.slug)"
              title="Xóa khỏi lịch sử"
            >
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    
    <v-dialog v-model="dialogDelete" max-width="400">
      <v-card class="bg-grey-darken-4 text-white">
        <v-card-title class="text-h6">Xóa khỏi lịch sử</v-card-title>
        <v-card-text>Bạn có chắc chắn muốn xóa phim này khỏi lịch sử xem?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="dialogDelete = false">Hủy</v-btn>
          <v-btn color="red-darken-2" variant="text" @click="deleteHistoryItem">Xóa</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { urlImage } from '@/model/api';

export default {
  name: 'HistoryPage',
  data() {
    return {
      historyMovies: [],
      dialogDelete: false,
      movieToDeleteSlug: null,
      urlImage: urlImage,
    };
  },
  mounted() {
    this.loadHistory();
  },
  methods: {
    loadHistory() {
      const history = JSON.parse(localStorage.getItem('watchHistory') || '[]');
      // Giới hạn lịch sử tối đa 20 phim và sắp xếp theo thời gian mới nhất
      this.historyMovies = history.slice(0, 20).sort((a, b) => b.timestamp - a.timestamp);
    },
    confirmDelete(slug) {
      this.movieToDeleteSlug = slug;
      this.dialogDelete = true;
    },
    deleteHistoryItem() {
      let history = JSON.parse(localStorage.getItem('watchHistory') || '[]');
      const updatedHistory = history.filter(item => item.slug !== this.movieToDeleteSlug);
      localStorage.setItem('watchHistory', JSON.stringify(updatedHistory));
      this.loadHistory(); // Cập nhật lại danh sách
      this.dialogDelete = false;
    },
    getOptimizedImage(imagePath) {
      if (imagePath && imagePath.startsWith('https://')) {
          return imagePath;
      }
      return imagePath ? `${this.urlImage}${encodeURIComponent(imagePath)}&w=384&q=100` : '/placeholder.jpg';
    },
  },
};
</script>

<style scoped>
.history-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background-color: #212121 !important;
  color: white;
}

.history-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}

.history-poster {
  border-bottom: 2px solid #ffcc00;
}

.movie-title {
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.2;
}

.movie-info {
  font-size: 0.9rem;
  color: #a0a0a0;
}
.text-wrap {
  white-space: normal !important;
  overflow-wrap: break-word;
}
</style>
