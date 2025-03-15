<template>
  <div class="movie-detail">
    <!-- Phần 1: Video phim -->
    <div class="movie-video">
      <iframe
        :src="movie.videoUrl"
        width="100%"
        height="600px"
        allowfullscreen
        frameborder="0"
        style="border: 1px solid #ccc"
      >
      </iframe>
    </div>

    <!-- Tập phim -->
    <b-card class="bg-light text-dark">
      <b-card-header class="d-flex align-items-center">
        <strong class="text-dark me-2">{{ movie.title }}</strong>
        <b-badge variant="danger">Tập {{ movie.page }}</b-badge>
      </b-card-header>
      <b-card-body class="text-left">
        <b-button-group class="d-flex flex-wrap justify-content">
          <div v-for="(episode, index) in movie.pageMovie" :key="index" class="episode-button-wrapper" style="width: 80px; height:40px;margin: 10px 20px; ">
          <b-button
            variant="dark"
            class="episode-button"
            style="margin: 10px 20px; width: 100%; height:100%"
            @click="playEpisode(episode)"
          >
            {{ episode.slug }}
          </b-button>
          </div>
        </b-button-group>
      </b-card-body>
    </b-card>

    <!-- Phần 2: Thông tin phim -->
    <div class="movie-info text-left">
      <h1>{{ movie.title }}</h1>
      <p v-html= "movie.description"></p>
      <p><strong>Diễn viên: </strong>{{ movie.actors.join(', ') }} </p>
      <p><strong>Đạo diễn:</strong> {{ movie.director.join(', ') }}</p>
      <p><strong>Thể loại:</strong> {{ movie.genre.name }}</p>
      <p><strong>Đánh giá:</strong> <el-rate v-model="valueRate" clearable /></p>
    </div>

    <!-- Phần 3: Đề xuất phimphim -->
    <div class="suggested-movies text-left">
      <h1>Đề xuất cho bạn!</h1>
      <div class="movie-list" ref="movieList">
        <router-link
          v-for="suggested in suggestedMovies"
          :key="suggested.id"
          :to="{ name: 'MovieDetail', params: { slug: suggested.slug } }"
          class="movie-card"
        >
          <img width="250" height="200" :src="urlImage+suggested.poster_url" :alt="suggested.origin_name" />
          <p>{{ suggested.title }}</p>
        </router-link>
      </div>
    </div>

    <!-- Phần 4: Binh luận -->
    <div class="comments">
      <h2>Binh lu?n</h2>
      <b-form-textarea v-model="newComment" placeholder="Viết bình luận..." />
      <b-button @click="addComment">G?i</b-button>
      <ul>
        <li v-for="(comment, index) in comments" :key="index">{{ comment }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { MoveInfor,ListMovieByCate,urlImage } from "@/model/api";

export default {
  name: "MovieDetail",
  data() {
    return {
      movie: {
        title: "",
        valueRate: 5,
        description: "",
        videoUrl:
          "https://vip.opstream10.com/share/45b36e5ecc568d49a32b60f80f332b69",
        actors: [],
        director: [],
        genre: "",
        pageMovie: [],
        page: 1,
        rating: 5,
        categoris: ''
      },
      urlImage: urlImage,
      suggestedMovies: [],
      comments: [],
      newComment: "",
    };
  },
  props: ["slug"],
   mounted() {
    MoveInfor(
      this.slug,
      (result) => {
        if (result.status == true) {
          this.movie.title = result.movie.name;
          this.movie.description = result.movie.content;
          this.movie.pageMovie = result.episodes[0].server_data;
          this.movie.director = result.movie.director;

          this.movie.actors = result.movie.actor;
          for(var i=0;i<result.movie.country.length;i++){
            this.movie.genre = result.movie.country[i]
          }
          this.movie.categoris = result.movie.category[0].slug
          console.log(this.movie.categoris)
          
        }
        console.log(result);
      },
      (err) => {
        console.log(err);
      }
    );
    ListMovieByCate(this.movie.categoris,
      (data) =>{
        if(data.status == 'success'){
          this.suggestedMovies = data.data.items
        }
        console.log(data)
      },
      (err) =>{
        console.log(err)
      }
    )
  },
  methods: {
    addComment() {
      if (this.newComment.trim()) {
        this.comments.push(this.newComment);
        this.newComment = "";
      }
    },
    playEpisode(episode) {
      this.movie.title = episode.filename;
      this.movie.videoUrl = episode.link_embed;
      this.movie.page = episode.slug;
    },
  },
};
</script>

<style scoped>
.movie-video video {
  width: 100%;
  max-height: 600px;
}

.movie-info {
  text-align: left;
  margin-top: 20px;
}
suggested-movies{
  text-align: left;
  margin-top: 20px;
}

.suggestion-list {
  display: flex;
  gap: 15px;
}

.suggestion-card {
  flex: 0 0 250px;
}

.comment-list {
  list-style: none;
  padding: 0;
}

.comment-list li {
  background: #f1f1f1;
  padding: 10px;
  margin-bottom: 5px;
}
.suggested-movies {
  text-align: center;
}

.movie-slider {
  display: flex;
  align-items: center;
  position: relative;
}

.movie-list {
  display: flex;
  overflow: hidden;
  width: 100%; /* hoặc một giá trị cố định nếu bạn muốn giới hạn chiều rộng */
  transition: transform 0.3s ease;
}

.movie-card {
  margin-right: 15px;
  text-align: center;
  flex-shrink: 0; /* Không co lại khi không gian bị hạn chế */
}
</style>
