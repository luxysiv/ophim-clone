<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" class="custom-navbar">
    <b-navbar-brand to="/">
      <img src="/vieon-logo.png" alt="VieON - Xem phim trực tuyến" class="logo" />
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item :active="$route.path === '/home'" to="/home">Trang chủ</b-nav-item>
        <b-nav-item :active="$route.path === '/phim-bo'" to="/phim-bo">Phim Bộ</b-nav-item>
        <b-nav-item :active="$route.path === '/phim-le'" to="/phim-le">Phim Lẻ</b-nav-item>
        
        <b-nav-item-dropdown text="Thể loại" right>
          <b-dropdown-item v-for="genre in genres" :key="genre.path" :to="{name: 'TheLoai', params:{path: genre.path}}">
            {{ genre.name }}
          </b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown text="Quốc gia" right>
          <b-dropdown-item v-for="country in countries" :key="country.path" :to="{name: 'QuocGia', params:{path: country.path}}">
            {{ country.name }}
          </b-dropdown-item>
        </b-nav-item-dropdown>
        
        <b-nav-item :active="$route.path === '/phim-sap-chieu'" to="/phim-sap-chieu">Sắp chiếu</b-nav-item>
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

        <b-nav-item-dropdown text="Ngôn ngữ" right>
          <b-dropdown-item v-for="lang in languages" :key="lang.code" @click="changeLanguage(lang.code)">
            {{ lang.name }}
          </b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item href="/profile" title="Tài khoản">
          <b-icon icon="person-circle"></b-icon>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  
</template>

<script>

export default {
  name: "HeaderComponent",
  data() {
    return {
      searchQuery: '',
      genres: [
        { name: 'Hành động', path: 'hanh-dong' },
        { name: 'Cổ trang', path: 'co-trang' },
        { name: 'Chiến tranh', path: 'chien-tranh' },
        { name: 'Tình cảm', path: 'tinh-cam' },
        { name: 'Hài hước', path: 'hai-huoc' },
        { name: 'Âm nhạc', path: 'am-nhac' },
        { name: 'Học đường', path: 'hoc-duong' }
      ],
      countries: [
        { name: 'Trung Quốc', path: 'trung-quoc' },
        { name: 'Hàn Quốc', path: 'han-quoc' },
        { name: 'Nhật Bản', path: 'nhat-ban' },
        { name: 'Thái Lan', path: 'thai-lan' },
        { name: 'Ấn Độ', path: 'an-do' },
        { name: 'Anh', path: 'anh' }
      ],
      languages: [
        { name: 'Tiếng Việt', code: 'vi' },
        { name: 'English', code: 'en' },
        { name: '中国', code: 'zh' }
      ]
    };
  },

  methods:{
    searchMovie(){
      if(this.searchQuery.trim()){
        this.$router.push({ name: "SearchMovie", query: { keyword: this.searchQuery } })
      },
      changeLanguage(langCode) {
      console.log("Đổi ngôn ngữ sang: ", langCode);
    }
      
    }
  }
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
