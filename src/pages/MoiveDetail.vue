<template>
  <div class="movie-detail">
    <!-- Phần 1: Video phim -->
    <div class="movie-video">
            <iframe 
        :src="movie.videoUrl" 
        width="100%" 
        height="600px" 
        allowfullscreen 
        frameborder="0">
    </iframe>
        
    </div>

    <!-- Tập phim -->
    <b-card class="bg-light text-dark">
    <b-card-header class="d-flex align-items-center">
        <strong class="text-dark me-2">{{ movie.title }}</strong>
        <b-badge variant="danger">Tập {{ movie.page }}</b-badge>
      </b-card-header>
    <b-card-body class="text-center ">
        <b-button-group>
          <b-button 
            v-for="(episode, index) in movie.pageMovie" 
            :key="index" 
            variant="dark" 
            class="episode-button p-2"
            @click="playEpisode(episode)"
          >
            {{ episode.slug }}
          </b-button>
        </b-button-group>
      </b-card-body>
      </b-card>


    <!-- Phần 2: Thông tin phim -->
    <div class="movie-info text-left">
      <h1>{{ movie.title }}</h1>
      <p>{{ movie.description }}</p>
      <p><strong>Diễn viên:</strong> {{ movie.actors }}</p>
      <p><strong>Đạo diễn:</strong> {{ movie.director }}</p>
      <p><strong>Thể loại:</strong> {{ movie.genre }}</p>
      <p><strong>Năm phát hành:</strong> {{ movie.year }}</p>
      <p><strong>Đánh giá:</strong> {{ movie.rating }}/5</p>
    </div>

    <!-- Phần 3: Đề xuất phimphim -->
    <div class="suggested-movies text-left">
      <h2>?? xu?t cho b?n</h2>
      <div class="movie-list">
        <router-link
          v-for="suggested in suggestedMovies"
          :key="suggested.id"
          :to="{ name: 'MovieDetail', params: { slug: suggested.slug } }"
          class="movie-card"
        >
          <img :src="suggested.posterUrl" :alt="suggested.title" />
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
import { MoveInfor } from "@/model/api";

export default {
  name: "MovieDetail",
  data() {
    return {
      movie: {
        title: "",
        description: "",
        videoUrl: "https://vip.opstream10.com/share/45b36e5ecc568d49a32b60f80f332b69",
        actors: [],
        director: "",
        genre: "",
        pageMovie: [],
        year: 1,
        page: 1,
        rating: 5,
      },
      suggestedMovies: [
        {
          id: 1,
          title: "Nha Tr?ng Th?t Th?",
          posterUrl: "https://example.com/poster1.jpg",
          slug: "nha-trang-that-thu",
        },
        {
          id: 2,
          title: "Sat Th? Ava",
          posterUrl: "https://example.com/poster2.jpg",
          slug: "sat-thu-ava",
        },
      ],
      comments: [],
      newComment: "",
    };
  },
  props: ["slug"],
  mounted() {
    MoveInfor(this.slug,(result) =>{
        if(result.status == true){
            this.movie.title = result.movie.name;
            this.movie.description = result.movie.content;
            this.movie.pageMovie = result.episodes[0].server_data;
            this.movie.director = result.movie.director
            
            this.movie.actors = result.movie.actors
        }
        console.log(result)
  },(err) =>{
    console.log(err)
  })
  },
  methods: {
    addComment() {
      if (this.newComment.trim()) {
        this.comments.push(this.newComment);
        this.newComment = "";
      }
    },
    playEpisode(episode){
        this.movie.title = episode.filename;
        this.movie.videoUrl = episode.link_embed;
        this.movie.page = episode.slug;

    }
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
</style>
