<template>
  <div>
    <v-app-bar class="main-navbar">
      <v-app-bar-nav-icon v-show="$vuetify.display.lgAndDown" @click="drawer = !drawer" />
      <v-img :src="imageLogo" alt="Phim360" contain class="mx-4" cover style="cursor: pointer" @click="goHome"></v-img>

      <v-toolbar-items class="d-none d-lg-flex">
        <v-btn text :to="{ path: '/home' }" :class="{ 'text-green': $route.path === '/home' }">
          {{ $t('Trang chủ') }}
        </v-btn>
        <v-btn text :to="{ path: '/phim-bo' }" :class="{ 'text-green': $route.path === '/phim-bo' }">
          {{ $t('Phim Bộ') }}
        </v-btn>
        <v-btn text :to="{ path: '/phim-le' }" :class="{ 'text-green': $route.path === '/phim-le' }">
          {{ $t('Phim Lẻ') }}
        </v-btn>

        <v-menu offset-y>
          <template #activator="{ props }">
            <v-btn text v-bind="props" @click="getTheLoai" :loading="loadingTheLoai" :disabled="loadingTheLoai">
              {{ $t('Thể loại') }}
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list style="background-color: #1e1e1e">
            <v-sheet
              class="pa-4"
              style="
                max-width: 600px;
                background-color: #1e1e1e;
                color: white;
                border-radius: 8px;
              "
            >
              <v-row dense>
                <v-col v-for="genre in genres" :key="genre._id" cols="12" sm="6" md="3">
                  <RouterLink
                    :to="{ name: 'TheLoai', params: { path: genre.slug } }"
                    class="d-block text-white text-body-2 mb-2"
                    style="text-decoration: none"
                  >
                    {{ genre.name }}
                  </RouterLink>
                </v-col>
              </v-row>
            </v-sheet>
          </v-list>
        </v-menu>

        <v-menu offset-y>
          <template #activator="{ props }">
            <v-btn text v-bind="props" @click="getQuocGia" :loading="loadingQuocGia" :disabled="loadingQuocGia">
              {{ $t('Quốc gia') }}
              <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list style="background-color: #1e1e1e">
            <v-sheet
              class="pa-4"
              style="
                max-width: 600px;
                background-color: #1e1e1e;
                color: white;
                border-radius: 8px;
              "
            >
              <v-row dense>
                <v-col v-for="country in countries" :key="country._id" cols="12" sm="6" md="3">
                  <RouterLink
                    :to="{ name: 'QuocGia', params: { path: country.slug } }"
                    class="d-block text-white text-body-2 mb-2"
                    style="text-decoration: none"
                  >
                    {{ country.name }}
                  </RouterLink>
                </v-col>
              </v-row>
            </v-sheet>
          </v-list>
        </v-menu>

        <v-btn text :to="{ path: '/phim-sap-chieu' }" :class="{ 'text-green': $route.path === '/phim-sap-chieu' }">
          {{ $t('Sắp chiếu') }}
        </v-btn>
        <v-btn text :to="{ path: '/hoat-hinh' }" :class="{ 'text-green': $route.path === '/hoat-hinh' }">
          {{ $t('Hoạt hình') }}
        </v-btn>
      </v-toolbar-items>

      <v-spacer />

      <v-menu
        v-model="menuVisible"
        :close-on-content-click="false"
        :open-on-click="false"
        :open-on-focus="false"
        @keyup.enter="searchMovie"
        offset-y
      >
        <template #activator="{ props: activatorProps }">
          <v-text-field
            v-bind="activatorProps"
            v-model="searchQuery"
            :placeholder="$t('Tên phim')"
            append-inner-icon="mdi-magnify"
            @keyup.enter="searchMovie"
            @click:append-inner="searchMovie"
            @update:model-value="onInput"
            clearable
            solo
            hide-details
            density="comfortable"
          />
        </template>

        <v-list
          v-if="movieSuggestions.length"
          style="
            min-width: 100%;
            max-height: 250px;
            overflow-y: auto;
            background-color: #1e1e1e;
            color: white;
            border-radius: 8px;
          "
        >
          <v-list-item v-for="(item, index) in movieSuggestions" :key="index" @click="selectSuggestion(item)">
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list
          v-else
          style="
            min-width: 100%;
            background-color: #1e1e1e;
            color: white;
            border-radius: 8px;
          "
        >
          <v-list-item>
            <v-list-item-title>{{ $t('Không tìm thấy kết quả') }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn icon title="Theme" @click="changeTheme" v-show="$vuetify.display.mdAndUp">
        <v-icon>mdi-white-balance-sunny</v-icon>
      </v-btn>
      <v-menu offset-y v-if="$vuetify.display.mdAndUp">
        <template #activator="{ props }">
          <v-btn icon v-bind="props" :title="$t('Ngôn ngữ')">
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="lang in languages" :key="lang.title" @click="changeLanguage(lang.title)">
            <v-list-item-title>{{ lang.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary class="d-lg-none">
      <v-list nav dense>
        <v-list-item :to="{ path: '/home' }" :class="{ 'text-green': $route.path === '/home' }" @click="drawer = false">
          <v-list-item-title>{{ $t('Trang chủ') }}</v-list-item-title>
        </v-list-item>

        <v-list-item :to="{ path: '/phim-bo' }" :class="{ 'text-green': $route.path === '/phim-bo' }" @click="drawer = false">
          <v-list-item-title>{{ $t('Phim Bộ') }}</v-list-item-title>
        </v-list-item>

        <v-list-item :to="{ path: '/phim-le' }" :class="{ 'text-green': $route.path === '/phim-le' }" @click="drawer = false">
          <v-list-item-title>{{ $t('Phim Lẻ') }}</v-list-item-title>
        </v-list-item>

        <v-list-item :to="{ path: '/phim-sap-chieu' }" :class="{ 'text-green': $route.path === '/phim-sap-chieu' }" @click="drawer = false">
          <v-list-item-title>{{ $t('Sắp chiếu') }}</v-list-item-title>
        </v-list-item>
        
        <v-list-item :to="{ path: '/hoat-hinh' }" :class="{ 'text-green': $route.path === '/hoat-hinh' }" @click="drawer = false">
          <v-list-item-title>{{ $t('Hoạt hình') }}</v-list-item-title>
        </v-list-item>

        <v-divider class="my-2"></v-divider>

        <v-expansion-panels multiple>
          <v-expansion-panel>
            <v-expansion-panel-title @click="getTheLoai" :loading="loadingTheLoai" :disabled="loadingTheLoai">
              {{ $t('Thể loại') }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list dense>
                <v-list-item
                  v-for="genre in genres"
                  :key="genre._id"
                  :to="{ name: 'TheLoai', params: { path: genre.slug } }"
                  @click="drawer = false"
                >
                  <v-list-item-title>{{ genre.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title @click="getQuocGia" :loading="loadingQuocGia" :disabled="loadingQuocGia">
              {{ $t('Quốc gia') }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list dense>
                <v-list-item
                  v-for="country in countries"
                  :key="country._id"
                  :to="{ name: 'QuocGia', params: { path: country.slug } }"
                  @click="drawer = false"
                >
                  <v-list-item-title>{{ country.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-list-item @click="changeTheme">
          <v-list-item-icon>
            <v-icon>mdi-white-balance-sunny</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t('Đổi giao diện') }}</v-list-item-title>
        </v-list-item>

        <v-expansion-panels multiple>
          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-list-item-icon><v-icon>mdi-translate</v-icon> {{ $t('Ngôn ngữ') }}</v-list-item-icon>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-list dense>
                <v-list-item v-for="lang in languages" :key="lang.title" @click="changeLanguage(lang.title)">
                  <v-list-item-title>{{ lang.name }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-list>
    </v-navigation-drawer>

    <v-snackbar v-model="mess" :timeout="3000" :color="color">
      {{ Message }}
    </v-snackbar>
  </div>
</template>

<script>
import vi from 'element-plus/dist/locale/vi.mjs';
import en from 'element-plus/dist/locale/en.mjs';
import cn from 'element-plus/dist/locale/zh-cn.mjs';
import { getLanguage, setLanguage } from '@/utils/cookies';
import { Categoris, City, Search } from '@/model/api';
import imageLogo from '@/assets/Logo.png';
export default {
  name: 'HeaderVuetify',
  data() {
    return {
      imageLogo: imageLogo,
      loadingQuocGia: false,
      loadingTheLoai: false,
      drawer: false,
      loading: false,
      mess: false,
      Message: '',
      color: '',
      searchQuery: '',
      curElLang: '',
      curLang: '',
      searchInput: '',
      movieSuggestions: [],
      menuVisible: false,
      genres: [],
      countries: [],
      languages: [
        { name: 'Tiếng Việt', title: 'vi-VN' },
        { name: 'English', title: 'en-US' },
        { name: '中国', title: 'zh-CN' },
      ],
    };
  },
  inject: ['currentTheme', 'setTheme'],
  methods: {
    changeTheme() {
      const newTheme = this.currentTheme() === 'dark' ? 'light' : 'dark';
      this.setTheme(newTheme);
    },
    getTheLoai() {
      this.loadingTheLoai = true;
      Categoris(
        {},
        (dat) => {
          if (dat.status == 'success') {
            this.genres = dat.data.items;
            this.loadingTheLoai = false;
          }
        },
        (err) => {
          console.log(err);
          this.loadingTheLoai = false;
        }
      );
    },
    getQuocGia() {
      this.loadingQuocGia = true;
      City(
        {},
        (dat) => {
          if (dat.status == 'success') {
            this.countries = dat.data.items;
            this.loadingQuocGia = false;
          }
        },
        (err) => {
          console.log(err);
          this.loadingQuocGia = false;
        }
      );
    },
    searchMovie() {
      if (this.searchQuery) {
        this.$router.push({
          name: 'SearchMovie',
          query: { keyword: this.searchQuery },
        });
        this.searchQuery = '';
        this.menuVisible = false;
      }
    },
    changeLanguage(keyLang) {
      this.curLang = keyLang;
      this.ChangeLang();
    },
    ChangeLang() {
      switch (this.curLang) {
        case 'en-US':
          this.curElLang = en;
          break;
        case 'vi-VN':
          this.curElLang = vi;
          break;
        case 'zh-CN':
          this.curElLang = cn;
          break;
        default:
          this.curElLang = vi;
          break;
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
      this.curLang = currLang || 'vi-VN';
      this.ChangeLang();
    },
    goHome() {
      this.$router.push('/home');
    },
    onInput(value) {
      if (!value || typeof value !== 'string' || value.trim().length < 2) {
        this.movieSuggestions = [];
        this.menuVisible = false;
        return;
      }

      this.fetchMovieSuggestions(value.trim());
    },
    fetchMovieSuggestions(keyword) {
      try {
        Search(
          { keyword },
          (dat) => {
            this.movieSuggestions = dat.data.items.sort((a, b) => b.year - a.year) || [];
            this.menuVisible = this.movieSuggestions.length > 0;
          },
          (err) => {
            console.error('Lỗi khi gọi API:', err);
          }
        );
      } catch (err) {
        console.error('Lỗi ngoài ý muốn:', err);
      }
    },
    selectSuggestion(item) {
      this.searchQuery = item.name;
      this.menuVisible = false;
      this.searchMovie();
    },
  },
  created() {
    this.InitLang();
  },
};
</script>

<style scoped>
.main-navbar {
  background-color: rgba(0, 0, 0, 0.3) !important;
  backdrop-filter: blur(10px);
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
a.router-link-exact-active,
a.router-link-active,
a:hover {
  color: #00e165 !important;
}
</style>
