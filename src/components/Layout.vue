<template>
  <div class="container">
    <header class="fixed-header">
      <header-component />
    </header>

    <main class="main">
      <div class="row">
        <router-view />
      </div>
    </main>
    <hr/>
    
    <footer>
      <footer-component />
    </footer>
    <el-backtop :right="10" :bottom="70" />
  </div>
</template>

<script>
import imgloading from "@/assets/biu.jpg";
import HeaderComponent from '../components/Header.vue'
import FooterComponent from '../components/Footer.vue'
export default {
  name: "LayoutPage",
  data() {
    return {
      imgloading: imgloading,
      isLoading1: true,
    };
  },
  components:{
    HeaderComponent,
    FooterComponent
  }
};
</script>

<style scoped>
/*
  * Để Flexbox hoạt động đúng, cần đảm bảo html và body có chiều cao 100%.
  * Thêm các style này vào file CSS chung hoặc vào <style> không có 'scoped' của component chính (ví dụ: App.vue).
*/
html, body {
  height: 100%;
  margin: 0;
}

/* Container chính của layout với Flexbox */
.container {
  display: flex;
  flex-direction: column; /* Sắp xếp các phần tử theo chiều dọc */
  min-height: 100vh; /* Đảm bảo chiều cao tối thiểu bằng chiều cao của viewport */
}

/* Header cố định */
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: rgb(2, 2, 2);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
}

/* Nội dung chính */
.main {
  flex: 1; /* Cho phép phần nội dung chính tự động giãn nở để lấp đầy khoảng trống */
  padding: 0 15px 0 15px;
  margin-top: 60px; /* Thêm margin-top để nội dung không bị header cố định che mất */
}
</style>
