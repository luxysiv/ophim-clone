<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" class="custom-navbar">
    <b-navbar-brand to="/">
      <img src="/vieon-logo.png" alt="VieON - Xem phim trực tuyến" class="logo" />
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item :active="$route.path === '/home'" to="/home">{{$t('Trang chủ')}}</b-nav-item>
        <b-nav-item :active="$route.path === '/phim-bo'" to="/phim-bo">{{$t('Phim Bộ')}}</b-nav-item>
        <b-nav-item :active="$route.path === '/phim-le'" to="/phim-le">{{$t('Phim Lẻ')}}</b-nav-item>
        
        <b-nav-item-dropdown :text="$t('Thể loại')" right>
          <b-dropdown-item v-for="genre in genres" :key="genre.path" :to="{name: 'TheLoai', params:{path: genre.path}}">
            {{ genre.name }}
          </b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown :text="$t('Quốc gia')" right>
          <b-dropdown-item v-for="country in countries" :key="country.path" :to="{name: 'QuocGia', params:{path: country.path}}">
            {{ country.name }}
          </b-dropdown-item>
        </b-nav-item-dropdown>
        
        <b-nav-item :active="$route.path === '/phim-sap-chieu'" to="/phim-sap-chieu">{{$t('Sắp chiếu')}}</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto align-items-center">
        <b-form inline class="search-form">
          <b-input-group>
            <b-form-input v-model="searchQuery" placeholder="Tìm kiếm phim..." @keyup.enter="searchMovie"></b-form-input>
            <b-input-group-append>
              <b-button variant="outline-light" @click="searchMovie">
                <b-icon icon="search"></b-icon>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form>

        <b-nav-item-dropdown :text="$t('Ngôn ngữ')" right>
          <b-dropdown-item v-for="lang in languages" :key="lang.title" @click="changeLanguage(lang.code)">
            {{ lang.name }}
          </b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item href="/profile" :title="$t('Tài khoản')">
          <b-icon icon="person-circle"></b-icon>
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
      this.curLang = keyLang.title;
      this.applyLanguage(); 
      setLanguage(this.curLang);
      this.$i18n.locale = this.curLang;
      this.$store.state.curi18n.curLang = this.curLang;
      this.showLang = false;
    },
    applyLanguage() {
      switch (this.curLang) {
        case "en-US":
          this.curElLang = en;
          break;
        case "vi-VN":
          this.curElLang = vi;;// Default to Vietnamese
          break;
        case "zh-CN":
          this.curElLang = cn;
          break;
        default:
          this.curElLang = vi;
          break;
      }
    },
    InitLang() {
      let currLang = getLanguage() || "vi-VN";
      this.curLang = currLang;
      this.applyLanguage();
    },
  },
  created() {
    this.InitLang(); // Initialize language when the component is created
  },
};
</script>

<style scoped>
.custom-navbar {
  background: linear-gradient(to right, #242424, #444);
  padding: 10px 20px;
}

.logo {
  height: 40px;
}

.search-form {
  margin-right: 15px;
}

@media (max-width: 768px) {
  .search-form {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
