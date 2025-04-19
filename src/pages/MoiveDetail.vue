<template>
  <div class="movie-detail">
    <!-- Video -->
    <div v-html="generateEmbedHtml(movie.videoUrl)"></div>
    <!-- <iframe
      :src="movie.videoUrl"
      width="100%"
      height="600"
      loading="lazy"
      allowfullscreen
      frameborder="0"
      sandbox="allow-same-origin allow-scripts allow-presentation allow-popups"
      style="border: 1px solid #ccc; background: #000"
    ></iframe> -->

    <!-- Danh sách tập phim -->
    <v-card class="my-4" variant="flat" color="grey-darken-4" theme="dark">
      <v-card-title class="d-flex align-center">
        <span class="text-h6">{{ movie.title }}</span>
        <v-chip class="ml-2" color="red" text-color="white">Tập {{ movie.page }}</v-chip>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col
            v-for="(episode, index) in movie.pageMovie"
            :key="index"
            cols="auto"
            class="pa-2"
          >
            <v-btn color="primary" @click="playEpisode(episode)">
              {{ episode.slug ? episode.slug: "Trailer" }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Thông tin phim -->
    <div class="movie-info my-4">
      <h1 class="text-white">{{ movie.title }}</h1>
      <p v-html="movie.description" class="text-grey-lighten-2"></p>
      <p><strong>Diễn viên:</strong> {{ movie.actors.join(", ") }}</p>
      <p><strong>Đạo diễn:</strong> {{ movie.director.join(", ") }}</p>
      <p><strong>Thể loại:</strong> {{ movie.genre.name }}</p>
      <p>
        <strong>Đánh giá:</strong>
        <v-rating v-model="movie.rating" readonly density="compact" color="yellow" />
      </p>
    </div>

    <!-- Đề xuất phim -->
    <div class="suggested-movies my-8">
      <h2 class="text-h5 text-white mb-4">Đề xuất cho bạn!</h2>
      <div class="d-flex overflow-x-auto scroll-container" ref="movieList">
        <router-link
          v-for="suggested in suggestedMovies.slice(0, 8)"
          :key="suggested.id"
          :to="{ name: 'MovieDetail', params: { slug: suggested.slug } }"
          class="movie-card-link"
        >
          <v-card width="250" class="ma-2" color="grey-darken-3" theme="dark">
            <v-img
              :src="getOptimizedImage(suggested.poster_url)"
              height="300"
              cover
              class="rounded"
            />
            <v-chip
              v-if="suggested.episode_current === 'Tập 0'"
              color="yellow"
              class="position-absolute top-0 left-0 ma-2"
              label
              small
            >
              Full - {{ suggested.lang }}
            </v-chip>
            <v-chip
              v-else
              color="yellow"
              class="position-absolute top-0 left-0 ma-2"
              label
              small
            >
              {{ suggested.episode_current }} - {{ suggested.lang }}
            </v-chip>
            <v-card-text class="text-truncate text-white">
              {{ suggested.name }}
            </v-card-text>
          </v-card>
        </router-link>
      </div>
    </div>

    <!-- Bình luận -->
    <div class="comments my-8">
      <h2 class="text-white mb-4">Bình luận</h2>
      <v-textarea
        v-model="newComment"
        label="Viết bình luận..."
        variant="outlined"
        color="primary"
        auto-grow
        class="mb-2"
      />
      <v-btn color="primary" @click="addComment">Gửi</v-btn>
      <v-list lines="one">
        <v-list-item
          v-for="(comment, index) in comments"
          :key="index"
          class="text-white"
        >
          {{ comment }}
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>



<script>
import { MoveInfor, ListMovieByCate, urlImage } from "@/model/api";

export default {
  name: "MovieDetail",
  data() {
    return {
      isLoading: true,
      movie: {
        title: "",
        valueRate: 5,
        description: "",
        videoUrl: "",
        actors: [],
        director: [],
        genre: "",
        pageMovie: [],
        page: 1,
        rating: 5,
        categoris: "",
      },
      isTrailer: false,
      urlImage: urlImage,
      suggestedMovies: [],
      comments: [],
      newComment: "",
    };
  },
  props: ["slug"],
  watch: {
    slug(newSlug) {
      this.MoveInfor(newSlug);
      this.ListMovieByCate();
    },
  },
  mounted() {
    this.MoveInfor(this.slug);
    this.ListMovieByCate();
  },
  methods: {
    // Call API
    MoveInfor(slug) {
      MoveInfor(
        slug,
        (result) => {
          if (result.status == true) {
            
            this.movie.title = result.movie.name;
            this.movie.description = result.movie.content;
            this.movie.pageMovie = result.episodes[0].server_data;
            this.movie.director = result.movie.director;
            if(result.movie.status == "trailer" && result.episodes[0].server_data[0].link_embed == ""){
              this.movie.videoUrl = result.movie.trailer_url
              this.isTrailer = true
            }
            else{
              this.movie.videoUrl = result.episodes[0].server_data[0].link_embed
              this.isTrailer = false;
            }
            this.movie.actors = result.movie.actor;
            for (var i = 0; i < result.movie.country.length; i++) {
              this.movie.genre = result.movie.country[i];
            }
            this.movie.categoris = result.movie.category[0].slug;
            this.isLoading = false  
            
          }
          console.log(result);
        },
        (err) => {
          console.log(err);
        }
      );
    },
    getOptimizedImage(imagePath) {
      return `${this.urlImage+encodeURIComponent(imagePath)}&w=384&q=100`;
    },
    ListMovieByCate() {
      ListMovieByCate(
        this.movie.categoris,

        (data) => {
          if (data.status == "success") {
            this.suggestedMovies = data.data.items;
            this.isLoading = false;
          }
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
    },

    addComment() {
      if (this.newComment.trim()) {
        this.comments.push(this.newComment);
        this.newComment = "";
      }
    },

    scrollLeft() {
      const container = this.$refs.movieList;
      container.scrollLeft -= 250; // Adjust the scroll distance as needed
    },
    
    // Scroll the container to the right
    scrollRight() {
      const container = this.$refs.movieList;
      container.scrollLeft += 250; // Adjust the scroll distance as needed
    },

    playEpisode(episode) {
      this.isLoading = true;
      this.movie.title = episode.filename;
      this.movie.videoUrl = episode.link_embed;
      this.movie.page = episode.slug;
    },
    generateEmbedHtml(url) {
      if (this.isTrailer) {
        const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/);
        if (youtubeMatch) {
          const videoId = youtubeMatch[1];
          return `
            <iframe width="100%" height="600"
              src="https://www.youtube.com/embed/${videoId}"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen loading="lazy">
            </iframe>
          `;
        } else {
          // Nếu không phải YouTube thì giả sử là .mp4 và dùng thẻ video
          return `
            <video width="100%" height="600" controls>
              <source src="${url}" type="video/mp4">
              Trình duyệt của bạn không hỗ trợ video.
            </video>
          `;
        }
        //return `<video width="100%" height="600" controls><source src="${url}" type="video/mp4">Trình duyệt của bạn không hỗ trợ video.</video> `;
      }
      else{
        return `<iframe src="${url}" width="100%" height="600" frameborder="0" allowfullscreen loading="lazy"></iframe>`;
        
      }
      
    }

  },
};
</script>

<style scoped>
.movie-detail {
  padding: 20px;
  background: #121212;
  color: #fff;
}

.movie-info p {
  margin-bottom: 8px;
}

.scroll-container {
  scroll-behavior: smooth;
  gap: 16px;
}

.movie-card-link {
  text-decoration: none;
  color: inherit;
  flex-shrink: 0;
}

.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.position-absolute {
  position: absolute;
}

.top-0 {
  top: 0;
}

.left-0 {
  left: 0;
}
</style>

