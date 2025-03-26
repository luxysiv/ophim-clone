chỉnh sửa lại layout header cho đẹp hơn, thân thiện với người dùng, phù hợp với nhiều thiết bị, chuẩn SEO 
<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" class="custom-navbar">
    <b-navbar-brand href="#">
      <img src="/vieon-logo.png" alt="VieON" class="logo" />
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item :active="$route.path === '/home'" to="/home"
          >Trang chủ</b-nav-item
        >
        <b-nav-item :active="$route.path === '/phim-bo'" to="/phim-bo"
          >Phim Bộ</b-nav-item
        >
        <b-nav-item :active="$route.path === '/phim-le'" to="/phim-le"
          >Phim Lẻ</b-nav-item
        >
        <b-nav-item-dropdown text="Thể loại" right>
          <b-dropdown-item :to="{name: 'TheLoai', params:{path: 'hanh-dong'}}">Hành động</b-dropdown-item>
          <b-dropdown-item :to="{name: 'TheLoai', params:{path: 'co-trang'}}">Cổ trang</b-dropdown-item>
          <b-dropdown-item :to="{name: 'TheLoai', params:{path: 'chien-tranh'}}">Chiến tranh</b-dropdown-item>
          <b-dropdown-item :to="{name: 'TheLoai', params:{path: 'tinh-cam'}}">Tình cảm</b-dropdown-item>
          <b-dropdown-item :to="{name: 'TheLoai', params:{path: 'hai-huoc'}}">Hài hước</b-dropdown-item>
          <b-dropdown-item :to="{name: 'TheLoai', params:{path: 'am-nhac'}}">Âm nhạc</b-dropdown-item>
          <b-dropdown-item :to="{name: 'TheLoai', params:{path: 'hoc-duong'}}">Học đường</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="Quốc gia" right>
          <b-dropdown-item :to="{name: 'QuocGia', params:{path: 'trung-quoc'}}">Trung Quốc</b-dropdown-item>
          <b-dropdown-item :to="{name: 'QuocGia', params:{path: 'han-quoc'}}">Hàn Quốc</b-dropdown-item>
          <b-dropdown-item :to="{name: 'QuocGia', params:{path: 'nhat-ban'}}">Nhật Bản</b-dropdown-item>
          <b-dropdown-item :to="{name: 'QuocGia', params:{path: 'thai-lan'}}">Thái Lan</b-dropdown-item>
          <b-dropdown-item :to="{name: 'QuocGia', params:{path: 'an-do'}}">Ấn Độ</b-dropdown-item>
          <b-dropdown-item :to="{name: 'QuocGia', params:{path: 'anh'}}">Anh</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item :active="$route.path === '/phim-sap-chieu'" to="/phim-sap-chieu"
            >Sắp chiếu</b-nav-item
          >
      </b-navbar-nav>
      <b-navbar-nav class="right-section">
        <b-form inline class="mr-3">
          <b-input-group>
            <b-form-input v-model="searchQuery" placeholder="Tìm kiếm tên phim..." class="mr-2" clearable @keyup.enter="searchMovie"></b-form-input>
            <b-button variant="outline-light" @click="searchMovie">
              <b-icon icon="search"></b-icon>
            </b-button>
          </b-input-group>
        </b-form>
        <b-nav-item-dropdown text="Ngôn ngữ" right>
          <b-nav-item href="#"><b-icon icon="search"></b-icon>Tiếng việt</b-nav-item>
          <b-nav-item href="#"><b-icon icon="search"></b-icon>English</b-nav-item>
          <b-nav-item href="#"><b-icon icon="search"></b-icon>中国</b-nav-item>

        </b-nav-item-dropdown>
        <b-nav-item href="#"><b-icon icon="person-circle"></b-icon></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  
</template>

<script>

export default {
  name: "HeaderComponent",
  data() {
    return {
      searchQuery: ''
    };
  },

  methods:{
    searchMovie(){
      if(this.searchQuery.trim()){
        this.$router.push({ name: "SearchMovie", query: { keyword: this.searchQuery } })
      }
      
    }
  }
};
</script>
<style scoped>
.custom-navbar {
  background: linear-gradient(to right, #757575, #dddddd);
}

.logo {
  height: 30px;
}

.right-section {
  margin-left: auto;
}

.vip-button {
  background-color: #ffc107;
  color: #000;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
}

.vip-button:hover {
  background-color: #e0a800;
}


</style>
