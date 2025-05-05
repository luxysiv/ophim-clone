<template>
  <v-col cols="12" class="text-center" v-if="isLoading">
        <v-progress-circular indeterminate color="primary" size="50" />
      </v-col>
  <div class="movie-detail" v-else>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
    <!-- Video -->
    <div v-html="generateEmbedHtml(movie.videoUrl)"></div>
    

    <!-- Danh sách tập phim -->
    <v-card class="my-4" variant="flat" color="grey-darken-4" theme="dark">
      <v-card-title class="d-flex align-center">
        <span class="text-h6">{{ movie.title }}</span>
        <v-chip class="ml-2" color="red" text-color="white">{{ movie.page }}</v-chip>
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
    
      <v-card class="pa-6 text-left" color="grey-darken-4" variant="flat" rounded="lg" theme="dark">
        <v-card-title class="text-white mb-4">
          {{ movie.title }}
        </v-card-title>
    
        <v-card-text class="text-grey-lighten-2 text-left">
          <div v-html="movie.description"></div>
        </v-card-text>
    
        <v-card-text class="text-white text-left">
          <p class="mb-2">
            <strong>Diễn viên:</strong> {{ movie.actors.join(", ") }}
          </p>
          <p class="mb-2">
            <strong>Đạo diễn:</strong> {{ movie.director.join(", ") }}
          </p>
          <p class="mb-2">
            <strong>Thể loại:</strong> {{ movie.genre.name }}
          </p>
          <div class="d-flex align-center">
            <strong class="mr-2">Đánh giá:</strong>
            <v-rating
              readonly
              :length="5"
              :size="28"
              :model-value="movie.rating"
              active-color="yellow-darken-2"
            />
          </div>
        </v-card-text>
      </v-card>
    


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
   
    <v-card flat color="#1e1e1e" class="pa-6 rounded-xl elevation-2">
      <!-- Tiêu đề -->
      <h2 class="text-white mb-6 text-h5 font-weight-bold">🗨️ Bình luận</h2>

      <!-- Ô nhập bình luận -->
      <v-text-field
        v-model="newComment"
        placeholder="Thêm bình luận..."
        variant="outlined"
        color="blue"
        class="rounded-xl mb-4"
        density="comfortable"
        hide-details
        append-inner-icon="mdi-send"
        
        @click:append-inner="addComment"
        :rules="[v => !!v || 'Bình luận không được để trống']"
      ></v-text-field>

      <!-- Danh sách bình luận -->
      <v-divider class="mb-4" color="grey darken-3"></v-divider>
      <div
        v-for="(comment, index) in comments"
        :key="index"
        class="d-flex align-start mb-5"
      >
        <v-avatar size="44" class="me-3" color="blue-grey-darken-3">
          <v-icon color="white">mdi-account</v-icon>
        </v-avatar>

        <div class="flex-grow-1">
          <div class="d-flex align-center mb-1">
            <span class="text-blue-lighten-3 font-weight-medium me-2">{{ comment.username }}</span>
            <v-chip size="x-small" color="grey-darken-4" text-color="grey-lighten-1" variant="flat">
              {{ comment.time }}
            </v-chip>
          </div>
          <div class="text-white text-body-2">{{ comment.content }}</div>
          <div class="text-caption mt-2 text-grey-lighten-1" style="cursor: pointer;">Phản hồi</div>
        </div>
      </div>
    </v-card>
  </div>
  <v-snackbar v-model="mess" :timeout="3000" :color="color">
      {{ Message }}
    </v-snackbar>
</template>



<script>
import { MoveInfor, ListMovieByCate, urlImage, GetComments,AddComment } from "@/model/api";

export default {
  name: "MovieDetail",
  data() {
    return {
      items:[
        {
          title: 'Home',
          disabled: false,
          href: '/home',
        },
        {
          title: this.slug,
          disabled: true,
          
        },
      ],
      isLoading: true,
      Message: "",
      color: "",
      mess: false,
      movie: {
        title: "",
        valueRate: 4.5,
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
      idMovie: "",
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
          console.log(result);
          if (result.status == true) {
            this.movie.page = result.movie.episode_current
            this.idMovie = result.movie._id;
            this.movie.title = result.movie.origin_name;
            this.movie.description = result.movie.content;
            this.movie.pageMovie = result.episodes[0].server_data;
            this.movie.director = result.movie.director;
            if(result.movie.status == "trailer" && result.episodes[0].server_data[0].link_embed == ""){
              this.movie.videoUrl = result.movie.trailer_url
              this.isTrailer = true
            }
            else{
              if(this.movie.page == "Full"){
                this.movie.videoUrl = result.episodes[0].server_data[0].link_embed
                this.isTrailer = false;

              }
              else{

                var tap = this.movie.page.split("Tập ")[1].trim();
                this.movie.videoUrl = result.episodes[0].server_data[tap-1].link_embed
                this.isTrailer = false;
              }
            }
            this.movie.actors = result.movie.actor;
            for (var i = 0; i < result.movie.country.length; i++) {
              this.movie.genre = result.movie.country[i];
            }
            this.movie.categoris = result.movie.category[0].slug;
            this.isLoading = false  
            this.GetComment();

          }
          
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
      var account = localStorage.getItem('name');
      var data = {
            movieId: this.idMovie,
            episode: this.movie.page,
            userId: this.$store.state.empInfor.id,
            username: account,
            content: this.newComment
        }
      if(account == null || account == ""){
        this.$router.push('/login')
      }
      if (this.newComment.trim()) {
        AddComment(data, (dat) =>{
          if(dat.status == 201){
            this.Message = dat.data.message;
            this.color = "success";
            this.mess = true;
            this.GetComment()

          }
        },(err) =>{
            this.Message = err.response.data.message;
            this.color = "error";
            this.mess = true;
        })
        this.newComment = "";
      }
    },
    GetComment(){
      if (!this.idMovie) return;
  GetComments(
    { movieId: this.idMovie, episode: this.movie.page },
    (res) => {
      if (Array.isArray(res)) {
        this.comments = res.map(c => ({
          username: c.username,
          content: c.content,
          createdAt: c.createdAt
        }));
      }
    },
    (err) => {
      console.error("Lỗi lấy bình luận:", err);
    }
  );
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
      this.movie.page = "Tập "+ episode.slug;
      this.GetComment()
      this.isLoading = false
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

