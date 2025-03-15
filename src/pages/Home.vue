<template>
  <default-layout>
    <template #default>
      <div class="bv-example-row" style="width: 100%">
        <div class="row">
          <b-col>
          <b-skeleton v-if="isLoading" width="100%" height="500px"></b-skeleton>
          <video 
            v-else 
            class="custom-video" 
            :src="imageLoading" 
            type="video/mp4"
            controls 
            controlslist="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            muted
            style="border: 1px solid #ccc"
          >
            Trình duyệt của bạn không hỗ trợ video.
          </video>
          <!-- <b-img-lazy v-else :src="imageLoading" alt="Loaded image" width="100%" height="500px"></b-img-lazy> -->
        </b-col>

        </div>
        <div v-for="(section, sectionIndex) in sections" :key="sectionIndex">
          <b-row align-h="start" class="text-left">
          <b-col cols="3">
            <h1>{{ section.title }}</h1>
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
                  v-for="(item, index) in isLoading ? 8 : listMovie.slice(0, 8)"
                  :key="index"
                  class="text-center"
                >
                  <b-skeleton
                    v-if="isLoading"
                    height="200px"
                    width="250px"
                    style="margin: 10px"
                  ></b-skeleton>
                  <router-link :to="{name: 'MovieDetail', params:{slug: item.slug}}" v-else>
                    <b-img
                      :src="`${imageMove}${item.poster_url}`"
                      alt="Card Image"
                      width="250"
                      height="200"
                    >
                    </b-img>

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
import { ListmovieNew } from "@/model/api";

export default {
  name: "HomePage",
  data() {
    return {
      imageLoading: 'https://trailer.vieon.vn/Teaser_TuCam_mkt.mp4',
      isLoading: true,
      page: 1,
      imageMove: "",
      listMovie: [],
      //showControls: false,
      showControls: [],
      sections: [
        { title: "MỚI NHẤT",id: 'moi-nhat' },
        { title: "TRUNG QUỐC", id: 'trung-quoc'},
        { title: "HOT", id:'phim-hot'}
      ]
    };
  },
  mounted() {
    ListmovieNew(
      { page: this.page },
      (result) => {
        if (result.status === true) {
          this.listMovie = result.items;
          this.imageMove = result.pathImage;
          this.isLoading = false;
        }
        console.log(result);
      },
      (err) => {
        console.log(err);
      }
    );
  },
  methods: {
    scrollLeft(index) {
      this.$refs[`scrollContainer${index}`][0].scrollBy({ left: -300, behavior: "smooth" });
    },
    scrollRight(index) {
      this.$refs[`scrollContainer${index}`][0].scrollBy({ left: 300, behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
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
</style>