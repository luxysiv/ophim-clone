<template>
  <v-app-bar
    app
    color="info"
    dark
    flat
    class="main-navbar"
  >
    <!-- Logo -->
    <v-app-bar-nav-icon @click="drawer = !drawer" />
    <v-img
      src="/vieon-logo.png"
      alt="VieON"
      max-height="38"
      contain
      class="mx-4"
    ></v-img>

    <!-- Menu chính -->
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn
        text
        :to="{ path: '/home' }"
        :class="{ 'text-green': $route.path === '/home' }"
      >
        {{ $t('Trang chủ') }}
      </v-btn>
      <v-btn
        text
        :to="{ path: '/phim-bo' }"
        :class="{ 'text-green': $route.path === '/phim-bo' }"
      >
        {{ $t('Phim Bộ') }}
      </v-btn>
      <v-btn
        text
        :to="{ path: '/phim-le' }"
        :class="{ 'text-green': $route.path === '/phim-le' }"
      >
        {{ $t('Phim Lẻ') }}
      </v-btn>

      <!-- Dropdown Thể loại -->
      <v-menu>
        <template #activator="{ props }">
          <v-btn text v-bind="props">
            {{ $t('Thể loại') }}
            <v-icon right>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="genre in genres"
            :key="genre.path"
            :to="{ name: 'TheLoai', params: { path: genre.path } }"
          >
            <v-list-item-title>{{ genre.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Dropdown Quốc gia -->
      <v-menu>
        <template #activator="{ props }">
          <v-btn text v-bind="props">
            {{ $t('Quốc gia') }}
            <v-icon right>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="country in countries"
            :key="country.path"
            :to="{ name: 'QuocGia', params: { path: country.path } }"
          >
            <v-list-item-title>{{ country.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn
        text
        :to="{ path: '/phim-sap-chieu' }"
        :class="{ 'text-green': $route.path === '/phim-sap-chieu' }"
      >
        {{ $t('Sắp chiếu') }}
      </v-btn>
    </v-toolbar-items>

    <!-- Search + Language + Profile -->
    <v-spacer />
    <v-text-field
      v-model="searchQuery"
      class="search-input"
      placeholder="Tìm kiếm phim..."
      hide-details
      dense
      @keyup.enter="searchMovie"
      prepend-inner-icon="mdi-magnify"
      single-line
      flat
      variant="solo-filled"
    ></v-text-field>
    <v-btn icon @click="searchMovie">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <!-- Ngôn ngữ -->
    <v-menu offset-y>
      <template #activator="{ props }">
        <v-btn icon v-bind="props" title="Ngôn ngữ">
          <v-icon>mdi-translate</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="lang in languages"
          :key="lang.title"
          @click="changeLanguage(lang.title)"
        >
          <v-list-item-title>{{ lang.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Tài khoản -->
    <v-btn icon :to="{ path: '/profile' }" title="Tài khoản">
      <v-icon>mdi-account-circle</v-icon>
    </v-btn>
  </v-app-bar>

<!-- DRAWER CHO MOBILE -->
<v-navigation-drawer
  v-model="drawer"
  app
  temporary
  class="d-md-none"
>
  <v-list nav dense>
    <!-- Mục chính -->
    <v-list-item
      :to="{ path: '/home' }"
      :class="{ 'text-green': $route.path === '/home' }"
    >
      <v-list-item-title>{{ $t('Trang chủ') }}</v-list-item-title>
    </v-list-item>

    <v-list-item
      :to="{ path: '/phim-bo' }"
      :class="{ 'text-green': $route.path === '/phim-bo' }"
    >
      <v-list-item-title>{{ $t('Phim Bộ') }}</v-list-item-title>
    </v-list-item>

    <v-list-item
      :to="{ path: '/phim-le' }"
      :class="{ 'text-green': $route.path === '/phim-le' }"
    >
      <v-list-item-title>{{ $t('Phim Lẻ') }}</v-list-item-title>
    </v-list-item>

    <!-- THỂ LOẠI (submenu) -->
    <v-expansion-panels multiple>
      <v-expansion-panel>
        <v-expansion-panel-title>
          {{ $t('Thể loại') }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-list dense>
            <v-list-item
              v-for="genre in genres"
              :key="genre.path"
              :to="{ name: 'TheLoai', params: { path: genre.path } }"
              @click="drawer = false"
            >
              <v-list-item-title>{{ genre.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- QUỐC GIA (submenu) -->
      <v-expansion-panel>
        <v-expansion-panel-title>
          {{ $t('Quốc gia') }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-list dense>
            <v-list-item
              v-for="country in countries"
              :key="country.path"
              :to="{ name: 'QuocGia', params: { path: country.path } }"
              @click="drawer = false"
            >
              <v-list-item-title>{{ country.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>
      

    <!-- Sắp chiếu -->
    <v-list-item
      :to="{ path: '/phim-sap-chieu' }"
      :class="{ 'text-green': $route.path === '/phim-sap-chieu' }"
    >
      <v-list-item-title>{{ $t('Sắp chiếu') }}</v-list-item-title>
    </v-list-item>
      <!-- Divider -->
    <v-divider class="my-2"></v-divider>

    </v-expansion-panels>

    

    <!-- Profile -->
    <v-list-item :to="{ path: '/profile' }">
      <v-list-item-icon><v-icon>mdi-account-circle</v-icon></v-list-item-icon>
      <v-list-item-title>{{ $t('Tài khoản') }}</v-list-item-title>
    </v-list-item>
  </v-list>
</v-navigation-drawer>



</template>

<script>
import vi from 'element-plus/dist/locale/vi.mjs';
import en from 'element-plus/dist/locale/en.mjs';
import cn from 'element-plus/dist/locale/zh-cn.mjs';
import { getLanguage, setLanguage } from "@/utils/cookies";

export default {
  name: "HeaderVuetify",
  data() {
    return {
      drawer: false,
      searchQuery: '',
      curElLang: '',
      curLang: '',
      genres: [
        { name: this.$t('Hành động'), path: 'hanh-dong' },
        { name: this.$t('Cổ trang'), path: 'co-trang' },
        { name: this.$t('Chiến tranh'), path: 'chien-tranh' },
        { name: this.$t('Tình cảm'), path: 'tinh-cam' },
        { name: this.$t('Hài hước'), path: 'hai-huoc' },
        { name: this.$t('Âm nhạc'), path: 'am-nhac' },
        { name: this.$t('Học đường'), path: 'hoc-duong' },
      ],
      countries: [
        { name: this.$t('Trung Quốc'), path: 'trung-quoc' },
        { name: this.$t('Hàn Quốc'), path: 'han-quoc' },
        { name: this.$t('Nhật Bản'), path: 'nhat-ban' },
        { name: this.$t('Thái Lan'), path: 'thai-lan' },
        { name: this.$t('Ấn Độ'), path: 'an-do' },
        { name: this.$t('Anh'), path: 'anh' },
      ],
      languages: [
        { name: "Tiếng Việt", title: "vi-VN" },
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
        case "en-US": this.curElLang = en; break;
        case "vi-VN": this.curElLang = vi; break;
        case "zh-CN": this.curElLang = cn; break;
        default: this.curElLang = vi; break;
      }

      if (this.curLang) {
        this.$i18n.locale = this.curLang;
        setLanguage(this.curLang);
        this.$store.state.curi18n.curLang = this.curLang;
        this.$store.state.curi18n.curElLang = this.curElLang;
      }
    },
    InitLang() {
      const currLang = getLanguage();
      this.curLang = currLang || "vi-VN";
      this.ChangeLang();
    }
  },
  created() {
    this.InitLang();
  }
};
</script>

<style scoped>
.main-navbar {
  box-shadow: 0 2px 8px rgba(75, 74, 74, 0.6);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.search-input {
  max-width: 200px;
  background-color: #222;
  color: white;
}
.text-green {
  color: #00e165 !important;
}
</style>
