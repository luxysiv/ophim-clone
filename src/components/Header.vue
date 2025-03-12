<template>
  <b-navbar toggleable="lg" variant="light" bg="light">
    <b-navbar-brand href="#">MovieSite</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#">Trang chủ</b-nav-item>
        <b-nav-item href="#">Phim Mới</b-nav-item>
        <b-nav-item href="#">Thể Loại</b-nav-item>
        <b-nav-item href="#">Liên Hệ</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'HeaderComponent'
}
</script>
