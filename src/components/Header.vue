<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" class="main-navbar">
    <!-- Logo -->
    <b-navbar-brand to="/">
      <img src="/vieon-logo.png" alt="VieON - Xem phim trực tuyến" class="logo" />
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" />

    <b-collapse id="nav-collapse" is-nav>
      <!-- Menu chính bên trái -->
      <b-navbar-nav>
        <b-nav-item :active="$route.path === '/home'" to="/home">{{ $t('Trang chủ') }}</b-nav-item>
        <b-nav-item :active="$route.path === '/phim-bo'" to="/phim-bo">{{ $t('Phim Bộ') }}</b-nav-item>
        <b-nav-item :active="$route.path === '/phim-le'" to="/phim-le">{{ $t('Phim Lẻ') }}</b-nav-item>

        <b-nav-item-dropdown :text="$t('Thể loại')" right>
          <b-dropdown-item v-for="genre in genres" :key="genre.path" :to="{ name: 'TheLoai', params: { path: genre.path } }">
            {{ genre.name }}
          </b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown :text="$t('Quốc gia')" right>
          <b-dropdown-item v-for="country in countries" :key="country.path" :to="{ name: 'QuocGia', params: { path: country.path } }">
            {{ country.name }}
          </b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item :active="$route.path === '/phim-sap-chieu'" to="/phim-sap-chieu">{{ $t('Sắp chiếu') }}</b-nav-item>
      </b-navbar-nav>

      <!-- Bên phải -->
      <b-navbar-nav class="ml-auto align-items-center">
        <!-- Tìm kiếm -->
        <b-nav-form @submit.prevent="searchMovie">
          <b-form-input
            size="sm"
            class="search-input mr-2"
            placeholder="Tìm kiếm phim..."
            v-model="searchQuery"
            @keyup.enter="searchMovie"
          />
          <b-button size="sm" variant="success" @click="searchMovie">Search</b-button>
        </b-nav-form>

        <!-- Chọn ngôn ngữ -->
        <b-nav-item-dropdown :text="$t('Ngôn ngữ')" right>
          <b-dropdown-item v-for="lang in languages" :key="lang.title" @click="changeLanguage(lang.title)">
            {{ lang.name }}
          </b-dropdown-item>
        </b-nav-item-dropdown>

        <!-- Tài khoản -->
        <b-nav-item href="/profile" :title="$t('Tài khoản')">
          <b-icon icon="person-circle" font-scale="1.2" />
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>




<script>
import vi from 'element-plus/dist/locale/vi.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import cn from 'element-plus/dist/locale/zh-cn.mjs'
import { getLanguage, setLanguage } from "@/utils/cookies";
export default {
  name: "HeaderComponent",
  data() {
    return {
      
      searchQuery: '',
      curElLang: "", // current Lang i18n for Element plus
      curLang: "", //current lang i18n for system
      genres: [
        { name: this.$t('Hành động'), path: 'hanh-dong' },
        { name: this.$t('Cổ trang'), path: 'co-trang' },
        { name: this.$t('Chiến tranh'), path: 'chien-tranh' },
        { name: this.$t('Tình cảm'), path: 'tinh-cam' },
        { name: this.$t('Hài hước'), path: 'hai-huoc' },
        { name: this.$t('Âm nhạc'), path: 'am-nhac' },
        { name: this.$t('Học đường'), path: 'hoc-duong' }
      ],
      countries: [
        { name: this.$t('Trung Quốc'), path: 'trung-quoc' },
        { name: this.$t('Hàn Quốc'), path: 'han-quoc' },
        { name: this.$t('Nhật Bản'), path: 'nhat-ban' },
        { name: this.$t('Thái Lan'), path: 'thai-lan' },
        { name: this.$t('Ấn Độ'), path: 'an-do' },
        { name: this.$t('Anh'), path: 'anh' }
      ],
      languages: [
        { name: "Tiếng việt", title: "vi-VN" },
        { name: "English", title: "en-US" },
        { name: "中国", title: "zh-CN" },
      ]
    };
  },
  methods: {
    
    searchMovie() {
      if (this.searchQuery.trim()) {
        this.$router.push({ name: "SearchMovie", query: { keyword: this.searchQuery } });
      }
    },
    changeLanguage(keyLang) {
        this.curLang = keyLang;
        this.ChangeLang();
    },
    ChangeLang() {
        switch (this.curLang) {
            case "en-US": 
              this.curElLang = en; 
              break;
            case "vi-VN": 
              this.curElLang = vi; 
              break;
            case "zh-CN": 
              this.curElLang = cn; 
              break;
            default:
                this.curElLang = vi;
                break;
        }
        if (this.curLang) {
            this.$i18n.locale = this.curLang
            // Cookie
            setLanguage(this.curLang)
            // i18n store
            this.$store.state.curi18n.curLang = this.curLang
            this.$store.state.curi18n.curElLang = this.curElLang
        }

    },
    InitLang() {
        let currLang = getLanguage();
        this.curLang = currLang ? currLang : "vi-VN";
        this.ChangeLang();
    },
  },
  created() {
    this.InitLang(); // Initialize language when the component is created
  },
};
</script>

<style scoped>
.main-navbar {
  background-color: #333 !important;
  padding: 10px 16px;
  border-bottom: 1px solid #333;
  box-shadow: 0 2px 8px rgba(75, 74, 74, 0.6); /* <- Đổ bóng ở đây */
  z-index: 1000;
  position: sticky;
  top: 0;
}

.logo {
  height: 38px;
  color: #fff;
}

:deep(.navbar-nav .nav-link) {
  color: #fff !important;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 12px;
}

:deep(.navbar-nav .nav-link:hover) {
  color: #00e165 !important;
}

.search-input {
  background-color: #222;
  border: none;
  color: #fff;
  max-width: 180px;
}

.search-input::placeholder {
  color: #aaa;
}
.search-input {
  background-color: #222;
  border: none;
  color: #fff;
  max-width: 200px;
}

:deep(.form-inline) {
  display: flex;
  align-items: center;
}

:deep(.form-inline .btn) {
  margin-left: 8px;
}
</style>


