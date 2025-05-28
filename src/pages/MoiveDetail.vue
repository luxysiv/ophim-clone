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
      <div class="video-wrapper"  v-html="generateEmbedHtml(movie.videoUrl)"></div>
    <!-- Danh sách tập phim -->
    <v-card class="my-4" variant="flat" color="grey-darken-4" theme="dark">
      <v-card-title class="d-flex align-center">
        <span class="text-h6">{{ movie.title }}</span>
        <v-chip class="ml-2" color="red" text-color="white">{{ movie.page }}</v-chip>
        <v-chip class="ml-2" color="red" text-color="white" v-if="typeof movie.page === 'string' && movie.page.toUpperCase().includes('HOÀN TẤT')">Tập 1</v-chip>
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
              {{ episode.name ? episode.name: "Trailer" }}
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
  <h2 class="text-h5 mb-4">🎬 Đề xuất cho bạn!</h2>
  <div class="carousel-wrapper" style="display: flex; align-items: center;">
    <button class="nav-btn left" @click="scrollLeft">&#9664;</button>
    <div class="suggested-slide-wrapper" ref="slideWrapper">
      <div class="suggested-slide">
        <div
          class="movie-card"
          v-for="suggested in suggestedMovies"
          :key="suggested.id"
        >
          <router-link
            :to="{ name: 'MovieDetail', params: { slug: suggested.slug } }"
            class="text-decoration-none"
          >
            <div class="card-inner">
              <div class="card-image-wrapper">
                <img
                  :src="getOptimizedImage(suggested.poster_url)"
                  class="card-image"
                  alt="Poster"
                />
                <div class="card-hover-overlay">
                  <p class="card-title">{{ suggested.name }}</p>
                </div>
              </div>

              <div class="card-info">
                <span class="episode-chip">
                  {{ suggested.episode_current }} - {{ suggested.lang }}
                </span>
                <div class="origin">{{ suggested.origin_name }}</div>
                <div class="meta">
                  {{ suggested.year }} | {{ suggested.category[0]?.name || 'N/A' }}
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <button class="nav-btn right" @click="scrollRight">&#9654;</button>
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
            // if (result.data.seoOnPage) {
            //   this.updateMetaTags(result.data.seoOnPage)
            // }
            if(result.movie.status == "trailer" && result.episodes[0].server_data[0].link_embed == ""){
              this.movie.videoUrl = result.movie.trailer_url
              this.isTrailer = true
            }
            else{
              if(this.movie.page == "Full" || this.movie.page.toUpperCase().includes('HOÀN TẤT')){
                this.movie.videoUrl = result.episodes[0].server_data[0].link_embed
                this.isTrailer = false;

              }
              else{
                var tap = this.movie.page.split("Tập ")[1].trim();
                this.movie.videoUrl = result.episodes[0].server_data[tap-1].link_embed
                this.isTrailer = false;
              }
            }
            console.log(this.movie.videoUrl)
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
    // Chuản SEO
    updateMetaTags(seo) {
    document.title = seo.titleHead || 'Phim hay'

    const removeOldMeta = (key, attr = 'name') => {
      const old = document.querySelectorAll(`meta[${attr}="${key}"]`)
      old.forEach(tag => tag.remove())
    }

    const setMeta = (key, content, attr = 'name') => {
      if (!content) return
      const meta = document.createElement('meta')
      meta.setAttribute(attr, key)
      meta.setAttribute('content', content)
      document.head.appendChild(meta)
    }

    // Xóa cũ
    removeOldMeta('description')
    removeOldMeta('og:title', 'property')
    removeOldMeta('og:description', 'property')
    removeOldMeta('og:type', 'property')
    removeOldMeta('og:image', 'property')

    // Thêm mới
    setMeta('description', seo.descriptionHead)
    setMeta('og:title', seo.titleHead, 'property')
    setMeta('og:description', seo.descriptionHead, 'property')
    setMeta('og:type', seo.og_type || 'website', 'property')

    if (Array.isArray(seo.og_image)) {
      seo.og_image.forEach(img => {
        setMeta('og:image', img, 'property')
      })
    }
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
      const container = this.$refs.slideWrapper;
      if (container) {
        container.scrollBy({ left: -220, behavior: 'smooth' });
      }
    },
    scrollRight() {
      const container = this.$refs.slideWrapper;
      if (container) {
        container.scrollBy({ left: 220, behavior: 'smooth' });
      }
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
        return `<div style="position: relative; width: 100%; padding-bottom: 56.25%; ">
      <iframe
        src="${url}"
        frameborder="0"
        class="w-full h-full"
        loading="eager"
        allowfullscreen
        style="position: absolute; top: 0; left: 0; width: 100%; height: 80%;"
      ></iframe>
    </div>`;
      
      }
      
    }

  },
};
</script>

<style scoped>
.video-wrapper {
  width: 100vw;
  max-height: 700px;
  margin-left: calc(-50vw + 50%);
  background-color: black;
  z-index: 10;
  position: relative;
}

.video-wrapper iframe,
.video-wrapper video {
  width: 100%;
  height: auto;
  height: calc(100vw * 9 / 16); /* Tỷ lệ 16:9 */
  display: block;
  border: none;
  margin: 0;
  padding: 0;
  position: absolute;
}

.movie-detail {
  position: relative;
  padding: 12px 0;

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
.suggested-slide-wrapper {
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 10px;
  scroll-behavior: smooth;
}

.suggested-slide {
  display: flex;
  gap: 16px;
  transition: transform 0.3s ease-in-out;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.movie-card {
  flex: 0 0 auto;
  width: 200px;
  background-color: #2e2e2e;
  border-radius: 12px;
  overflow: hidden;
  scroll-snap-align: start;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.movie-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
}

.card-inner {
  position: relative;
}

.card-image-wrapper {
  position: relative;
  overflow: hidden;
  height: 300px;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.movie-card:hover .card-image {
  transform: scale(1.05);
}

.card-hover-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  text-align: center;
  padding: 8px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.movie-card:hover .card-hover-overlay {
  transform: translateY(0);
}

.card-title {
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-info {
  padding: 12px;
  color: #ccc;
}

.episode-chip {
  display: inline-block;
  background-color: #ffd600;
  color: black;
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 6px;
}

.origin {
  font-weight: bold;
  color: #fff;
}

.meta {
  font-size: 0.8rem;
  color: #aaa;
}

/* Nút điều hướng trái phải */
.nav-btn {
  background-color: rgba(0, 0, 0, 0.6);
  border: none;
  color: white;
  font-size: 24px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 50%;
  user-select: none;
  transition: background-color 0.3s ease;
  z-index: 10;
  flex-shrink: 0;
}

.nav-btn:hover {
  background-color: rgba(0, 0, 0, 0.9);
}

.nav-btn.left {
  margin-right: 8px;
}

.nav-btn.right {
  margin-left: 8px;
}


</style>

