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
        <b-nav-item :active="$route.path === '/the-thao'" to="/the-thao"
          >Thể thao</b-nav-item
        >
        <b-nav-item :active="$route.path === '/thieu-nhi'" to="/thieu-nhi"
          >Thiếu nhi</b-nav-item
        >
        <b-nav-item-dropdown text="Thể loại" right>
          <b-dropdown-item href="#">Hành động</b-dropdown-item>
          <b-dropdown-item href="#">Cổ trang</b-dropdown-item>
          <b-dropdown-item href="#">Chiến tranh</b-dropdown-item>
          <b-dropdown-item href="#">Tình cảm</b-dropdown-item>
          <b-dropdown-item href="#">Hài hước</b-dropdown-item>
          <b-dropdown-item href="#">Âm nhạc</b-dropdown-item>
          <b-dropdown-item href="#">Học đường</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="Quốc gia" right>
          <b-dropdown-item href="#">Trung Quốc</b-dropdown-item>
          <b-dropdown-item href="#">Hàn Quốc</b-dropdown-item>
          <b-dropdown-item href="#">Nhật Bản</b-dropdown-item>
          <b-dropdown-item href="#">Tình Cảm</b-dropdown-item>
          <b-dropdown-item href="#">Thái Lan</b-dropdown-item>
          <b-dropdown-item href="#">Ấn Độ</b-dropdown-item>
          <b-dropdown-item href="#">Anh</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <b-navbar-nav class="right-section">
        <b-nav-item :active="$route.path === '/vip'" to="/vip" class="vip-button">ĐĂNG KÝ VIP</b-nav-item>
        <b-nav-item :active="$route.path === '/nhap-ma'" to="/nhap-ma"
          >Nhập mã</b-nav-item
        >
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
    return {};
  },
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