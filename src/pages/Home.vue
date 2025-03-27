<template>
  <default-layout>
    <template #default>
      <div class="bv-example-row" style="width: 100%">
        <div class="row">
          <b-col>
          <b-skeleton v-if="isLoading" width="100%" height="500px"></b-skeleton>
          <div v-else>
            <b-carousel
              id="carousel-1"
              v-model="slide"
              :interval="4000"
              controls
              indicators
              background="#ababab"
              img-width="1024"
              img-height="480"
              style="text-shadow: 1px 1px 2px #333;"
              @sliding-start="onSlideStart"
              @sliding-end="onSlideEnd"
            >
              <b-carousel-slide v-for="(video, index) in videoList" :key="index">
                <template #img>
                  <img
                    class="d-block img-fluid w-100"
                    width="1024"
                    height="480"
                    :src="video.url"
                    alt="image slot"
                  >
                </template>
              </b-carousel-slide>
            </b-carousel>
          </div>
        </b-col>

        </div>
        <div v-for="(section, sectionIndex) in sections" :key="sectionIndex">
          <b-row align-h="start" class="text-left">
          <b-col cols="3">
            <h1 class="Title">{{ section.title }}</h1>
          </b-col>
          <b-col cols="2" class="text-left">
            <router-link :to="{ name: '', params: { id: section.id } }">
              Xem tất cả >>
            </router-link>
          </b-col>
        </b-row>
          <div
            class="scroll-wrapper"
            @mouseenter="showControls[sectionIndex] = true"
            @mouseleave="showControls[sectionIndex] = false"
          >
            <button
              aria-label="Cuộn sang trái"
              v-if="showControls[sectionIndex]"
              class="scroll-btn left"
              @click="scrollLeft(sectionIndex)"
            >
              &lt;
            </button>
            <div class="scroll-container" :ref="`scrollContainer${sectionIndex}`">
              <b-row class="flex-nowrap">
                <b-col
                  v-for="item in isLoading ? Array(8).fill({})  : section.listMovie.slice(0, 10)"
                  :key="item._id"
                  class="text-center"
                >
                  <b-skeleton
                    v-if="isLoading"
                    height="200px"
                    width="250px"
                    style="margin: 10px"
                  ></b-skeleton>
                  <router-link :to="{name: 'MovieDetail', params:{slug: item.slug}}" v-else>
                    <b-card
                      class="movie-card"
                      no-body
                      style="width: 250px; border: none; margin: 10px"
                    >
                     <div class="image-container">
                      <b-card-img :src="getOptimizedImage(item.poster_url)" alt="Movie Image" height="200" width="250" class="movie-img" loading="lazy" />
                      
                     </div>
                     <div class="overlay">
                      <b-badge v-if="item.episode_current == 'Tập 0'" variant="warning" class="badge-top-left">Full-{{ item.lang }}</b-badge>
                      <b-badge v-else variant="warning" class="badge-top-left">{{ item.episode_current }}-{{ item.lang }}</b-badge>
                    </div>
                      <!-- Tiêu đề phim -->
                      <b-card-body class="p-2 text-center movie-title">
                        <b-card-title class="m-0 text-truncate" :title="item.name">
                          {{ item.name }}
                        </b-card-title>
                      </b-card-body>
                    </b-card>

                  </router-link>
                </b-col>
              </b-row>
            </div>
            <button
              aria-label="Cuộn sang phải"
              v-if="showControls[sectionIndex]"
              class="scroll-btn right"
              @click="scrollRight(sectionIndex)"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </template>
  </default-layout>
</template>

<script>
import { ListMovieByCateHome,urlImage } from "@/model/api";

export default {
  name: "HomePage",
  data() {
    return {
      urlImage: urlImage,
      imageLoading: 'https://trailer.vieon.vn/Teaser_TuCam_mkt.mp4',
      slide: 0,
      sliding: null,
      videoList: [
        {url: "https://picsum.photos/1024/480/?image=52"},
        {url: "https://picsum.photos/1024/480/?image=54"},
        {url: "https://picsum.photos/1024/480/?image=58"}
      ],
      isLoading: true,
      page: 1,
      
      imageMove: [],
      listMovie: [],
      //showControls: false,
      showControls: [],
      sections: [
        { title: "PHIM ĐỀ CỬ",id: 'danh-sach/moi-nhat',listMovie: [] },
        { title: "PHIM THỊNH HÀNH", id: 'danh-sach/thinh-hanh',listMovie: []},
        { title: "PHIM HÀN QUỐC", id:'quoc-gia/han-quoc',listMovie: []},
        { title: "PHIM TRUNG QUỐC", id:'quoc-gia/trung-quoc',listMovie: []}
      ]
    };
  },
  mounted() {
    this.sections.forEach(item => {
      this.ListMovie(item.id, item)

    console.log(this.listMovie)
    })
  },
  methods: {
    ListMovie(sectionId,section){
      ListMovieByCateHome(
      sectionId ,
      (result) => {
        if (result.status === 'success') {
          section.listMovie = result.data.items;
          this.imageMove = result.data.items.poster_url;
          this.isLoading = false;
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

    scrollLeft(index) {
      this.$refs[`scrollContainer${index}`][0].scrollBy({ left: -300, behavior: "smooth" });
    },
    scrollRight(index) {
      this.$refs[`scrollContainer${index}`][0].scrollBy({ left: 300, behavior: "smooth" });
    },
    onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      }
  },
};
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
.scroll-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.scroll-container {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  /* padding: 10px 0; */
  scroll-behavior: smooth;
}

.scroll-container::-webkit-scrollbar {
  display: none;
}

.scroll-btn {
  position: absolute;
  background: rgba(94, 92, 92, 0.7);
  color: white;
  border: none;
  /* padding: 10px; */
  cursor: pointer;
  z-index: 10;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
}

.scroll-btn.left {
  left: 0;
}

.scroll-btn.right {
  right: 0;
}

.scroll-btn:hover {
  background: rgba(105, 103, 103, 0.9);
}
.video-container {
  width: 100%;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
}

.custom-video {
  width: 100%;
  height: 600px;
  object-fit: cover;
}
.Title{
    font-weight: 700;
    font-size: 24px;
    margin: 15px 0;
}
.image-container {
  width: 100%;
  height: 200px;
  overflow: hidden; /* Giữ ảnh trong khung */
  display: flex;
  justify-content: center;
  align-items: center;
}

.movie-img {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-in-out;
}

.image-container:hover .movie-img {
  transform: scale(1.1); /* Phóng to ảnh khi hover */
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
.overlay {
  position: absolute;
  top: 10px;
  left: 10px;
}
  @media (max-width: 768px) {
  .movie-title {
    font-size: 16px;
    padding: 3px;
  }
  .overlay {
    top: 5px;
    left: 5px;
  }
}
  @media (max-width: 768px) {
  .scroll-btn {
    display: none;
  }
}
  .scroll-container {
  display: flex;
  overflow-x: scroll;
  white-space: nowrap;
  scroll-behavior: smooth;
  max-width: 100vw;
}
  .image-container {
  width: 100%;
  height: auto;
}

.movie-img {
  width: 100%;
  height: auto;
}
</style>
