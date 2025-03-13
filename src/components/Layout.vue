<template>
  <div>
    <!-- Header (Thanh điều hướng) -->
    <header>
      <header-component />
    </header>

    <div class="container-fluid">
      <div class="row">
       
      <b-col>
        <b-skeleton v-if="isLoading1" width="100%" height="500px"></b-skeleton>
        <b-img-lazy v-else :src="isLoading" alt="Loaded image" width="150px"></b-img-lazy>
      </b-col>
    
        <router-view />
      </div>
    </div>
    <hr/>
    <!-- Footer (Chân trang) -->
    <footer>
      <footer-component />
    </footer>
    <el-backtop :right="100" :bottom="100" />
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
.container-fluid {
  margin-top: 20px;
}
</style>