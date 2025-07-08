<template>
  <v-footer class="bg-grey-darken-4 text-white pa-8" height="auto">
    <v-container>
      <v-row>
        <!-- Logo + Mô tả -->
        <v-col cols="12" md="4">
          <div class="text-h5 font-weight-bold">
            <span class="font-italic">Phim</span><span class="text-yellow-darken-2">360</span>
          </div>
          <p class="mt-2 text-body-2">
            <strong>Phim360</strong> - {{$t('Trang xem phim Online với giao diện hiện đại, thân thiện người dùng.')}}
            {{$t('Nguồn phim tổng hợp từ các website lớn với đa dạng thể loại và quốc gia.')}}
          </p>

          <div class="d-flex flex-wrap mt-4 gap-2">
          <router-link
            v-for="(tag, index) in tags"
            :key="index"
            :to="tag.link"
            custom
           
          >
            <v-chip
             
              variant="outlined"
              color="grey-lighten-2"
              size="small"
              class="text-capitalize"
              aria-label="Xem thêm"
            >
              {{ tag.label }}
            </v-chip>
          </router-link>
        </div>
        </v-col>

        <!-- Thể loại -->
        <v-col cols="6" md="2">
          <h4 class="text-subtitle-1 font-weight-bold mb-3">{{$t('Thể loại')}}</h4>
          <ul class="pa-0">
            <li v-for="item in genres" :key="item" class="mb-1">
              <router-link :to="`/the-loai/${item.link}`" class="text-decoration-none">
                {{ item.lable }}
              </router-link>
            </li>
          </ul>
        </v-col>

        <!-- Quốc gia -->
        <v-col cols="6" md="2">
          <h4 class="text-subtitle-1 font-weight-bold mb-3">{{$t('Quốc gia')}}</h4>
          <ul class="pa-0">
            <li v-for="item in countries" :key="item" class="mb-1">
              <router-link :to="`/quoc-gia/${item.link}`" class="text-decoration-none">
                {{ item.lable }}
              </router-link>
            </li>
          </ul>
        </v-col>

        <!-- Thông tin -->
        <v-col cols="12" md="4">
          <h4 class="text-subtitle-1 font-weight-bold mb-3">Thông tin</h4>
          <ul class="pa-0">
            <li class="mb-1"><router-link to="" class="text-white text-decoration-none">{{$t('Giới thiệu')}}</router-link></li>
            <li class="mb-1"><router-link to="" class="text-white text-decoration-none">{{$t('Liên hệ')}}</router-link></li>
            <li class="mb-1"><router-link to="" class="text-white text-decoration-none">{{$t('Chính sách quyền riêng tư')}}</router-link></li>
            <li class="mb-1"><router-link to="" class="text-white text-decoration-none">{{$t('Khiếu nại bản quyền')}}</router-link></li>
          </ul>
        </v-col>
      </v-row>

      <!-- Bottom Line -->
      <v-divider class="my-4"></v-divider>
      <v-row class="align-center">
        <v-col >
          <p class="text-caption">
            © 2025 Phim360.
          </p>
        </v-col>
        
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'FooterPage',
  data() {
    return {
      tags: [
        { label: this.$t('Phim mới'), link: '/phim-moi' },
        { label: this.$t('Phim hay'), link: '/phim-hay' },
        { label: this.$t('Phim mới chill'), link: '/danh-sach/phim-moi-chill' },
        { label: this.$t('Phim 18'), link: '/danh-sach/phim-18' },
        { label: this.$t('Truyện tranh 18'), link: '/danh-sach/truyen-tranh-18' },
        { label: this.$t('Nettruyen'), link: '/danh-sach/net-truyen' },
        { label: this.$t('Nettruyen ngôn tình'), link: '/danh-sach/net-truyen-ngon-tinh' },
        { label: this.$t('Hiện đại'), link: '/danh-sach/hien-dai' }
      ],
      genres: [
        {lable: this.$t('Chính kịch'), link:'chinh-kich'},  
        {lable: this.$t('Cổ Trang'), link:'co-trang'},  
        {lable: this.$t('Tình Cảm'), link:'tinh-cam'},  
        {lable: this.$t('Phim Bộ'), link:'phim-bo'},  
        {lable: this.$t('Hành Động'), link:'hanh-dong'},
        {lable: this.$t('Học đường'), link:'hoc-duong'},
      ],
      countries: [
        {lable: this.$t('Âu Mỹ'), link:'au-my'},  
        {lable: this.$t('Hàn Quốc'), link:'han-quoc'},  
        {lable: this.$t('Trung Quốc'), link:'trung-quoc'},  
        {lable: this.$t('Nhật Bản'), link:'nhat-ban'},  
        {lable: this.$t('Ấn Độ'), link:'an-do'},  
        {lable: this.$t('Việt Nam'), link:'viet-nam'}  
      ]
    };
  },
  methods: {
    slugify(str) {
      return str.toLowerCase()
        .trim().replace(/\s+/g, '-');
    }
  }
};
</script>

<style scoped>
li {
  list-style: none;
  transition: transform 0.2s ease;
}

li:hover {
  transform: translateX(4px);
}

a,
.router-link-active,
.router-link-exact-active {
  text-decoration: none;
  color: inherit;
  transition: color 0.2s ease, text-shadow 0.2s ease;
}

a:hover,
.router-link:hover {
  color: #ffd54f;
  text-shadow: 0 0 5px rgba(255, 213, 79, 0.3);
}

.v-chip {
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;
}

.v-chip:hover {
  background-color: #ffd54f !important;
  color: #000 !important;
  transform: scale(1.05);
}

.text-yellow-darken-2 {
  text-shadow: 0 0 6px rgba(255, 213, 79, 0.3);
}

h4 {
  font-size: 1.1rem;
  position: relative;
  margin-bottom: 1rem;
}

h4::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -6px;
  height: 2px;
  width: 30%;
  background-color: #ffd54f;
  border-radius: 2px;
}
.v-chip {
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;
  cursor: pointer;
}

.v-chip:hover {
  background-color: #ffd54f !important;
  color: #000 !important;
  transform: scale(1.05);
}
</style>
