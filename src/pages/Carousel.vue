<template>
  <v-container fluid class="pa-0">
    <v-carousel
      v-if="videoList.length"
      height="550"
      hide-delimiters="false"
      delimiter-icon="mdi-circle"
      delimiter-size="10"
      delimiter-color="rgba(255, 255, 255, 0.6)"
      show-arrows="hover"
      cycle
      interval="9000"
      class="custom-carousel responsive-carousel"
    >
      <v-carousel-item
        v-for="(item) in videoList"
        :key="item._id"
      >
        <v-img
          :src="pathImage + item.poster_url"
          cover
          height="100%"
          class="carousel-image"
        >
          <!-- Overlay thông tin -->
          <v-sheet
            class="overlay-info  px-8 pb-8"
          >
            <h2 class="text-h4 white--text mb-2 text-shadow">{{ item.name }}</h2>

            <div class="info-row mb-1 white--text">
              <strong>{{$t('Năm')}}:</strong> {{ item.year }}
              <span class="divider">|</span>
              <strong>{{$t('Thể loại')}}:</strong> {{ item.category.map(cat => cat.name).join(', ') }}
              <span class="divider">|</span>
              <strong>{{$t('Đánh giá')}}:</strong> {{ item.rating || 'Chưa có' }}
              <span class="divider">|</span>
              <strong>{{$t('Thời lượng')}}:</strong> {{ item.time || 'N/A' }}
            </div>

            <p class="short-desc white--text mb-4">{{ item.origin_name || $t('Không có mô tả.') }}</p>

            <v-row justify="center">
              <v-btn
                color="red accent-4"
                variant="flat"
                class="watch-now-btn"
                @click="goToDetail(item.slug)"
                elevation="2"
              >
                {{$t('Xem ngay')}}
              </v-btn>
            </v-row>
          </v-sheet>
        </v-img>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
import { ListMovieByCate } from "@/model/api";

export default {
  name: "CarouselPage",
  data() {
    return {
      pathImage: "https://img.ophim.live/uploads/movies/",
      videoList: [],
      path: "phim-moi-cap-nhat",
    };
  },
  async created() {
    await this.ListMovie();
  },
  methods: {
    ListMovie() {
      ListMovieByCate(`${this.path}?page=1`, (result) => {
        if (result.status === "success") {
          // Giả sử dữ liệu có rating, duration, short_description
          this.videoList = result.data.items.slice(1, 6).map(item => ({
            ...item,
            rating: item.rating || null,
            duration: item.duration || null,
            short_description: item.short_description || null,
          }));
        }
      }, (err) => {
        console.error(err);
      });
    },
    goToDetail(slug) {
      this.$router.push({ name: "MovieDetail", params: { slug } });
    },
  },
};
</script>

<style scoped>
.custom-carousel {
  position: relative;
  background-color: #111;
  border-radius: 12px;
  overflow: hidden;
}

/* Ảnh nền */
.carousel-image {
  filter: brightness(0.85);
  transition: filter 0.4s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  filter: brightness(0.75) ;
  transition: all 0.4s ease;
}

.carousel-image:hover {
  filter: brightness(1);
}

/* Overlay info */
.overlay-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 24px 32px 32px 32px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.85),
    rgba(0, 0, 0, 0.3) 60%,
    transparent
  );
  border-radius: 0 0 12px 12px;
  /* Giới hạn chiều cao overlay */
  max-height: 180px;
  box-sizing: border-box;
  animation: fadeSlideUp 0.8s ease-out;
 
}

/* Text shadow cho dễ đọc trên nền ảnh */
.text-shadow {
  text-shadow:
    1px 1px 2px rgba(0, 0, 0, 0.9),
    0 0 8px rgba(0, 0, 0, 0.5);
}

/* Dòng info nhỏ */
.info-row {
  font-size: 0.9rem;
  color: #ddd;
}

.divider {
  margin: 0 8px;
  color: rgba(255, 255, 255, 0.5);
}

/* Mô tả ngắn */
.short-desc {
  font-size: 1rem;
  line-height: 1.3;
  max-height: 72px;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Nút xem ngay */
.watch-now-btn {
  width: 140px;
  font-weight: 700;
  transition: background-color 0.3s ease, color 0.3s ease;
  border-radius: 30px;
  box-shadow: 0 4px 12px rgba(255, 0, 0, 0.4);
  text-transform: uppercase;
}

.watch-now-btn:hover {
  background-color: #ff1744 !important;
  color: white !important;
  box-shadow: 0 6px 18px rgba(255, 23, 68, 0.8);
}

/* Dots nhỏ và mờ */
.v-carousel__controls__item {
  background-color: rgba(255, 255, 255, 0.4) !important;
  transition: background-color 0.3s ease;
}

.v-carousel__controls__item.v-carousel__controls__item--active {
  background-color: white !important;
}

/* Ẩn mũi tên khi không hover */
.custom-carousel .v-carousel__controls__prev,
.custom-carousel .v-carousel__controls__next {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.custom-carousel:hover .v-carousel__controls__prev,
.custom-carousel:hover .v-carousel__controls__next {
  opacity: 1;
}
@media (max-width: 600px) {
  .responsive-carousel {
    height: 350px !important;
  }

  .overlay-info {
    max-height: none;
    padding: 16px;
  }

  .short-desc {
    max-height: none;
  }
}
@keyframes fadeSlideUp {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.overlay-info h2 {
  opacity: 0;
  animation: fadeSlideUp 0.3s ease-out 0.1s forwards;
}

.overlay-info .info-row {
  opacity: 0;
  animation: fadeSlideUp 0.3s ease-out 0.2s forwards;
}

.overlay-info .short-desc {
  opacity: 0;
  animation: fadeSlideUp 0.3s ease-out 0.3s forwards;
}

.overlay-info .watch-now-btn {
  opacity: 0;
  animation: fadeSlideUp 0.3s ease-out 0.4s forwards;
}


</style>
